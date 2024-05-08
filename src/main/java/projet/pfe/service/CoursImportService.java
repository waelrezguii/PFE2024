package projet.pfe.service;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import projet.pfe.model.CoursCsv;
import projet.pfe.model.banque;
import projet.pfe.model.cours;
import projet.pfe.model.devise;
import projet.pfe.repository.BanqueRepository;
import projet.pfe.repository.CoursRepository;
import projet.pfe.repository.DeviseRepository;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;
import java.util.Optional;

@Service
public class CoursImportService {

    private static final Logger logger = LoggerFactory.getLogger(CoursImportService.class);

    @Autowired
    private CoursRepository coursRepository;

    @Autowired
    private BanqueRepository banqueRepository;

    @Autowired
    private DeviseRepository deviseRepository;

    public void importCSV(MultipartFile file) throws Exception {
        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            CsvToBean<CoursCsv> csvToBean = new CsvToBeanBuilder<CoursCsv>(reader)
                    .withType(CoursCsv.class)
                    .withSeparator(';')  // Set delimiter to semicolon
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();

            List<CoursCsv> coursCsvList = csvToBean.parse();

            coursCsvList.forEach(coursCsv -> {
                try {
                    // Find the referenced Banque
                    banque banque = banqueRepository.findById(coursCsv.getCodeB())
                            .orElseThrow(() -> new Exception("Banque not found: " + coursCsv.getCodeB()));

                    // Find or create the Devise based on Codedev
                    Optional<devise> deviseOpt = deviseRepository.findById(coursCsv.getCodedev());
                    devise devise;

                    if (deviseOpt.isPresent()) {
                        devise = deviseOpt.get();
                        // Use Nomdevise from the database if it's missing in the CSV
                        if (coursCsv.getNomdevise() == null || coursCsv.getNomdevise().isEmpty()) {
                            coursCsv.setNomdevise(devise.getNomdevise());
                        } else {
                            devise.setNomdevise(coursCsv.getNomdevise());
                        }
                    } else {
                        // If Devise does not exist, create a new one
                        devise = new devise();
                        devise.setCodedev(coursCsv.getCodedev());
                        devise.setNomdevise(coursCsv.getNomdevise());
                    }

                    // Save or update the Devise
                    devise = deviseRepository.save(devise);

                    // Create and set the cours entity
                    cours cours = new cours();
                    cours.setDate_cours(coursCsv.getDate_cours());
                    cours.setBanque(banque);
                    cours.setDevise(devise);
                    cours.setAchat(coursCsv.getAchat());
                    cours.setVente(coursCsv.getVente());

                    // Save the cours entity
                    coursRepository.save(cours);
                } catch (Exception e) {
                    logger.error("Error importing record: {}", coursCsv, e);
                }
            });
        }
    }
}

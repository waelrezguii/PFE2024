package projet.pfe.controller;

import com.opencsv.bean.ColumnPositionMappingStrategy;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import projet.pfe.model.banque;
import projet.pfe.model.cours;
import projet.pfe.model.devise;
import projet.pfe.repository.BanqueRepository;
import projet.pfe.repository.CoursRepository;
import projet.pfe.repository.DeviseRepository;
import projet.pfe.service.CoursImportService;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/Cours")
public class CoursController {
    @Autowired
    private CoursRepository coursRepository;
    @Autowired
    private BanqueRepository banqueRepository;
    @Autowired
    private DeviseRepository deviseRepository;
    @Autowired
    private CoursImportService coursImportService;
    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping("/all")
    public List<cours> getAllCours(){return coursRepository.findAll();}
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/byCodeDev/{codeDev}")
    public List<cours> getCoursByDeviseCodedev(@PathVariable String codeDev) {
        return coursRepository.findByDevise_Codedev(codeDev);
    }
    @CrossOrigin(origins = "http://localhost:4200")
@GetMapping("/byNomDev/{nomdevise}")
    public List<cours> getCoursByDeviseNomdevise(@PathVariable String nomdevise)
    {
        return coursRepository.findByDevise_Nomdevise(nomdevise);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/byDateCours/{datecours}")
    public List<cours> getCoursByDate(@PathVariable LocalDate datecours)
    {
        return coursRepository.findByDate_cours(datecours);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/byCodeB/{codeb}")
    public List<cours> getCoursByCode(@PathVariable String codeb)
    {
        return coursRepository.findByBanque_CodeB(codeb);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/CodeBList")
    public List<String> getCodeBList(){
        return coursRepository.findDistinctCodeB();
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/NomDevList")
    public List<String>getNomDevList(){
        return coursRepository.findDistincNomdevise();
    }
    @CrossOrigin(origins = "http://localhost:4200")
@GetMapping("/byCodeAndDate/{codeb}/{date}")
    public List<cours>getCoursbyCodeAndDate(@PathVariable String codeb,@PathVariable LocalDate date){
        return coursRepository.findByBanque_CodeBAndDate_cours(codeb,date);
    }
    @CrossOrigin(origins = "http://localhost:4200")
        @GetMapping("/byNomdevAndDate/{nomdev}/{date}")
    public ResponseEntity<?> getCoursbyNomDevandDate(@PathVariable String nomdev, @PathVariable LocalDate date) {
        LocalDate today = LocalDate.now();
        if (date.isAfter(today)) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("La date sélectionnée ne doit pas dépasser la date du jour");
        }

        List<cours> result = coursRepository.findByDevise_NomdeviseAndDate_cours(nomdev, date);
        return ResponseEntity.ok(result);
    }
    @CrossOrigin(origins = "http://localhost:4200")
@GetMapping("/bySelection/{nomdev}/{codeb}/{month}")
    public List<cours>getCoursBySelection(@PathVariable String nomdev,@PathVariable String codeb,@PathVariable int month)
    {
        LocalDate firstDayOfMonth = LocalDate.now().withMonth(month).withDayOfMonth(1);
        LocalDate lastDayOfMonth = firstDayOfMonth.withDayOfMonth(firstDayOfMonth.lengthOfMonth());

        return coursRepository.findByDevise_NomdeviseAndBanque_CodeBAndDate_coursBetween(nomdev, codeb, firstDayOfMonth, lastDayOfMonth);


    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/uploadCSV")
    public String uploadCoursCSV(@RequestParam("file") MultipartFile file) {
        try {
            coursImportService.importCSV(file);
            return "Le fichier a été ajouté avec succès!";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
    }




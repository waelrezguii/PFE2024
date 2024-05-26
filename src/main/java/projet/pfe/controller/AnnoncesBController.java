package projet.pfe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projet.pfe.model.Annonces_Banquiers;
import projet.pfe.model.Annonces_Client;
import projet.pfe.model.banquiers;
import projet.pfe.repository.AnnoncesBRepository;
import projet.pfe.repository.AnnoncesCRepository;
import projet.pfe.repository.BanquiersRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/annoncesB")
public class AnnoncesBController {
    @Autowired
    private BanquiersRepository banquiersRepository;
    @Autowired
    private AnnoncesBRepository annoncesBRepository;
    @Autowired
    private AnnoncesCRepository annoncesCRepository;
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/add")
    public ResponseEntity<?> addOffer(@RequestBody Annonces_Banquiers annoncesData) {
        String email = annoncesData.getBanquiers().getEmail();
        Long id = annoncesData.getAnnoncesClient().getIdA();

        if (annoncesData.getTaux() == null || annoncesData.getTaux() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Le taux ne doit pas être nul, négatif ou égal à zéro");
        }

        int numberOfOffers = annoncesBRepository.countByBanquiers_EmailAndAnnoncesClient_IdA(email, id);
        if (numberOfOffers >= 2) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Le banquier a déjà ajouté deux offres pour cette annonce client");
        }

        banquiers banquiers = banquiersRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Banquier avec email est  " + email + " introuvable"));
        Annonces_Client annoncesClient = annoncesCRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("L'id de l'annonce du client est  " + id + " introuvable"));
        annoncesData.setBanquiers(banquiers);
        annoncesData.setAnnoncesClient(annoncesClient);
        Annonces_Banquiers savedAnnonce = annoncesBRepository.save(annoncesData);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedAnnonce);
    }
    @CrossOrigin(origins = "http://localhost:4200")
@GetMapping("/aff/{idA}")
    public List<Annonces_Banquiers> getAnnonces(@PathVariable Long idA){
 return annoncesBRepository.findByAnnoncesClient_IdA(idA);
    }

}

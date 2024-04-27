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
    public ResponseEntity<Annonces_Banquiers> addAnnonce(@RequestBody Annonces_Banquiers annoncesData) {
        String email = annoncesData.getBanquiers().getEmail();
        Long id = annoncesData.getAnnoncesClient().getIdA();

        // Check if the banquier has already added two offers for the same annonces client idA
        int numberOfOffers = annoncesBRepository.countByBanquiers_EmailAndAnnoncesClient_IdA(email, id);
        if (numberOfOffers >= 2) {
            // If the banquier has already added two offers, return an error response
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null); // You can customize the response body as needed
        }

        // If the banquier has not added two offers yet, proceed with adding the new offer
        banquiers banquiers = banquiersRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Banquier with email " + email + " not found"));
        Annonces_Client annoncesClient = annoncesCRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Id " + id + " not found"));
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

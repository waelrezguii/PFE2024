package projet.pfe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projet.pfe.model.Annonces_Client;
import projet.pfe.model.devise;
import projet.pfe.model.utilisateur;
import projet.pfe.repository.AnnoncesCRepository;
import projet.pfe.repository.DeviseRepository;
import projet.pfe.repository.UtilisateurRepository;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/annoncesC")
public class AnnoncesCController {
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private AnnoncesCRepository annoncesCRepository;
@Autowired
private DeviseRepository deviseRepository;
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/add")
    public ResponseEntity<?> addAnnonce(@RequestBody Annonces_Client annoncesData) {
        if (annoncesData.getMontant() == null || annoncesData.getMontant() <= 0) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Le montant ne doit pas être nul ou négatif");
        }

        String cin = annoncesData.getUtilisateur().getCin();
        String codedev = annoncesData.getDevise().getCodedev();
        utilisateur utilisateur = utilisateurRepository.findByCin(cin)
                .orElseThrow(() -> new IllegalArgumentException("L'utilisateur avec le CIN est " + cin + " introuvable"));

        devise devise = deviseRepository.findById(codedev)
                .orElseThrow(() -> new IllegalArgumentException("La devise est " + codedev + " introuvable"));
        annoncesData.setUtilisateur(utilisateur);
        annoncesData.setDevise(devise);
        Annonces_Client savedAnnonce = annoncesCRepository.save(annoncesData);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedAnnonce);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/annoncesClient/{cin}")
    public List<Annonces_Client> getAnnoncesClient(@PathVariable String cin){
        return annoncesCRepository.findByUtilisateur_Cin(cin);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/annoncesClient")
    public List<Annonces_Client>getAllAnnonces(){
        return annoncesCRepository.findAll();
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/{id}/accept")
    public ResponseEntity<Annonces_Client> acceptAnnouncement(@PathVariable Long id) {
        Annonces_Client annonce = annoncesCRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("L'annonce avec l'id est " + id + " introuvable"));
        annonce.setStatut(true);
        Annonces_Client updatedAnnouncement = annoncesCRepository.save(annonce);
        return ResponseEntity.ok(updatedAnnouncement);
    }

}


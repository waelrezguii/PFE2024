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
    public ResponseEntity<Annonces_Client> addAnnonce(@RequestBody Annonces_Client annoncesData) {

        // Retrieve the utilisateur entity based on the provided cin
        String cin = annoncesData.getUtilisateur().getCin();
        String Codedev=annoncesData.getDevise().getCodedev();
        utilisateur utilisateur = utilisateurRepository.findByCin(cin)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur with CIN " + cin + " not found"));
devise devise = deviseRepository.findById(Codedev)
        .orElseThrow(() -> new IllegalArgumentException("Devise"+Codedev+"not found"));
        // Set the utilisateur object in the Annonces_Client entity
        annoncesData.setUtilisateur(utilisateur);
annoncesData.setDevise(devise);
        // Save the Annonces_Client entity
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
                .orElseThrow(() -> new IllegalArgumentException("Announcement with ID " + id + " not found"));
        annonce.setStatut(true); // Update the status to 1 (accepted)
        Annonces_Client updatedAnnouncement = annoncesCRepository.save(annonce);
        return ResponseEntity.ok(updatedAnnouncement);
    }

}


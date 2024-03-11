package projet.pfe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import projet.pfe.model.Annonces_Client;
import projet.pfe.model.utilisateur;
import projet.pfe.repository.AnnoncesCRepository;
import projet.pfe.repository.UtilisateurRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/annoncesC")
public class AnnoncesCController {
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private AnnoncesCRepository annoncesCRepository;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/add")
    public ResponseEntity<Annonces_Client> addAnnonce(@RequestBody Annonces_Client annoncesData) {
        // Retrieve the utilisateur entity based on the provided cin
        String cin = annoncesData.getUtilisateur().getCin();
        utilisateur utilisateur = utilisateurRepository.findByCin(cin)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur with CIN " + cin + " not found"));

        // Set the utilisateur object in the Annonces_Client entity
        annoncesData.setUtilisateur(utilisateur);

        // Save the Annonces_Client entity
        Annonces_Client savedAnnonce = annoncesCRepository.save(annoncesData);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedAnnonce);
    }
}


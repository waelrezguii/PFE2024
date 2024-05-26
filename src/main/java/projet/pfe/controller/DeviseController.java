package projet.pfe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projet.pfe.model.banque;
import projet.pfe.model.devise;
import projet.pfe.repository.DeviseRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/devise")
public class DeviseController {
    @Autowired
    private DeviseRepository deviseRepository;
    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping("/all")
    public List<devise>getAllDevise(){
        return deviseRepository.findAll();
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/byCodedev/{Codedev}")
    public ResponseEntity<devise> getDeviseByCodedev(@PathVariable("Codedev") String Codedev) {
        Optional<devise> optionalDevise = deviseRepository.findById(Codedev);
        return optionalDevise.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @CrossOrigin(origins = "http://localhost:4200")
@PostMapping("/ajouterDevise")
    public ResponseEntity<?> addDev(@RequestBody devise newdev) {
       try{
boolean CodedevExists=deviseRepository.existsById(newdev.getCodedev());
boolean NomdeviseExists=deviseRepository.existsByNomdevise(newdev.getNomdevise());
boolean drapeauExists=deviseRepository.existsByDrapeau(newdev.getDrapeau());
boolean libelleExists=deviseRepository.existsByLibelle(newdev.getLibelle());
           if (CodedevExists && NomdeviseExists && drapeauExists && libelleExists) {
               return ResponseEntity
                       .badRequest()
                       .body("Error: La devise existe!");
           } else if (CodedevExists) {
               return ResponseEntity
                       .badRequest()
                       .body("Error: Le code du devise existe!");
           } else if (drapeauExists) {
               return ResponseEntity
                       .badRequest()
                       .body("Error: Le drapeau du devise existe!");
           } else if (libelleExists) {
               return ResponseEntity
                       .badRequest()
                       .body("Error: Le libelle du devise existe!");
           }
       devise savedDevise=deviseRepository.save(newdev);
           return ResponseEntity.ok("La devise a été ajoutée avec succès!");
       }catch (Exception e) {
           e.printStackTrace();
           return ResponseEntity
                   .status(HttpStatus.INTERNAL_SERVER_ERROR)
                   .body("Error: " + e.getMessage());
       }
    }

    }

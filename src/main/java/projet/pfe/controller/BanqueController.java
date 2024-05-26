package projet.pfe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projet.pfe.model.banque;
import projet.pfe.repository.BanqueRepository;

import java.util.List;

@RestController
@RequestMapping("/api/v1/banque")
public class BanqueController {
@Autowired
private BanqueRepository banqueRepository;
    @CrossOrigin(origins = "http://localhost:4200")

@GetMapping("/affBanques")
    public List<banque> getAllBanque(){

        return banqueRepository.findAll();
}
    @CrossOrigin(origins = "http://localhost:4200")
@PostMapping("/ajouterBanque")
    public ResponseEntity<?> addBanque(@RequestBody banque newBanque) {
        try {
            boolean codeBExists = banqueRepository.existsById(newBanque.getCodeB());

            boolean nombanqueExists = banqueRepository.existsByNombanque(newBanque.getNombanque());

            if (codeBExists && nombanqueExists) {
                return ResponseEntity
                        .badRequest()
                        .body("Erreur : Une banque avec le même CodeB et Nombanque existe déjà !");
            } else if (codeBExists) {
                return ResponseEntity
                        .badRequest()
                        .body("Erreur : Une banque avec le même CodeB existe déjà !");
            } else if (nombanqueExists) {
                return ResponseEntity
                        .badRequest()
                        .body("Erreur : Une banque avec la même Nombanque existe déjà !");
            }

            banque savedBanque = banqueRepository.save(newBanque);
            return ResponseEntity.ok("La banque a été ajoutée avec succès!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Une erreur s'est produite lors de l'ajout de la banque :: " + e.getMessage());
        }
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/supprimerBanque/{CodeB}")
    public ResponseEntity<?> deleteBanque(@PathVariable String CodeB) {
        try {
            boolean banqueExists = banqueRepository.existsById(CodeB);

            if (!banqueExists) {
                return ResponseEntity
                        .notFound()
                        .build();
            }

            banqueRepository.deleteById(CodeB);

            return ResponseEntity.ok("La banque a été supprimée avec succès!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Une erreur s'est produite lors de la suppression de la banque:" + e.getMessage());
        }
    }
}

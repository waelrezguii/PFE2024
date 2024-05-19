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
            // Check if a banque with the same CodeB already exists
            boolean codeBExists = banqueRepository.existsById(newBanque.getCodeB());

            // Check if a banque with the same Nombanque already exists
            boolean nombanqueExists = banqueRepository.existsByNombanque(newBanque.getNombanque());

            if (codeBExists && nombanqueExists) {
                // Both CodeB and Nombanque already exist
                return ResponseEntity
                        .badRequest()
                        .body("Error: A banque with the same CodeB and Nombanque already exists!");
            } else if (codeBExists) {
                // CodeB already exists
                return ResponseEntity
                        .badRequest()
                        .body("Error: A banque with the same CodeB already exists!");
            } else if (nombanqueExists) {
                // Nombanque already exists
                return ResponseEntity
                        .badRequest()
                        .body("Error: A banque with the same Nombanque already exists!");
            }

            banque savedBanque = banqueRepository.save(newBanque);
            return ResponseEntity.ok("La banque a été ajoutée avec succès!");
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception details
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while adding the banque: " + e.getMessage());
        }
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/supprimerBanque/{CodeB}")
    public ResponseEntity<?> deleteBanque(@PathVariable String CodeB) {
        try {
            // Check if a banque with the given CodeB exists
            boolean banqueExists = banqueRepository.existsById(CodeB);

            if (!banqueExists) {
                // Banque not found
                return ResponseEntity
                        .notFound()
                        .build();
            }

            // Delete the banque with the given CodeB
            banqueRepository.deleteById(CodeB);

            return ResponseEntity.ok("La banque a été supprimée avec succès!");
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception details
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while deleting the banque: " + e.getMessage());
        }
    }
}

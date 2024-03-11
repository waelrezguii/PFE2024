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
    public ResponseEntity<banque> addBanque(@RequestBody banque newBanque) {
        try {
            banque savedBanque = banqueRepository.save(newBanque);
            return new ResponseEntity<>(savedBanque, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

package projet.pfe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projet.pfe.model.banquiers;
import projet.pfe.repository.BanquiersRepository;

@RestController
@RequestMapping("/api/v1/banquiers")
public class BanquiersController {
    @Autowired
    private BanquiersRepository banquiersRepository;
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/ajouterBanquiers")
    public ResponseEntity<banquiers>addBanquiers(@RequestBody banquiers newBanquiers){
        try {
            banquiers savedBanquiers = banquiersRepository.save(newBanquiers);
            return new ResponseEntity<>(savedBanquiers, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

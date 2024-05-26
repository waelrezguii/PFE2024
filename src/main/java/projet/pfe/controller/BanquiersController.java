package projet.pfe.controller;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import projet.pfe.model.Annonces_Client;
import projet.pfe.model.banque;
import projet.pfe.model.banquiers;
import projet.pfe.model.utilisateur;
import projet.pfe.repository.BanqueRepository;
import projet.pfe.repository.BanquiersRepository;

import java.util.*;

@RestController
@RequestMapping("/api/v1/banquiers")
public class BanquiersController {
    @Autowired
    private BanquiersRepository banquiersRepository;
    @Autowired
    private BanqueRepository banqueRepository;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/ajouterBanquiers")
    public ResponseEntity<banquiers> add(@RequestBody banquiers bq) {
        if (bq.getBanque() == null) {
            return ResponseEntity.badRequest().build();
        }

        String CodeB = bq.getBanque().getCodeB();
        banque banque = banqueRepository.findById(CodeB)
                .orElseThrow(() -> new EntityNotFoundException("La banque avec le CodeB est " + CodeB + " introuvable"));

        bq.setBanque(banque);
        banquiers savedBanquiers = banquiersRepository.save(bq);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBanquiers);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/loginB")
    public ResponseEntity<?> login(@RequestBody banquiers loginInfos){
        String email = loginInfos.getEmail();
        String mdp = loginInfos.getMdp();
        Optional<banquiers> userOptional = banquiersRepository.findByEmail(email);

        if (!userOptional.isPresent()) {
            Map<String, String> response = new HashMap<>();
            response.put("erreur", "E-mail introuvable");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        banquiers user = userOptional.get();
        if (!user.getMdp().equals(mdp)) {
            Map<String, String> response = new HashMap<>();
            response.put("erreur", "Mot de passe incorrect");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Connecté avec succès");
        response.put("user", user);

        Authentication auth = new UsernamePasswordAuthenticationToken(email, mdp, new ArrayList<>());
        SecurityContextHolder.getContext().setAuthentication(auth);

        return ResponseEntity.ok().body(response);
    }

    @CrossOrigin(origins = "http://localhost:4200")
@GetMapping("/affBanquiers")
    public List<banquiers> getAllBanquier(){
        return banquiersRepository.findAll();
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/delete/{email}")
    public ResponseEntity<?> deleteBanquier(@PathVariable String email) {
        try {
            if (!banquiersRepository.existsById(email)) {
                return ResponseEntity.notFound().build();
            }
            banquiersRepository.deleteById(email);
            return ResponseEntity.ok().body("Le banquier est supprimé avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la suppression du banquier:" + e.getMessage());
        }
    }
}

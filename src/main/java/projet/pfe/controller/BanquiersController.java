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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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
                .orElseThrow(() -> new EntityNotFoundException("Banque with CodeB " + CodeB + " not found"));

        // Set the banque object in the banquiers entity
        bq.setBanque(banque);

        // Save the banquiers entity
        banquiers savedBanquiers = banquiersRepository.save(bq);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedBanquiers);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/loginB")
    public ResponseEntity<?> login(@RequestBody banquiers loginInfos){
        String email = loginInfos.getEmail();
        String mdp = loginInfos.getMdp();
        Optional<banquiers> userOptional = banquiersRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            banquiers user = userOptional.get();
            if (user.getMdp().equals(mdp)) {
                // Construct a response object for success
                Map<String, Object> response = new HashMap<>();
                response.put("message", "connected");
                response.put("user", user); // Include user data if needed

                // Set the authenticated user in the SecurityContextHolder
                Authentication auth = new UsernamePasswordAuthenticationToken(email, mdp, new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(auth);

                return ResponseEntity.ok().body(response);
            } else {
                // Password does not match
                Map<String, String> response = new HashMap<>();
                response.put("message", "invalid");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } else {
            // User not found
            Map<String, String> response = new HashMap<>();
            response.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}

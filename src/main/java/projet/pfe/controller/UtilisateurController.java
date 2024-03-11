package projet.pfe.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import projet.pfe.model.Annonces_Client;
import projet.pfe.model.VerificationToken;
import projet.pfe.model.utilisateur;
import projet.pfe.repository.UtilisateurRepository;
import projet.pfe.repository.VerifTokenRepository;
import projet.pfe.service.MailService;

import java.util.*;

@RestController
@RequestMapping("/api/v1/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private VerifTokenRepository verifTokenRepository;

    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private MailService mailService;
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody utilisateur user, HttpServletRequest request) {
        // Set the verified field to false initially
        user.setVerified(false);

        // Check if the email already exists
        if (utilisateurRepository.findByEmail(user.getEmail())!= null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "Email already exists"));
        }

        // Check if the Cin already exists
        if (utilisateurRepository.findById(user.getCin()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "Cin already exists"));
        }

        // Save the user first
        utilisateur savedUser = utilisateurRepository.save(user);

        if (savedUser == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Failed to save user"));
        }

        // Generate a unique verification token
        String token = UUID.randomUUID().toString();

        // Create a new VerificationToken object
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUtilisateur(savedUser);

        // Insert the VerificationToken into the database
        verifTokenRepository.save(verificationToken);

        // Send verification email
        mailService.sendVerificationEmail(savedUser, token);

        // Return the token in the response object
        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/CIN/{cin}")
    public utilisateur getUserByCin(@PathVariable String cin) {
        Optional<utilisateur> userOptional = utilisateurRepository.findByCin(cin);
        if (userOptional.isPresent()) {
            return userOptional.get();
        }
        return null;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/verify-email")
    public ResponseEntity<Map<String, String>> verifyEmailToken(@RequestParam("token") String token) {
        Optional<VerificationToken> verificationToken = verifTokenRepository.findByToken(token);
        if (verificationToken.isEmpty()) {
            // Token not found, return an error message
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid token."));
        }

        // Find the User entity associated with the VerificationToken
        utilisateur user = verificationToken.get().getUtilisateur();

        if (user == null || user.isVerified()) {
            // User not found or already verified, return an error message
            return ResponseEntity.badRequest().body(Map.of("error", "User not found or already verified."));
        }

        // Set the user's email verified status to true
        user.setVerified(true);

        // Save the updated User entity
        utilisateurRepository.save(user);

        // Delete the VerificationToken entity
        verifTokenRepository.delete(verificationToken.get());

        // Return a success message
        Map<String, String> response = new HashMap<>();
        response.put("message", "Email verified successfully.");
        return ResponseEntity.ok(response);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody utilisateur loginInfos) {
        String email = loginInfos.getEmail();
        String mdp = loginInfos.getMdp();
        Optional<utilisateur> userOptional = utilisateurRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            utilisateur user = userOptional.get();
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

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
import projet.pfe.model.PasswordResetToken;
import projet.pfe.model.VerificationToken;
import projet.pfe.model.banque;
import projet.pfe.model.utilisateur;
import projet.pfe.repository.PasswordResetTokenRepository;
import projet.pfe.repository.UtilisateurRepository;
import projet.pfe.repository.VerifTokenRepository;
import projet.pfe.service.MailService;

import java.util.*;
import java.util.regex.Pattern;

@CrossOrigin(origins = "http://localhost:4200")

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
@Autowired
private PasswordResetTokenRepository passwordResetTokenRepository;
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody utilisateur user, HttpServletRequest request) {
        if (utilisateurRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("erreur", "L'e-mail existe déjà"));
        }

        if (utilisateurRepository.findById(user.getCin()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("erreur", "Cin existe déjà"));
        }

        String cinRegex = "\\d{8}";
        if (!Pattern.matches(cinRegex, user.getCin())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("erreur", "Cin doit comporter 8 chiffres"));
        }

        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        if (!Pattern.matches(emailRegex, user.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("erreur", "Format d'e-mail invalide"));
        }
        String passwordRegex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{8,}$";
        if (!Pattern.matches(passwordRegex, user.getMdp())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("erreur", "Le mot de passe doit comporter au moins 8 caractères et inclure au moins une lettre majuscule, un caractère spécial et un chiffre"));
        }

        utilisateur savedUser = utilisateurRepository.save(user);
        if (savedUser == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("Erreur", "Échec de l'enregistrement de l'utilisateur"));
        }

        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken(token, savedUser);
        verifTokenRepository.save(verificationToken);
        mailService.sendVerificationEmail(savedUser, token);

        return ResponseEntity.ok(Map.of("token", token, "message", "Votre compte a été créé avec succès"));
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
            return ResponseEntity.badRequest().body(Map.of("erreur", "Jeton invalide."));
        }

        utilisateur user = verificationToken.get().getUtilisateur();

        if (user == null || user.isVerified()) {
            return ResponseEntity.badRequest().body(Map.of("erreur", "Utilisateur introuvable ou déjà vérifié."));
        }

        user.setVerified(true);

        utilisateurRepository.save(user);

        verifTokenRepository.delete(verificationToken.get());

        Map<String, String> response = new HashMap<>();
        response.put("message", "E-mail vérifié avec succès.");
        return ResponseEntity.ok(response);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody utilisateur loginInfos) {
        String email = loginInfos.getEmail();
        String mdp = loginInfos.getMdp();
        Optional<utilisateur> userOptional = utilisateurRepository.findByEmail(email);

        if (!userOptional.isPresent()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "L'email n'existe pas dans notre système.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        utilisateur user = userOptional.get();
        if (!user.getMdp().equals(mdp)) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Le mot de passe est incorrect.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Connexion réussie.");
        response.put("user", user);

        Authentication auth = new UsernamePasswordAuthenticationToken(email, mdp, new ArrayList<>());
        SecurityContextHolder.getContext().setAuthentication(auth);

        return ResponseEntity.ok().body(response);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam("email") String email) {
        Optional<utilisateur> userOptional = utilisateurRepository.findByEmail(email);
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("erreur", "Utilisateur introuvable"));
        }
        utilisateur user = userOptional.get();
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUtilisateur(user);
        resetToken.calculateExpiryDate();
        passwordResetTokenRepository.save(resetToken);
        mailService.sendPasswordResetEmail(user, token);
        return ResponseEntity.ok(Map.of("message", "E-mail de réinitialisation du mot de passe envoyé"));
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam("token") String token, @RequestParam("password") String newPassword) {
        Optional<PasswordResetToken> resetToken = passwordResetTokenRepository.findByToken(token);
        if (!resetToken.isPresent() || resetToken.get().isExpired()) {
            return ResponseEntity.badRequest().body(Map.of("erreur", "Jeton invalide ou expiré"));
        }
        utilisateur user = resetToken.get().getUtilisateur();
        user.setMdp(newPassword);
        utilisateurRepository.save(user);
        passwordResetTokenRepository.delete(resetToken.get());
        return ResponseEntity.ok(Map.of("message", "Mot de passe réinitialisé avec succès"));
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/affClients")
    public List<utilisateur> getllClients(){

        return utilisateurRepository.findAll();
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/update/{cin}")
    public ResponseEntity<?> updateUser(@PathVariable String cin, @RequestBody utilisateur updatedUser) {
        Optional<utilisateur> userOptional = utilisateurRepository.findByCin(cin);
        if (!userOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        utilisateur user = userOptional.get();
        user.setNom(updatedUser.getNom());
        user.setPrenom(updatedUser.getPrenom());
        user.setEmail(updatedUser.getEmail());
        user.setMdp(updatedUser.getMdp());
        user.setVerified(updatedUser.isVerified());

        utilisateur updated = utilisateurRepository.save(user);
        return ResponseEntity.ok(updated);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/delete/{cin}")
    public ResponseEntity<?> deleteUser(@PathVariable String cin) {
        Optional<utilisateur> userOptional = utilisateurRepository.findByCin(cin);
        if (!userOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        utilisateurRepository.deleteById(cin);
        return ResponseEntity.ok().body(Map.of("message", "Utilisateur supprimé avec succès"));
    }
}

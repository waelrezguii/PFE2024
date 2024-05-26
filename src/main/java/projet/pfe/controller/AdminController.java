package projet.pfe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import projet.pfe.model.Administrateur;
import projet.pfe.repository.AdminRepository;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admins")
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Administrateur loginInfos) {
        String email = loginInfos.getEmail();
        String password = loginInfos.getMdp();
        Administrateur admin1 = adminRepository.findByEmail(email);
        if (admin1 == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "L'email n'existe pas.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        if (!admin1.getMdp().equals(password)) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Le mot de passe est incorrect.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        Map<String, String> response = new HashMap<>();
        response.put("message", "connecté(e)");
        return ResponseEntity.ok().body(response);
    }

}

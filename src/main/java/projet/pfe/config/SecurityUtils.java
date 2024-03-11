package projet.pfe.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import projet.pfe.model.utilisateur;

@Component
public class SecurityUtils {
    public static String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof utilisateur) {
            utilisateur user = (utilisateur) authentication.getPrincipal();
            return user.getEmail();
        }
        return null;
    }
}

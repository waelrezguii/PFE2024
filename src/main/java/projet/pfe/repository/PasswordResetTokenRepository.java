package projet.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projet.pfe.model.PasswordResetToken;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
}

package projet.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projet.pfe.model.VerificationToken;

import java.util.Optional;

public interface VerifTokenRepository extends JpaRepository<VerificationToken,Long> {
    Optional<VerificationToken> findByToken(String token);
 Void deleteByToken(String token);
}

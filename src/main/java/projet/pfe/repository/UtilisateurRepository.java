package projet.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import projet.pfe.model.utilisateur;

import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<utilisateur, String> {

    Optional<utilisateur> findByEmail(String email);
    Optional<utilisateur> findByCin(String cin);

}

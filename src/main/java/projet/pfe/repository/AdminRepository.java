package projet.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projet.pfe.model.Administrateur;

public interface AdminRepository extends JpaRepository<Administrateur,String> {

    Administrateur findByEmail(String email);
}

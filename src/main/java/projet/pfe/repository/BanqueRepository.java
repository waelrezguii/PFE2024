package projet.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projet.pfe.model.banque;

import java.util.Optional;

public interface BanqueRepository extends JpaRepository<banque,String> {
    boolean existsByNombanque(String Nombanque);

}

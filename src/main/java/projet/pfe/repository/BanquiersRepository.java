package projet.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import projet.pfe.model.banquiers;
import projet.pfe.model.utilisateur;

import java.util.List;
import java.util.Optional;

@Repository
public interface BanquiersRepository extends JpaRepository<banquiers,String> {
    Optional<banquiers> findByEmail(String email);
}

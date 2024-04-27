package projet.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import projet.pfe.model.Annonces_Client;
import projet.pfe.model.utilisateur;

import java.util.List;

public interface AnnoncesCRepository extends JpaRepository<Annonces_Client,Long> {
@Query("select u from Annonces_Client u where u.utilisateur.cin= :cin")
    List<Annonces_Client> findByUtilisateur_Cin(@Param("cin") String cin);
}

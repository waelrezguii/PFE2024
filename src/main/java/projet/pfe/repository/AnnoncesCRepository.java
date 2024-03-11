package projet.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import projet.pfe.model.Annonces_Client;
import projet.pfe.model.utilisateur;

public interface AnnoncesCRepository extends JpaRepository<Annonces_Client,Long> {

}

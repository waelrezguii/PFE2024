package projet.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import projet.pfe.model.Annonces_Banquiers;
import projet.pfe.model.Annonces_Client;

import java.util.List;

@Repository
public interface AnnoncesBRepository extends JpaRepository<Annonces_Banquiers,Long> {
    @Query("select u from Annonces_Banquiers u where u.annoncesClient.idA= :idA")
    List<Annonces_Banquiers> findByAnnoncesClient_IdA(@Param("idA") Long idA);
    int countByBanquiers_EmailAndAnnoncesClient_IdA(String email, Long idA);

}

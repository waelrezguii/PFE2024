package projet.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import projet.pfe.model.devise;

import java.util.List;
import java.util.Optional;

public interface DeviseRepository extends JpaRepository<devise,String> {

    @Query("SELECT CASE WHEN COUNT(d) > 0 THEN true ELSE false END FROM devise d WHERE d.Nomdevise = ?1")
    boolean existsByNomdevise(String Nomdevise);
    boolean existsByDrapeau(String drapeau);
    boolean existsByLibelle(String libelle);
}

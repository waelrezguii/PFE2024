package projet.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import projet.pfe.model.cours;

import java.time.LocalDate;
import java.util.List;

public interface CoursRepository extends JpaRepository<cours, Integer> {

    @Query("SELECT c FROM cours c WHERE c.Devise.Codedev = :codeDev")
    List<cours> findByDevise_Codedev(@Param("codeDev") String codeDev);
    @Query("SELECT c FROM cours c where c.Devise.Nomdevise= :nomdevise")
    List<cours>findByDevise_Nomdevise(@Param("nomdevise") String nomdevise);
    @Query("SELECT c FROM cours c  where c.date_cours=:datecours")
    List<cours>findByDate_cours(@Param("datecours") LocalDate datecours);
    @Query("select c from cours c where c.Banque.CodeB=:codeb")
    List<cours>findByBanque_CodeB(@Param("codeb") String codeb);
    @Query("select DISTINCT c.Banque.CodeB from cours c")
    List<String> findDistinctCodeB();
    @Query("select DISTINCT  c.Devise.Nomdevise from cours c")
    List<String>findDistincNomdevise();
    @Query("select c from cours c where c.Banque.CodeB=:codeb and c.date_cours=:date")
    List<cours>findByBanque_CodeBAndDate_cours(@Param("codeb")String codeb,@Param("date")LocalDate date);
    @Query("select c from cours c where c.Devise.Nomdevise=:nomdev and c.date_cours=:date")
    List<cours>findByDevise_NomdeviseAndDate_cours(@Param("nomdev")String nomdev,@Param("date")LocalDate date);
    @Query("select  c from cours c where c.Devise.Nomdevise=:nomdev and c.Banque.CodeB=:codeb")
    List<cours>findByDevise_NomdeviseAndBanque_CodeB(@Param("nomdev")String nomdev,@Param("codeb")String codeb);
@Query("select c from cours c where c.Devise.Nomdevise=:nomdev and c.Banque.CodeB=:codeb and c.date_cours between :startdate and :enddate")
    List<cours>findByDevise_NomdeviseAndBanque_CodeBAndDate_coursBetween(@Param("nomdev") String nomdev,@Param("codeb")String codeb,@Param("startdate")LocalDate startdate,@Param("enddate") LocalDate enddate);
}

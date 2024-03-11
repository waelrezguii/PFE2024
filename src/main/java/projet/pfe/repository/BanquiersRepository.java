package projet.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projet.pfe.model.banquiers;

public interface BanquiersRepository extends JpaRepository<banquiers,String> {
}

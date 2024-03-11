package projet.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projet.pfe.model.devise;

public interface DeviseRepository extends JpaRepository<devise,String> {
}

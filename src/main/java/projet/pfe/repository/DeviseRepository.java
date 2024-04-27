package projet.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projet.pfe.model.devise;

import java.util.List;
import java.util.Optional;

public interface DeviseRepository extends JpaRepository<devise,String> {


}

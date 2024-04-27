package projet.pfe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projet.pfe.model.devise;
import projet.pfe.repository.DeviseRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/devise")
public class DeviseController {
    @Autowired
    private DeviseRepository deviseRepository;
    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping("/all")
    public List<devise>getAllDevise(){
        return deviseRepository.findAll();
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/byCodedev/{Codedev}")
    public ResponseEntity<devise> getDeviseByCodedev(@PathVariable("Codedev") String Codedev) {
        Optional<devise> optionalDevise = deviseRepository.findById(Codedev);
        return optionalDevise.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}

package projet.pfe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import projet.pfe.model.devise;
import projet.pfe.repository.DeviseRepository;

import java.util.List;

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

}

package projet.pfe.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import projet.pfe.model.cours;
import projet.pfe.repository.CoursRepository;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/Cours")
public class CoursController {
    @Autowired
    private CoursRepository coursRepository;
    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping("/all")
    public List<cours> getAllCours(){return coursRepository.findAll();}
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/byCodeDev/{codeDev}") // Update the mapping to match the endpoint
    public List<cours> getCoursByDeviseCodedev(@PathVariable String codeDev) {
        return coursRepository.findByDevise_Codedev(codeDev);
    }
    @CrossOrigin(origins = "http://localhost:4200")
@GetMapping("/byNomDev/{nomdevise}")
    public List<cours> getCoursByDeviseNomdevise(@PathVariable String nomdevise)
    {
        return coursRepository.findByDevise_Nomdevise(nomdevise);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/byDateCours/{datecours}")
    public List<cours> getCoursByDate(@PathVariable LocalDate datecours)
    {
        return coursRepository.findByDate_cours(datecours);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/byCodeB/{codeb}")
    public List<cours> getCoursByCode(@PathVariable String codeb)
    {
        return coursRepository.findByBanque_CodeB(codeb);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/CodeBList")
    public List<String> getCodeBList(){
        return coursRepository.findDistinctCodeB();
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/NomDevList")
    public List<String>getNomDevList(){
        return coursRepository.findDistincNomdevise();
    }
    @CrossOrigin(origins = "http://localhost:4200")
@GetMapping("/byCodeAndDate/{codeb}/{date}")
    public List<cours>getCoursbyCodeAndDate(@PathVariable String codeb,@PathVariable LocalDate date){
        return coursRepository.findByBanque_CodeBAndDate_cours(codeb,date);
    }
    @CrossOrigin(origins = "http://localhost:4200")
        @GetMapping("/byNomdevAndDate/{nomdev}/{date}")
    public List<cours>getCoursbyNomDevandDate(@PathVariable String nomdev,@PathVariable LocalDate date){
        return coursRepository.findByDevise_NomdeviseAndDate_cours(nomdev,date);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/byNomDevAndCodeB/{nomdev}/{codeb}")
    public List<cours>getCoursByNomDevAndCodeB(@PathVariable String nomdev,@PathVariable String codeb){
        return coursRepository.findByDevise_NomdeviseAndBanque_CodeB(nomdev,codeb);
    }
    @CrossOrigin(origins = "http://localhost:4200")
@GetMapping("/bySelection/{nomdev}/{codeb}/{month}")
    public List<cours>getCoursBySelection(@PathVariable String nomdev,@PathVariable String codeb,@PathVariable int month)
    {
        // Determine the first day of the month
        LocalDate firstDayOfMonth = LocalDate.now().withMonth(month).withDayOfMonth(1);

        // Determine the last day of the month
        LocalDate lastDayOfMonth = firstDayOfMonth.withDayOfMonth(firstDayOfMonth.lengthOfMonth());

        return coursRepository.findByDevise_NomdeviseAndBanque_CodeBAndDate_coursBetween(nomdev, codeb, firstDayOfMonth, lastDayOfMonth);


    }
}

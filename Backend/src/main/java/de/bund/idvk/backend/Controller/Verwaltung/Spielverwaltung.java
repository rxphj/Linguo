package de.bund.idvk.backend.Controller.Verwaltung;

import de.bund.idvk.backend.Model.DTOs.WortpruefungDTO;
import de.bund.idvk.backend.Model.Repository.WortRepo;
import de.bund.idvk.backend.Model.Wort;
import org.apache.commons.text.similarity.JaroWinklerDistance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class Spielverwaltung {

    JaroWinklerDistance jaroWinklerDistance= new JaroWinklerDistance();
    @Autowired
    WortRepo wortRepo;

    @GetMapping("/generate/buchstabe")
    public ResponseEntity<String>generateWort() {
        char[] buchstaben= {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'};
        int rand= (int)(Math.random()*buchstaben.length);
        return ResponseEntity.ok(String.valueOf(buchstaben[rand]));
    }

    @GetMapping("/check/wort")
    public ResponseEntity<WortpruefungDTO>checkWort(@RequestBody Wort wort) {
        WortpruefungDTO wortpruefungDTO=null;
        System.out.println(wort);
        for(int i=0; i< wortRepo.findAll().size(); i++){
            double distanz = jaroWinklerDistance.apply(wort.getName(), wortRepo.findAll().get(i).getName());
            if (distanz>= 0.85) {
                System.out.println(wortRepo.findAll().get(i).getName());
                System.out.println(distanz);
                wortpruefungDTO= new WortpruefungDTO(wort,true);
                break;
            }
        }
        return ResponseEntity.ok(wortpruefungDTO);
    }

}

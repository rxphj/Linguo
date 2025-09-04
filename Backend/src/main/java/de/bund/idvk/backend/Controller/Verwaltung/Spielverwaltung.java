package de.bund.idvk.backend.Controller.Verwaltung;

import de.bund.idvk.backend.Model.Repository.WortRepo;
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
    public ResponseEntity<Boolean>checkWort(@RequestBody String wort) {
        System.out.println(wort);
        boolean found= false;
        for(int i=0; i< wortRepo.findAll().size(); i++){
            double distanz = jaroWinklerDistance.apply(wort, wortRepo.findAll().get(i).getName());
            if (distanz>= 0.85) {
                System.out.println(distanz);
                found = true;
                break;
            }
        }
        return ResponseEntity.ok(found);
    }

}

package de.bund.idvk.backend.Controller.Verwaltung;

import de.bund.idvk.backend.Model.Repository.WortRepo;
import de.bund.idvk.backend.Model.Wort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@CrossOrigin
@RestController
public class Wortverwaltung {
    //Repository für CRUD
   private final WortRepo wortRepo;

    public Wortverwaltung(WortRepo wortRepo) {
        this.wortRepo = wortRepo;
    }

    @PostMapping("/create/wort")
    public ResponseEntity<?>createwort(@RequestBody Wort wort){
        wortRepo.createWort(wort.getName(), wort.getRubrik());
        return ResponseEntity.ok().build();
    }
    @GetMapping("/read/woerter")
    public ResponseEntity<List<?>>readwort(){
        return ResponseEntity.ok().body(wortRepo.findAllWoerter());
    }

    @DeleteMapping("/remove/wort")
    public ResponseEntity<?> removewort(@RequestBody Wort wort){
        return ResponseEntity.ok().body(wortRepo.delete(wort.getId()));
    }
}

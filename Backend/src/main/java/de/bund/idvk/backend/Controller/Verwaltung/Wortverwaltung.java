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
    @Autowired
    WortRepo wortRepo;
    @PostMapping("/create/wort")
    public ResponseEntity<?>createwort(@RequestBody Wort wort){
        return ResponseEntity.ok().body(wortRepo.createWort(wort));
    }
    @GetMapping("/read/woerter")
    public ResponseEntity<List<?>>readwort(){
        return ResponseEntity.ok().body(wortRepo.findAll());
    }
    @GetMapping("/read/wort")
    public ResponseEntity<?>readwortbyobject(@RequestBody Wort wort){
        return ResponseEntity.ok().body(wortRepo.findByObject(wort));
    }
    @DeleteMapping("/remove/wort")
    public ResponseEntity<?> removewort(@RequestBody Wort wort){
        return ResponseEntity.ok().body(wortRepo.delete(wort));
    }
    @PutMapping("/update/wort")
    public ResponseEntity<?> updatewort(@RequestBody Wort wort){
        return ResponseEntity.ok().body(wortRepo.update(wort));
    }
}

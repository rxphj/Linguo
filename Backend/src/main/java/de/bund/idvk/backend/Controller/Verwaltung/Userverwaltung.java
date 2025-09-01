package de.bund.idvk.backend.Controller.Verwaltung;

import de.bund.idvk.backend.Model.Repository.UserRepository;
import de.bund.idvk.backend.Model.Benutzer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class Userverwaltung {

    @Autowired
    UserRepository userRepository;
    //BCrypt für die Verschlüsselung (Hashing) des Passwortes
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);

//Gianluca Marotta
    @PostMapping("/create/user")
    public ResponseEntity<?>createuser(@RequestBody Benutzer benutzer){
        benutzer.setPassword(encoder.encode(benutzer.getPassword()));
        return ResponseEntity.ok().body(userRepository.save(benutzer));
    }
    @GetMapping("/read/user")
    public List<Benutzer> readuser(){
        return userRepository.findAll();
    }
    @DeleteMapping("/delete/user")
    public ResponseEntity<Boolean>deleteuser(@RequestBody Benutzer benutzer){
        return ResponseEntity.ok().body(userRepository.delete(benutzer));
    }
    @PutMapping("/update/user")
    public ResponseEntity<?>updateuser(@RequestBody Benutzer benutzer){
        return ResponseEntity.ok().body(userRepository.update(benutzer));
    }
    @GetMapping("/read/user/by/object/{benutzer}")
    public ResponseEntity<Benutzer> readuserbyid(@PathVariable Benutzer benutzer){
        return ResponseEntity.ok().body(userRepository.findByObject(benutzer));
    }
}

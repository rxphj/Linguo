/**
 AUTHOR: Raphael Pohl
 */
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
 //Repository
    @Autowired
    UserRepository userRepository;
    //BCrypt für die Verschlüsselung (Hashing) des Passwortes
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/create/user")
    public ResponseEntity<?>createuser(@RequestBody Benutzer benutzer){
        // Hashing des Passwortes
        benutzer.setPassword(encoder.encode(benutzer.getPassword()));
        // Stringifizierung des Enums
        userRepository.createBenutzer(benutzer.getUsername(),benutzer.getPassword(), String.valueOf(benutzer.getRolle()));
        return ResponseEntity.ok().build();
    }
    @GetMapping("/read/user")
    public List<Benutzer> readuser(){
        return userRepository.findAll();
    }
    @DeleteMapping("/delete/user/{id}")
    public ResponseEntity<Boolean>deleteuser(@PathVariable long id){
        return ResponseEntity.ok().body(userRepository.delete((id)));
    }

}

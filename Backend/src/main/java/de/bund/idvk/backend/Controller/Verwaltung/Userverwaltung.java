package de.bund.idvk.backend.Controller.Verwaltung;

import de.bund.idvk.backend.Model.Repository.UserRepository;
import de.bund.idvk.backend.Model.User;
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
    public ResponseEntity<?>createuser(@RequestBody User user){
        String result = encoder.encode(user.getPassword());
        user.setPassword(result);
        return ResponseEntity.ok().body(userRepository.save(user));
    }
    @GetMapping("/read/user")
    public List<User> readuser(){
        return userRepository.findAll();
    }
    @DeleteMapping("/delete/user")
    public ResponseEntity<?>deleteuser(@RequestBody User user){

        return ResponseEntity.ok().body(//User);
    }
}

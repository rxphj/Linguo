package de.bund.idvk.backend.Controller.Verwaltung;

import de.bund.idvk.backend.Model.Benutzer;
import de.bund.idvk.backend.Model.Repository.UserRepository;
import de.bund.idvk.backend.Model.Repository.WortRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class Spielverwaltung {
    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    @Autowired
    UserRepository userRepository;
    @Autowired
    WortRepo wortRepo;

    @GetMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody Benutzer loginRequest) {
        boolean found = false;

        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        for (Benutzer user : userRepository.findAll()) {
            if (user.getUsername().equals(username)) {
                if (bCryptPasswordEncoder.matches(password, user.getPassword())) {
                    found = true;
                    break;
                }
            }
        }

        return ResponseEntity.ok(found);
    }
    @GetMapping("/generate/buchstabe")
    public ResponseEntity<String>generateWort() {
        char[] buchstaben= {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'};
        int rand= (int)(Math.random()*buchstaben.length);
        return ResponseEntity.ok(String.valueOf(buchstaben[rand]));
    }

    @GetMapping("/check/wort")
    public ResponseEntity<Boolean>checkWort(@RequestBody String wort) {
        boolean found= false;
        for(int i=0; i< wortRepo.findAll().size(); i++){
            if (wortRepo.findAll().get(i).getName().equals(wort)) {
                found = true;
                break;
            }
        }
        return ResponseEntity.ok(found);
    }

}

package de.bund.idvk.backend.Controller;

import de.bund.idvk.backend.Model.Wort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api")
@CrossOrigin
public class Wortverwaltung {
    private PasswordHasher encoder;

    @PostMapping("/create/wort")
    public ResponseEntity<?> createWort(@PathVariable Wort wort){
        // Create an encoder with all the defaults
        Argon2PasswordEncoder encoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
        String result = encoder.encode("myPassword");
        if (encoder.matches("myPassword", result)){
            System.out.println(result);
        }
        return ResponseEntity.ok().body(result);
    }
}

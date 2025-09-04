package de.bund.idvk.backend.Controller.Verwaltung;

import com.nimbusds.oauth2.sdk.http.HTTPResponse;
import de.bund.idvk.backend.Model.Benutzer;
import de.bund.idvk.backend.Model.Enums.State;
import de.bund.idvk.backend.Model.Repository.UserRepository;
import de.bund.idvk.backend.Model.System.Systempreference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/session")
public class Sessionverwaltung {
    Systempreference systempreferences= new Systempreference();
    @Autowired
    UserRepository userRepository;
    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    @PostMapping("/login")
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

    @PostMapping("/start")
    public ResponseEntity<?> setstart() {
        systempreferences.setState(State.ACTIVE);
        return ResponseEntity.ok().body(HTTPResponse.SC_OK);
    }
    @PostMapping("/end")
    public ResponseEntity<?> setend() {
        systempreferences.setState(State.INACTIVE);
        return ResponseEntity.ok().body(HTTPResponse.SC_OK);
    }
    @GetMapping("/currentstate")
    public ResponseEntity<State>getState() {
        return ResponseEntity.ok(systempreferences.getState());
    }
}

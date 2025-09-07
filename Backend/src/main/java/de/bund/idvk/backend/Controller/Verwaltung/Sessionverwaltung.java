package de.bund.idvk.backend.Controller.Verwaltung;

import com.nimbusds.oauth2.sdk.http.HTTPResponse;
import de.bund.idvk.backend.Model.Benutzer;
import de.bund.idvk.backend.Model.DTOs.LoginBenutzerDTO;
import de.bund.idvk.backend.Model.Enums.State;
import de.bund.idvk.backend.Model.Repository.UserRepository;
import de.bund.idvk.backend.Model.System.Systempreference;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;


@RestController
@CrossOrigin
@RequestMapping("/api/session")
public class Sessionverwaltung {
    private final Systempreference systempreference= new
            Systempreference();
    @Autowired
    UserRepository userRepository;
    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body, HttpServletRequest request) {
        String username = body.get("username");
        String password = body.get("password");

         Benutzer b= userRepository.findByUsername(username);

         if(b!=null){
             if(b.getPassword().equals(bCryptPasswordEncoder.encode(password))){
                 request.getSession(true).setAttribute("user",b);
             }
         }
        throw new RuntimeException("Login fehlgeschlagen");
    }
    @GetMapping("/me")
    public Object me(HttpServletRequest request) {
        Object user = request.getSession(false) != null ? request.getSession().getAttribute("user") : null;
        return user != null ? user : Map.of();
    }
    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {
        if (request.getSession(false) != null) request.getSession().invalidate();
    }

    @PostMapping("/start")
    public ResponseEntity<?> setstart() {
        systempreference.setState(State.ACTIVE);
        return ResponseEntity.ok().body(HTTPResponse.SC_OK);
    }

    @PostMapping("/end")
    public ResponseEntity<?> setend() {
        systempreference.setState(State.INACTIVE);
        return ResponseEntity.ok().body(HTTPResponse.SC_OK);
    }
    @GetMapping("/currentstate")
    public ResponseEntity<State>getState() {
        return ResponseEntity.ok().body(systempreference.getState());
    }
}

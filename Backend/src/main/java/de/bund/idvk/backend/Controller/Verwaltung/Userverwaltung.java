package de.bund.idvk.backend.Controller.Verwaltung;

import de.bund.idvk.backend.Model.User;
import org.flywaydb.core.internal.sqlscript.SqlStatement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.DriverManager;
import java.sql.SQLException;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class Userverwaltung {
    @PostMapping("/create/user")
    public ResponseEntity<?>createuser(@RequestBody User user) throws SQLException {
        // Create an encoder with all the defaults
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
        String result = encoder.encode(user.getPassword());
//        if (encoder.matches("myPassword", result)){
//            System.out.println(result);
//        }
        user.setPassword(result);
//        SqlStatement sql= DriverManager.getConnection("jdbc:sqlite:identifier.sqlite");
        return ResponseEntity.ok().body(user);
    }
}

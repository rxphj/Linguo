package de.bund.idvk.backend.Controller.Verwaltung;



import de.bund.idvk.backend.Model.Benutzer;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class Userverwaltung {

    @PostMapping("/create/user")
    public ResponseEntity<?> createuser(@RequestBody Benutzer benutzer)  {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
        benutzer.setPassword(encoder.encode(benutzer.getPassword()));
        return ResponseEntity.ok().body(benutzer);
    }

    @GetMapping("/read/user")
    public ResponseEntity<?> readuser() throws SQLException {
        Connection conn = DriverManager.getConnection("jdbc:sqlite:Linguo.sqlite");
        PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE");
        ps.execute();
        ResultSet rs = ps.executeQuery();
        return ResponseEntity.ok().body(rs);
    }


}

package de.bund.idvk.backend.Controller.Verwaltung;

import de.bund.idvk.backend.Model.Benutzer;
import de.bund.idvk.backend.Model.Repository.UserRepository;
import de.bund.idvk.backend.Model.Repository.WortRepo;
import de.bund.idvk.backend.Model.Service.BenutzerService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@CrossOrigin
@RequestMapping("/api/session")
public class Sessionverwaltung {


    @Autowired
    UserRepository userRepository;

    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    @Autowired
    BenutzerService benutzerService;
    private static final Map<String, Map<String, Object>> sessionStore = new ConcurrentHashMap<>();

    // Login definieren
    @PostMapping("/login")         // Sendeobjekt definieren
    public ResponseEntity<?> login(@RequestBody Benutzer body, HttpServletResponse response) {
        Map<String, Object> result = new HashMap<>();

        Benutzer b = userRepository.findByUsername(body.getUsername());
        if (b != null) {
            benutzerService.registerUser(body);
        }

        if (b != null && bCryptPasswordEncoder.matches(body.getPassword(), b.getPassword())) {
            // Session ID generieren
            String sessionId = UUID.randomUUID().toString();

            // Session in eigenem Store speichern
            Map<String, Object> sessionData = new HashMap<>();
            sessionData.put("username", b.getUsername());
            sessionData.put("id", b.getId());
            sessionData.put("rolle", b.getRolle());
            sessionStore.put(sessionId, sessionData);
            // Cookie in eigenem Speicher hinzufügen
            Cookie sessionCookie = new Cookie("SESSIONID", sessionId);
            sessionCookie.setHttpOnly(true);
            sessionCookie.setMaxAge(30 * 60); // 30 Minuten
            sessionCookie.setPath("/");
            response.addCookie(sessionCookie);

            // Rückgabe an das Frontend
            result.put("username", b.getUsername());
            result.put("rolle", b.getRolle());

            return ResponseEntity.ok(result);
        }

        result.put("success", false);
        result.put("error", "Login fehlgeschlagen");
        return ResponseEntity.status(401).body(result);
    }
    // Session und Cookie Speicher abfragen
    @GetMapping("/me")
    public ResponseEntity<?> me(@CookieValue(value = "SESSIONID", required = false) String sessionId) {
        System.out.println("Received sessionId: " + sessionId);

        if (sessionId == null || sessionId.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("error", "Keine Session gefunden"));
        }

        Map<String, Object> sessionData = sessionStore.get(sessionId);
        if (sessionData == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Session ungültig"));
        }

        String username = (String) sessionData.get("username");
        Benutzer benutzer = userRepository.findByUsername(username);

        if (benutzer != null) {
            return ResponseEntity.ok(benutzer);
        }

        return ResponseEntity.status(401).body(Map.of("error", "Benutzer nicht gefunden"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue(value = "SESSIONID", required = false) String sessionId,
                                    HttpServletResponse response) {
        if (sessionId != null) {
            sessionStore.remove(sessionId);

            // Cookie löschen
            Cookie cookie = new Cookie("SESSIONID", null);
            cookie.setMaxAge(0);
            cookie.setPath("/");
            response.addCookie(cookie);
        }

        return ResponseEntity.ok(Map.of("message", "Erfolgreich ausgeloggt"));
    }

}
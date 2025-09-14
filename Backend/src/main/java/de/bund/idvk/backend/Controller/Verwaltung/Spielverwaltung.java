package de.bund.idvk.backend.Controller.Verwaltung;

import de.bund.idvk.backend.Model.Benutzer;
import de.bund.idvk.backend.Model.DTOs.*;
import de.bund.idvk.backend.Model.Enums.Rubrik;
import de.bund.idvk.backend.Model.Repository.UserRepository;
import de.bund.idvk.backend.Model.Repository.WortRepo;
import de.bund.idvk.backend.Model.Wort;
import de.bund.idvk.backend.Model.Service.LetterService;
import org.apache.commons.text.diff.EditScript;
import org.apache.commons.text.diff.StringsComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class Spielverwaltung {
     private final WortRepo wortRepo;

     private final UserRepository userRepository;

    @Autowired
    private LetterService letterService;

    private final List<Benutzer> registeredUsers = new ArrayList<>();

    public Spielverwaltung(WortRepo wortRepo, UserRepository userRepository) {
        this.wortRepo = wortRepo;
        this.userRepository = userRepository;
    }
    // NOTIZ
    /*
    generateBuchstabe wird nicht mehr vom Websocket aufgerufen! Ein API-Call würde den Zustand des Systems NICHT verändern.
    */
    @GetMapping("/generate/buchstabe")
    public ResponseEntity<String> generateBuchstabe() {
        char neuerBuchstabe = letterService.generateNewLetter();
        return ResponseEntity.ok(String.valueOf(neuerBuchstabe));
    }
// Punkte werden auf das Scorekonto hinzugefügt
    public void addPoints(SpielnachrichtDTO spielnachrichtDTO) {
        if (spielnachrichtDTO == null || spielnachrichtDTO.benutzer() == null) {
            return;
        }

        String username = spielnachrichtDTO.benutzer().getUsername();
        System.out.println("Punkte für: " + username);
        // Suche nach dem Benutzer in der Datenbank, der diese Daten geschickt hat.
        Optional<Benutzer> userOpt = registeredUsers.stream()
                .filter(b -> b.getUsername().equals(username))
                .findFirst();
        // Bei einem Treffer werden weitere 10 Punkte auf dein Konto zugeschrieben
        userOpt.ifPresent(benutzer -> benutzer.setScore(benutzer.getScore() + 10));
    }

    @PostMapping("/check/wort")
    public ResponseEntity<WortpruefungGesamtDTO> checkWortRubriken(@RequestBody SpielnachrichtDTO spielnachricht) {
        List<Wort> alleWorte = new  ArrayList<>();
        char currentLetter = letterService.getCurrentLetter();
        // Null-Check für die übergebenen Daten
        if (spielnachricht.wort() == null) {
            WortpruefungEinzelDTO empty = new WortpruefungEinzelDTO(null, false);
            return ResponseEntity.ok(new WortpruefungGesamtDTO(empty, empty, empty, empty, 0));
        }

        WortDTO worte = spielnachricht.wort();

        // Alle Wörter prüfen in den einzelnen Rubriken
        boolean stadtExists = pruefeWort(worte.stadt(), "Stadt", alleWorte, currentLetter);
        boolean landExists = pruefeWort(worte.land(), "Land", alleWorte, currentLetter);
        boolean flussExists = pruefeWort(worte.fluss(), "Fluss", alleWorte, currentLetter);
        boolean tierExists = pruefeWort(worte.tier(), "Tier", alleWorte, currentLetter);

        // Punkte hinzufügen für korrekte Wörter
        if (stadtExists) addPoints(spielnachricht);
        if (landExists) addPoints(spielnachricht);
        if (flussExists) addPoints(spielnachricht);
        if (tierExists) addPoints(spielnachricht);

        // Aktuellen Score holen
        int currentScore = getCurrentScore(spielnachricht);

        // Eigenes DTO für die entgegennahme der Daten für das Frontend
        WortpruefungGesamtDTO gesamtResult = new WortpruefungGesamtDTO(
                new WortpruefungEinzelDTO(worte.stadt(), stadtExists),
                new WortpruefungEinzelDTO(worte.land(), landExists),
                new WortpruefungEinzelDTO(worte.fluss(), flussExists),
                new WortpruefungEinzelDTO(worte.tier(), tierExists),
                currentScore
        );

        return ResponseEntity.ok(gesamtResult);
    }
// Diese Methode überprüft ob das gegebene Wort der Kriterien gerecht wird.
    private boolean pruefeWort(Wort wort, String rubrik, List<Wort> alleWorte, char currentLetter) {
        // Null-Check für alle Worte aus der DB
        if (alleWorte == null) {
            return false;
        }

        // Null-Check für das übergebene Wort
        if (wort == null) {
            return false;
        }

        // Null-Check für den Namen des übergebenen Wortes
        if (wort.getName() == null || wort.getName().trim().isEmpty()) {
            return false;
        }

        String wortName = wort.getName().trim();
        char firstChar = Character.toLowerCase(wortName.charAt(0));

        // Prüfe Anfangsbuchstaben vom übergebenen Wort
        if (Character.toLowerCase(currentLetter) != firstChar) {
            return false;
        }

        // Prüfe die Existenz in der Datenbank
        for (Wort w : alleWorte) {
            // Null-Check für Datenbank-Wort und dessen Name
            if (w != null && w.getName() != null) {
                // Wenn das Wort dessen Name dem aus der Datenbank gleicht
                if (w.getName().equalsIgnoreCase(wortName)) {
                    return true;
                }

                // Prüfe auf Tippfehler (max. 1 Fehler)
                StringsComparator comparator = new StringsComparator(w.getName(), wortName);
                EditScript<Character> script = comparator.getScript();
                if (script.getModifications() <= 1) {
                    return true;
                }
            }
        }
        return false;
    }
    // Hier wird von dem Spieler der aktuelle Score gezogen, um Code Dopplungen in der Zukunft zu sparen
    private int getCurrentScore(SpielnachrichtDTO spielnachricht) {
        if (spielnachricht.benutzer() != null) {
            String username = spielnachricht.benutzer().getUsername();
            Optional<Benutzer> userOpt = registeredUsers.stream()
                    .filter(b -> b.getUsername().equals(username))
                    .findFirst();

            if (userOpt.isPresent()) {
                return userOpt.get().getScore();
            }
        }
        return 0;
    }

}
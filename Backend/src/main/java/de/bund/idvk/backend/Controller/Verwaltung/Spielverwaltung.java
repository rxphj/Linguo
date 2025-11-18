package de.bund.idvk.backend.Controller.Verwaltung;

import de.bund.idvk.backend.Model.Benutzer;
import de.bund.idvk.backend.Model.DTOs.*;
import de.bund.idvk.backend.Model.Repository.UserRepository;
import de.bund.idvk.backend.Model.Repository.WortRepo;
import de.bund.idvk.backend.Model.Service.BenutzerService;
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
    @Autowired
    WortRepo wortRepo;
    @Autowired
    private LetterService letterService;
    @Autowired
    private BenutzerService benutzerService;
    private List<Benutzer> registeredUsers =null;

    public Spielverwaltung(UserRepository userRepository) {
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
        benutzerService.getRegistered().forEach(System.out::println);
        Optional<Benutzer> userOpt = benutzerService.getRegistered().stream()
                .map(b -> b.getUsername().equals(username)? b:null).findFirst();
        // Bei einem Treffer werden weitere 10 Punkte auf dein Konto zugeschrieben
        userOpt.ifPresent(benutzer -> benutzer.setScore(benutzer.getScore() + 10));
        System.out.println(userOpt.isPresent());
        benutzerService.getRegistered().remove(spielnachrichtDTO.benutzer());
        benutzerService.registerUser(userOpt.orElse(spielnachrichtDTO.benutzer()));
        registeredUsers=benutzerService.getRegistered();
    }

    @PostMapping("/check/wort")
    public ResponseEntity<WortpruefungGesamtDTO> checkWortRubriken(@RequestBody SpielnachrichtDTO spielnachricht) {
        List<Wort> alleWorte = wortRepo.findAllWoerter();
        alleWorte.forEach(System.out::println);
        char currentLetter = letterService.getCurrentLetter();
        // Null-Check für die übergebenen Daten
        if (spielnachricht.wort() == null) {
            WortpruefungEinzelDTO empty = new WortpruefungEinzelDTO(null, false);
            return ResponseEntity.ok(new WortpruefungGesamtDTO(empty, empty, empty, empty, 0));
        }
        System.out.println(spielnachricht.wort().tier().getName());
        WortDTO worte = spielnachricht.wort();
        // Alle Wörter prüfen in den einzelnen Rubriken
        boolean stadtExists = pruefeWort(worte.stadt(), alleWorte, currentLetter);
        boolean landExists = pruefeWort(worte.land(), alleWorte, currentLetter);
        boolean flussExists = pruefeWort(worte.fluss(), alleWorte, currentLetter);
        boolean tierExists = pruefeWort(worte.tier(), alleWorte, currentLetter);

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
    private boolean pruefeWort(Wort wort, List<Wort> alleWorte, char currentLetter) {
        // Null-Check für alle Worte aus der DB
        if (alleWorte == null) {
            return false;
        }

        // Null-Check für das übergebene Wort
        if (wort == null) {
            System.out.println("Wort is null");
            return false;
        }
        if (wort.getName().isEmpty()) {
            System.out.println("Wort name is null");
            return false;
        }
        System.out.println("Name: " + wort.getName());
        String wortName = wort.getName();
        String firstChar = String.valueOf(letterService.getCurrentLetter()).toLowerCase();
        System.out.println(firstChar);
        // Prüfe Anfangsbuchstaben vom übergebenen Wort
        if (!firstChar.equals(wortName.substring(0,1).toLowerCase())) {
            System.out.println("Wart ist nicht selber buchstabe");
            return false;
        }

        // Prüfe die Existenz in der Datenbank
        for (Wort w : alleWorte) {
            // Null-Check für Datenbank-Wort
            if (w != null) {
                // Wenn das Wort dessen N
                // ame dem aus der Datenbank gleicht
                if (w.getName().equalsIgnoreCase(wortName)) {
                    return true;
                }
                // Prüfe auf Tippfehler (max. 1 Fehler)
                StringsComparator comparator = new StringsComparator(w.getName(), wortName.trim());
                EditScript<Character> script = comparator.getScript();
                if (script.getModifications() <= 2) {
                    System.out.println(w.getName()+script.getModifications());
                    return true;
                }else{
                    System.out.println(w.getName()+script.getModifications());
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
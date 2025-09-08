package de.bund.idvk.backend.Controller.Verwaltung;

import de.bund.idvk.backend.Model.Benutzer;
import de.bund.idvk.backend.Model.DTOs.*;
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

    @Autowired
    private WortRepo wortRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LetterService letterService;

    private List<Benutzer> registeredUsers = new ArrayList<>();

    @GetMapping("/generate/buchstabe")
    public ResponseEntity<String> generateBuchstabe() {
        char neuerBuchstabe = letterService.generateNewLetter();
        return ResponseEntity.ok(String.valueOf(neuerBuchstabe));
    }

    public void addPoints(SpielnachrichtDTO spielnachrichtDTO) {
        if (spielnachrichtDTO == null || spielnachrichtDTO.benutzer() == null) {
            return;
        }

        String username = spielnachrichtDTO.benutzer().getUsername();
        System.out.println("Punkte für: " + username);

        Optional<Benutzer> userOpt = registeredUsers.stream()
                .filter(b -> b.getUsername().equals(username))
                .findFirst();

        if (userOpt.isPresent()) {
            Benutzer benutzer = userOpt.get();
            benutzer.setScore(benutzer.getScore() + 10);
            System.out.println("10 Punkte für: " + username + " - Neuer Score: " + benutzer.getScore());
        }
    }

    @PostMapping("/check/wort")
    public ResponseEntity<WortpruefungGesamtDTO> checkWort(@RequestBody SpielnachrichtDTO spielnachricht) {
        List<Wort> alleWorte = wortRepo.findAll();
        char currentLetter = letterService.getCurrentLetter();
        System.out.println("Aktueller Buchstabe: " + currentLetter);

        // Benutzer registrieren
        registerUser(spielnachricht);

        if (spielnachricht.wort() == null) {
            WortpruefungEinzelDTO empty = new WortpruefungEinzelDTO(null, false);
            return ResponseEntity.ok(new WortpruefungGesamtDTO(empty, empty, empty, empty, 0));
        }

        WortDTO worte = spielnachricht.wort();

        // Alle Wörter prüfen
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

        WortpruefungGesamtDTO gesamtResult = new WortpruefungGesamtDTO(
                new WortpruefungEinzelDTO(worte.stadt(), stadtExists),
                new WortpruefungEinzelDTO(worte.land(), landExists),
                new WortpruefungEinzelDTO(worte.fluss(), flussExists),
                new WortpruefungEinzelDTO(worte.tier(), tierExists),
                currentScore
        );

        return ResponseEntity.ok(gesamtResult);
    }

    private boolean pruefeWort(Wort wort, String rubrik, List<Wort> alleWorte, char currentLetter) {
        if (wort == null || wort.getName() == null || wort.getName().trim().isEmpty()) {
            System.out.println(rubrik + ": Kein Wort angegeben");
            return false;
        }

        String wortName = wort.getName().trim();
        char firstChar = Character.toLowerCase(wortName.charAt(0));

        // Prüfe Anfangsbuchstaben
        if (Character.toLowerCase(currentLetter) != firstChar) {
            System.out.println(rubrik + " '" + wortName + "' beginnt nicht mit " + currentLetter);
            return false;
        }

        // Prüfe Existenz in der Datenbank
        for (Wort w : alleWorte) {
                if (w.getName().equalsIgnoreCase(wortName)) {
                    System.out.println(rubrik + " '" + wortName + "' gefunden");
                    return true;
                }

                // Prüfe auf Tippfehler (max. 1 Modification)
                StringsComparator comparator = new StringsComparator(w.getName(), wortName);
                EditScript<Character> script = comparator.getScript();
                if (script.getModifications() <= 1) {
                    return true;
                }
            }

        return false;
    }

    private void registerUser(SpielnachrichtDTO spielnachricht) {
        if (spielnachricht.benutzer() != null) {
            String username = spielnachricht.benutzer().getUsername();
            boolean userExists = registeredUsers.stream()
                    .anyMatch(b -> b.getUsername().equals(username));

            if (!userExists) {
                Benutzer benutzer = userRepository.findByUsername(username);
                if (benutzer != null) {
                    registeredUsers.add(benutzer);
                    System.out.println("Benutzer registriert: " + username);
                }
            }
        }
    }

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

    @GetMapping("/registered/user")
    public List<Benutzer> getBenutzer() {
        return registeredUsers;
    }

    @GetMapping("/current/letter")
    public String getCurrentLetter() {
        return letterService.getCurrentLetterAsString();
    }
}
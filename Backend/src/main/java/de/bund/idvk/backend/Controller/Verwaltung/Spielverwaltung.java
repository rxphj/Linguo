package de.bund.idvk.backend.Controller.Verwaltung;

import de.bund.idvk.backend.Model.DTOs.WortpruefungDTO;
import de.bund.idvk.backend.Model.Repository.WortRepo;
import de.bund.idvk.backend.Model.Wort;
import org.apache.commons.text.diff.EditScript;
import org.apache.commons.text.diff.StringsComparator;
import org.apache.commons.text.similarity.JaroWinklerDistance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class Spielverwaltung {

    JaroWinklerDistance jaroWinklerDistance = new JaroWinklerDistance();
    @Autowired
    WortRepo wortRepo;

    @GetMapping("/generate/buchstabe")
    public ResponseEntity<String> generateWort() {
        char[] buchstaben = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'};
        int rand = (int) (Math.random() * buchstaben.length);
        return ResponseEntity.ok(String.valueOf(buchstaben[rand]));
    }

    @GetMapping("/check/wort")
    public ResponseEntity<WortpruefungDTO> checkWort(@RequestBody Wort wort) {
        WortpruefungDTO wortpruefungDTO = null;
        List<Wort> alleWorte = wortRepo.findAll();
        for (Wort w : alleWorte) {
            StringsComparator stringsComparator= new StringsComparator(w.getName(), wort.getName());
            EditScript<Character>script = stringsComparator.getScript();
            int mod= script.getModifications();
            System.out.println(w.getName() + ": " + mod);
            if (w.getName().equals(wort.getName())) {
                wortpruefungDTO = new WortpruefungDTO(wort, true);
                break;
            }
            if (mod <= 2) {
                wortpruefungDTO = new WortpruefungDTO(wort, true);
                System.out.println(wortpruefungDTO.wort().getName());
                break;
            }
        }
        if (wortpruefungDTO == null) {
            wortpruefungDTO = new WortpruefungDTO(wort, false);
        }

        return ResponseEntity.ok(wortpruefungDTO);
    }
}
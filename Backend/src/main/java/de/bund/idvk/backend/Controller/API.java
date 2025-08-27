package de.bund.idvk.backend.Controller;


import de.bund.idvk.backend.Model.Wort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/wort")
public class API {

    //Wort
    @Autowired
    private Wort wortNutzen;

    @GetMapping
    public List<wortNutzen> getAllWorts(){
        return wortNutzen.getAllWorts();
    }

    @GetMapping("/api/{id}")
    public ResponseEntity<?> getWortById(@PathVariable long id){
        Optional<?> wortNutzen = wortNutzen.getWortByID(id);
        return wortNutzen.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Wort createWort(@RequestBody Wort wort){
        return wortNutzen.createWort(wort);
    }

    @DeleteMapping("/api/{id}")
    // void oder ?
    public ResponseEntity<?> deleteWort(@PathVariable long id){
        wortNutzen.deleteWort(id);
        return ResponseEntity.noContent().build();
    }

    //User

}

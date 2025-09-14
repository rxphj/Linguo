package de.bund.idvk.backend.Model.Service;

import de.bund.idvk.backend.Model.Benutzer;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
//Singleton
@Service
public class BenutzerService {
    // Alle aktuellen Benutzer der Sitzung werden hier gespeichert
    private final List<Benutzer> registeredUsers = new ArrayList<>();

    public List<Benutzer> getRegistered() {
        return registeredUsers;
    }

    public void registerUser(Benutzer benutzer) {
        if (benutzer != null && !registeredUsers.contains(benutzer)) {
            registeredUsers.add(benutzer);
        }
    }

}
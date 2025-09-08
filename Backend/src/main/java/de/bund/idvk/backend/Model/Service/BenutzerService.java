package de.bund.idvk.backend.Model.Service;

import de.bund.idvk.backend.Model.Benutzer;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class BenutzerService {
    private final List<Benutzer> registeredUsers = new ArrayList<>();

    public List<Benutzer> getRegistered() {
        return registeredUsers;
    }

    public void registerUser(Benutzer benutzer) {
        if (benutzer != null && !registeredUsers.contains(benutzer)) {
            registeredUsers.add(benutzer);
        }
    }

    public void removeUser(Benutzer benutzer) {
        registeredUsers.remove(benutzer);
    }

    public void clearUsers() {
        registeredUsers.clear();
    }
}
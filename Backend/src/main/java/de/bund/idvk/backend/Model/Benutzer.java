package de.bund.idvk.backend.Model;

import de.bund.idvk.backend.Model.Enums.Rolle;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Table
@Entity
public class Benutzer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Rolle rolle;
    private String username;
    private String password;

    public Rolle getRolle() {
        return rolle;
    }

    public void setRolle(Rolle rolle) {
        this.rolle = rolle;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

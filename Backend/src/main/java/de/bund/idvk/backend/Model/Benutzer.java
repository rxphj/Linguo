package de.bund.idvk.backend.Model;

import de.bund.idvk.backend.Model.Enums.Rolle;
import jakarta.persistence.*;


@Table
@Entity

public class Benutzer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Rolle rolle;
    private String username;
    private String password;
    private int score;

    public long getId() {
        return id;
    }

    public void setScore(int score){
        this.score = score;
    }
    public void getScore(int score){
        this.score = score;
    }

    public int getScore(){
        return score;
    }
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

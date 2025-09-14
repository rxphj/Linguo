package de.bund.idvk.backend.Model;

import de.bund.idvk.backend.Model.Enums.Rolle;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Table
@Entity

public class Benutzer {
    // Definiton der Tabelle für DB
    // SQL Statment findet man in der V1__.sql Datei
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Enumerated(EnumType.STRING)
    private Rolle rolle;
    private String username;
    private String password;
    private int score;

    public Benutzer() {
    }
    public Benutzer(long id, Rolle rolle, String username, String password ) {
        this.id = id;
        this.rolle = rolle;
        this.username = username;
        this.password = password;
    }

    public void setId(long id) {
        this.id = id;
    }

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

package de.bund.idvk.backend.Model;

import jakarta.persistence.*;

@Entity
@Table
public class Highscore {
    // Nicht funktionial
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long benutzerid;
    private long wortid;
    private int Highscore;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getBenutzerid() {
        return benutzerid;
    }

    public void setBenutzerid(long benutzerid) {
        this.benutzerid = benutzerid;
    }

    public long getWortid() {
        return wortid;
    }

    public void setWortid(long wortid) {
        this.wortid = wortid;
    }

    public int getHighscore() {
        return Highscore;
    }

    public void setHighscore(int highscore) {
        Highscore = highscore;
    }
}

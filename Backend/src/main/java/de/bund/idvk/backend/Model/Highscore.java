package de.bund.idvk.backend.Model;

import jakarta.persistence.*;

@Entity
@Table
public class Highscore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long benutzerid;
    private long wortid;
    private int Highscore;
}

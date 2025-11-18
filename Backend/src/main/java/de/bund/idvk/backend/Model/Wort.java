package de.bund.idvk.backend.Model;

import de.bund.idvk.backend.Model.Enums.Rubrik;
import jakarta.persistence.*;

import java.util.Enumeration;


@Entity
@Table
public class Wort {
    // Definiton der Tabelle für DB
    // SQL Statment findet man in der V1__.sql Datei
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;
    private String name;
    @Enumerated(EnumType.STRING)
    private Rubrik rubrik;

    public Wort(long id, String name, Rubrik rubrik) {
        this.id = id;
        this.name = name;
        this.rubrik = rubrik;
    }

    public Wort() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Rubrik getRubrik() {
        return rubrik;
    }

    public void setRubrik(Rubrik rubrik) {
        this.rubrik = rubrik;
    }
}

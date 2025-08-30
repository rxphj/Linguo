package de.bund.idvk.backend.Model;

import de.bund.idvk.backend.Model.Enums.Rubrik;
import jakarta.persistence.*;


@Entity
@Table
public class Wort {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;
    private String name;
    private Rubrik rubrik;

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

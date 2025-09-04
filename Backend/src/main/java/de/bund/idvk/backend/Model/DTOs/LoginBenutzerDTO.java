package de.bund.idvk.backend.Model.DTOs;

import de.bund.idvk.backend.Model.Benutzer;

public record LoginBenutzerDTO (
        Benutzer benutzer,
        boolean eingeloggt
){
}

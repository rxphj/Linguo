package de.bund.idvk.backend.Model.DTOs;

import de.bund.idvk.backend.Model.Benutzer;
import de.bund.idvk.backend.Model.Wort;

public record SpielnachrichtDTO(
        Benutzer benutzer,
        Wort wort
) {
}

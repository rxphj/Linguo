package de.bund.idvk.backend.Model.DTOs;

import de.bund.idvk.backend.Model.Wort;

public record WortpruefungDTO(
        Wort wort,
        boolean exists
) {
}

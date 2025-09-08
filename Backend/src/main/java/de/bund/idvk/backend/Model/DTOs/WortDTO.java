package de.bund.idvk.backend.Model.DTOs;

import de.bund.idvk.backend.Model.Wort;

public record WortDTO(
        Wort stadt,
         Wort land,
         Wort fluss,
         Wort tier) {
}

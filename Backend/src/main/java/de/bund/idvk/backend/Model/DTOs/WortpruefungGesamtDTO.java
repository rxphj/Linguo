package de.bund.idvk.backend.Model.DTOs;

import de.bund.idvk.backend.Model.DTOs.WortpruefungEinzelDTO;

public record WortpruefungGesamtDTO(
        WortpruefungEinzelDTO stadt,
        WortpruefungEinzelDTO land,
        WortpruefungEinzelDTO fluss,
        WortpruefungEinzelDTO tier,
        int score
) {}
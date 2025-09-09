//Komponente geschrieben von Yasmin Holik

import { useState, useEffect } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';

export default function Voting({ visible, word, type, onClose }) {
    //State für die gesetzte Stimme
    const [vote, setVote] = useState("");
    //State ob bereits abgestimmt wurde
    const [voted, setVoted] = useState(false);

    //Reset beim schließen des Dialogfensters
    useEffect(() => {
        if (!visible) {
            setVote("");
            setVoted(false);
        }
    }, [visible]);

    //handler für Stimmabgabe
    const handleVote = async (value) => {
        if (voted || !word) return;
        //Stimme setzen
        setVote(value);
        setVoted(true);

        try {
            //Vote ans Backend schicken
            await axios.post('/api/check/wort', {
                wort: word,
                type: type,
                accepted: value === "yes"
            });
            onClose();
        } catch (err) {
            console.error("Fehler beim Senden des Votes:", err);
        }
    };


    //nichts anzeigen wenn kein Abstimmungswort vorhanden ist
    if (!word) return null;

    return (
        <Dialog header="Wort prüfen" visible={visible} onHide={onClose}>
            <p>{type}: {word} als gültig akzeptieren?</p>
            <div>
                {/* Ja-Option */}
                <RadioButton
                    inputId="yes"
                    name="vote"
                    value="yes"
                    onChange={() => handleVote("yes")}
                    checked={vote === "yes"}
                />
                <label htmlFor="yes">Ja</label>

                {/* Nein-Option */}
                <RadioButton
                    inputId="no"
                    name="vote"
                    value="no"
                    onChange={() => handleVote("no")}
                    checked={vote === "no"}
                />
                <label htmlFor="no">Nein</label>

                {/* Anzeige der abgegebenen Stimme */}
                {vote && <p>Du hast abgestimmt: {vote === "yes" ? "Ja ✅" : "Nein ❌"}</p>}
            </div>
        </Dialog>
    );
}

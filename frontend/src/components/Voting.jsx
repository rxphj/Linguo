import { useState, useEffect } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';

export default function Voting({ visible, word, type, onClose }) {
    const [vote, setVote] = useState("");
    const [voted, setVoted] = useState(false);

    useEffect(() => {
        if (!visible) {
            setVote("");
            setVoted(false);
        }
    }, [visible]);
    const handleVote = async (value) => {
        if (voted || !word) return;
        setVote(value);
        setVoted(true);

        try {
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


    if (!word) return null;

    return (
        <Dialog header="Wort prüfen" visible={visible} onHide={onClose}>
            <p>{type}: {word} als gültig akzeptieren?</p>
            <div>
                <RadioButton
                    inputId="yes"
                    name="vote"
                    value="yes"
                    onChange={() => handleVote("yes")}
                    checked={vote === "yes"}
                />
                <label htmlFor="yes">Ja</label>

                <RadioButton
                    inputId="no"
                    name="vote"
                    value="no"
                    onChange={() => handleVote("no")}
                    checked={vote === "no"}
                />
                <label htmlFor="no">Nein</label>

                {vote && <p>Du hast abgestimmt: {vote === "yes" ? "Ja ✅" : "Nein ❌"}</p>}
            </div>
        </Dialog>
    );
}

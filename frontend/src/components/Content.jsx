import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import CurrentLetter from "./CurrentLetter";
import Timer from "./Timer";

export default function Content() {

    const [Stadt, setStadt] = useState("");
    const [Land, setLand] = useState("");
    const [Fluss, setFluss] = useState("");
    const [Tier, setTier] = useState("");

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isPause, setIsPause] = useState(true);
    const pauseState = useRef(isPause);

    const [waitingLobby, setWaitingLobby] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/status")
            .then((res) => {
                const currentPause = res.data.isPause;
                setIsPause(currentPause);
                pauseState.current = currentPause;

                // Falls Spiel gerade läuft → Spieler muss warten
                if (!currentPause) {
                    setIsWaiting(true);
                }
            })
            .catch((err) => console.error("Fehler beim Laden des Status:", err));

    }, [])

    const locked = isPause || isSubmitted;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        console.log("Abgeschickt:", { Stadt, Land, Fluss, Tier });
    };

    const handleTimerState = (pause) => {
        const checkPause = pauseState.current;

        if (checkPause == true && pause === false) {
            // neue Runde: Felder zurücksetzen und freigeben
            setStadt("");
            setLand("");
            setFluss("");
            setTier("");
            setIsSubmitted(false);

            // Spieler kann Teilnehmen
            setWaitingLobby(false);

            //Pausen Ende Status ans Backeend
            axios
                .post("http://localhost:8080/api/start", { isPause: false })
                .catch(err => console.error("Fehler beim Senden des Start Status:", err));
        };

        // Pausen Anfang ans Backend
        if (pauseState === false && pause === true) {
            axios
                .post("http://localhost:8080/api/end", { isPause: true })
                .catch((err) =>
                    console.error("Fehler beim Senden des End Status:", err)
                );
        }

        //Pause-Status aktualisieren
        setIsPause(pause);
        pauseState.current = pause;

    };

    //Wartelobby

    if (waitingLobby) {
        return (
            <main className="waitingLobby">
                <h1>Bitte warten,
                    <Timer/>
                </h1>
            </main>
        )
    }


    return (
        <main className="content">
            <div className="toolBox">
                <div className="toolLetter">
                    Aktueller Buchstabe: <CurrentLetter isPause={isPause} />
                </div>

                <div className="toolTimer">
                    <Timer onTimerState={handleTimerState} />
                </div>
            </div>

            <form className="spielfeld" onSubmit={handleSubmit}>
                <div className="rubrik">
                    <label>Stadt</label><br />
                    <InputText
                        placeholder="Stadt"
                        value={Stadt}
                        onChange={(e) => setStadt(e.target.value)}
                        disabled={locked}
                    />
                </div>

                <div className="rubrik">
                    <label>Land</label><br />
                    <InputText
                        placeholder="Land"
                        value={Land}
                        onChange={(e) => setLand(e.target.value)}
                        disabled={locked}
                    />
                </div>

                <div className="rubrik">
                    <label>Fluss</label><br />
                    <InputText
                        placeholder="Fluss"
                        value={Fluss}
                        onChange={(e) => setFluss(e.target.value)}
                        disabled={locked}
                    />
                </div>

                <div className="rubrik">
                    <label>Tier</label><br />
                    <InputText
                        placeholder="Tier"
                        value={Tier}
                        onChange={(e) => setTier(e.target.value)}
                        disabled={locked}
                    />
                </div>

                <button type="submit" disabled={locked}>
                    Abschicken
                </button>
            </form>
        </main>
    );
}
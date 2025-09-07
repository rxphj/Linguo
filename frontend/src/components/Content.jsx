import { useEffect, useState } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import CurrentLetter from "./CurrentLetter";
import Voting from "./Voting";
import SpielStateDisplay from "./SpielStateDisplay.jsx";

export default function Content() {
    const [Stadt, setStadt] = useState("");
    const [Land, setLand] = useState("");
    const [Fluss, setFluss] = useState("");
    const [Tier, setTier] = useState("");

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [gameState, setGameState] = useState("PAUSE");
    const [timeLeft, setTimeLeft] = useState(0);

    const [votingVisible, setVotingVisible] = useState(false);
    const [votingWord, setVotingWord] = useState(null);
    const [votingType, setVotingType] = useState(null);

    const isLocked = gameState === "PAUSE" || isSubmitted;

    // ⬇️ Callback aus SpielStateDisplay → Timer + State setzen
    const handleGameStateChange = ({ state, timeLeft }) => {
        setGameState(state);
        setTimeLeft(timeLeft);

        // Neue Runde → Felder resetten
        if (state === "ACTIVE" && timeLeft === 60) {
            setStadt("");
            setLand("");
            setFluss("");
            setTier("");
            setIsSubmitted(false);
        }
    };

    // ⬇️ Wörter abschicken
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        const gameInput = { stadt: Stadt, land: Land, fluss: Fluss, tier: Tier };

        try {
            const res = await axios.post("http://localhost:8080/api/submit", gameInput);

            if (!res.data.exists) {
                setVotingWord(res.data.word);
                setVotingType(res.data.type);
                setVotingVisible(true);
            }
        } catch (err) {
            console.error("Fehler beim Abschicken der Wörter:", err);
        }
    };

    return (
        <main className="content">
            <div className="toolBox">
                <div className="toolLetter">
                    Aktueller Buchstabe: <CurrentLetter isPause={gameState === "PAUSE"} />
                </div>

                <div className="toolTimer">
                    {/* WebSocket für Timer + State */}
                    <SpielStateDisplay onStateChange={handleGameStateChange} />

                    {/* Großer Countdown-Timer */}
                    <div
                        style={{
                            fontSize: "2.5rem",
                            fontWeight: "bold",
                            marginTop: "10px",
                            color: gameState === "ACTIVE" ? "green" : "red",
                            textAlign: "center",
                        }}
                    >
                        {gameState === "ACTIVE"
                            ? `⏱️ ${timeLeft}s`
                            : `⏸️ Pause: ${timeLeft}s`}
                    </div>
                </div>
            </div>

            <form className="spielfeld" onSubmit={handleSubmit}>
                <div className="rubrik">
                    <label>Stadt</label><br />
                    <InputText
                        placeholder="Stadt"
                        value={Stadt}
                        onChange={(e) => setStadt(e.target.value)}
                        disabled={isLocked}
                    />
                </div>

                <div className="rubrik">
                    <label>Land</label><br />
                    <InputText
                        placeholder="Land"
                        value={Land}
                        onChange={(e) => setLand(e.target.value)}
                        disabled={isLocked}
                    />
                </div>

                <div className="rubrik">
                    <label>Fluss</label><br />
                    <InputText
                        placeholder="Fluss"
                        value={Fluss}
                        onChange={(e) => setFluss(e.target.value)}
                        disabled={isLocked}
                    />
                </div>

                <div className="rubrik">
                    <label>Tier</label><br />
                    <InputText
                        placeholder="Tier"
                        value={Tier}
                        onChange={(e) => setTier(e.target.value)}
                        disabled={isLocked}
                    />
                </div>

                <button type="submit" disabled={isLocked}>
                    Abschicken
                </button>
            </form>

            <Voting
                visible={votingVisible}
                word={votingWord}
                type={votingType}
                onClose={() => setVotingVisible(false)}
            />
        </main>
    );
}

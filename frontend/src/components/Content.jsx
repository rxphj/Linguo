//Komponente geschrieben von Yasmin Holik

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import CurrentLetter from "./CurrentLetter";
import Timer from "./Timer";
import Voting from "./Voting";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function Content({ onUpdateScore }) {
    //States für Eingabefelder
    const [Stadt, setStadt] = useState("");
    const [Land, setLand] = useState("");
    const [Fluss, setFluss] = useState("");
    const [Tier, setTier] = useState("");

    //Userinformationen
    const [user, setUser] = useState(null);

    //Status ob schon abgeschickt
    const [isSubmitted, setIsSubmitted] = useState(false);

    //Status der Session - Aktiv oder Inaktiv
    const [sessionState, setSessionState] = useState("INACTIVE");
    const [prevState, setPrevState] = useState("INACTIVE");

    //Sekunden für den Timer
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [votingVisible, setVotingVisible] = useState(false);
    const [votingWord, setVotingWord] = useState(null);
    const [votingType, setVotingType] = useState(null);

    // WebSocket Verbindung für Timer + Status
    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe("/topic/session", (message) => {
                    const data = JSON.parse(message.body);
                    data.timerSeconds = undefined;
                    setSessionState(data.state);
                    setTimerSeconds(data.timerSeconds);
                });

                // Initiale Session anfordern
                client.publish({ destination: "/app/session/init" });
            },
        });

        client.activate();
        return () => client.deactivate();
    }, []);

    // Felder nur zurücksetzen, wenn Runde NEU startet (INACTIVE → ACTIVE)
    useEffect(() => {
        if (prevState === "INACTIVE" && sessionState === "ACTIVE") {
            setStadt("");
            setLand("");
            setFluss("");
            setTier("");
            setIsSubmitted(false);
        }
        setPrevState(sessionState);
    }, [sessionState]);

    //Eingaben sind gesperrt wenn Session nicht aktiv oder bereits abgeschickt
    const locked = sessionState !== "ACTIVE" || isSubmitted;

    //Absenden der Eingaben
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        try {
            //aktuellen Benutzer vom Server holen
            const userRes = await axios.get('http://localhost:8080/api/session/me');
            const username = userRes.data.username;
            if (!username) {
                setUser(null);
            }
            setUser(username);

            //Objekt mit Benutzer und Wörtern generieren
            const benutzer = { username: username };
            const spielnachricht = {
                benutzer: benutzer,
                wort: {
                    stadt: { name: Stadt, rubrik: "Stadt" },
                    land: { name: Land, rubrik: "Land" },
                    fluss: { name: Fluss, rubrik: "Fluss" },
                    tier: { name: Tier, rubrik: "Tier" }
                }
            };

            //Wörter prüfen
            const res = await axios.post("http://localhost:8080/api/check/wort", spielnachricht).then(
                res=>{
                    alert(res.data.score + " Punkte!")
                }
            )

            // Score an Parent-Komponente übergeben
            if (res.data.score && onUpdateScore) {
                onUpdateScore(res.data.score);
            }

        } catch (err) {
        }
    };

    // Warten-Lobby, wenn Runde nicht aktiv
    if (sessionState !== "ACTIVE") {
        return (
            <main className="waitingLobby">
                <h1>Pause – nächste Runde startet in <Timer seconds={timerSeconds} /></h1>
            </main>
        );
    }

    //Anzeige des Spielfeldes bei aktiver Runde
    return (
        <main className="content">
            <div className="toolBox">
                <div className="toolLetter">
                    Aktueller Buchstabe: <CurrentLetter />
                </div>
                <div className="toolTimer">
                    <Timer seconds={timerSeconds} state={sessionState} />
                </div>
            </div>

            {/* Eingabefelder für Stadt, Land, Fluss und Tier */}
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

            {/* Voting-Dialog */}
            <Voting
                visible={votingVisible}
                word={votingWord}
                type={votingType}
                onClose={() => setVotingVisible(false)}
            />
        </main>
    );
}
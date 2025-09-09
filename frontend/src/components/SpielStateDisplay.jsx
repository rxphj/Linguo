//Komponente geschrieben von Raphael Pohl

import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ProgressBar } from "primereact/progressbar";

/**
 * Props:
 * - onStateChange({ state, timeLeft }) → wird bei jeder Server-Nachricht ausgelöst
 */
export default function SpielStateDisplay({ onStateChange }) {

    const [timeLeft, setTimeLeft] = useState(0);
    const [gameState, setGameState] = useState("PAUSE");

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("✅ WebSocket verbunden (GameStateDisplay)");

                client.subscribe("/topic/state", (message) => {
                    try {
                        const data = JSON.parse(message.body);
                        setGameState(data.state);
                        setTimeLeft(data.timeLeft);

                        if (onStateChange) {
                            onStateChange({ state: data.state, timeLeft: data.timeLeft });
                        }
                    } catch (e) {
                        console.error("Fehler beim Parsen:", e);
                    }
                });
            },
        });

        client.activate();

        return () => client.deactivate();
    }, [onStateChange]);

    const duration = gameState === "ACTIVE" ? 60 : 30;
    const percentage = (timeLeft / duration) * 100;

    return (
        <div>
            <p>
                {gameState === "ACTIVE" ? "🟢 Runde läuft" : "⏸️ Pause"} – {timeLeft} Sekunden
            </p>
            <ProgressBar value={percentage} showValue={false} />
        </div>
    );
}

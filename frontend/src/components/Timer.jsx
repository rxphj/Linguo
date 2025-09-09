//Komponente geschrieben von Yasmin Holik

import { ProgressBar } from 'primereact/progressbar';
import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function Timer({ onTimerState }) {
    // Sekunden, die noch übrig sind
    const [secondsLeft, setSecondsLeft] = useState(0);
    // aktueller Status der Session
    const [sessionState, setSessionState] = useState("INACTIVE");
    //vermeidung von mehrfachem Starten und Stoppen
    const timerRef = useRef(null);

    //Websocket
    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                client.publish({ destination: "/app/session/init" });

                // Nachrichten vom Server empfangen
                client.subscribe("/topic/session", (message) => {
                    const status = JSON.parse(message.body);
                    // Session-State und Sekunden aktualisieren
                    setSessionState(status.state);
                    setSecondsLeft(status.seconds);

                    if (onTimerState) onTimerState(status.state);

                    // Timer starten, wenn State ACTIVE und noch kein Interval läuft
                    if (status.state === "ACTIVE" && !timerRef.current) {
                        timerRef.current = setInterval(() => {
                            setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
                        }, 1000);
                    } else if (status.state !== "ACTIVE" && timerRef.current) {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                    }
                });
            },
        });

        client.activate();
        return () => {
            client.deactivate();
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [onTimerState]);


    //Maximale Zeit pro Spiel oder Pause
    const maxTime = sessionState === "ACTIVE" ? 60 : 30;

    return (
        <div>
            {/* Anzeige: Sekunden + Fortschrittsbalken */}
            <p>{sessionState === "ACTIVE" ? "Aktuelle Runde:" : ""} {secondsLeft} Sekunden
                <ProgressBar value={(secondsLeft / maxTime) * 100} showValue={false} />
            </p>
        </div>
    );
}

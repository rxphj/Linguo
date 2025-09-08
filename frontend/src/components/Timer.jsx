import { ProgressBar } from 'primereact/progressbar';
import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function Timer({ onTimerState }) {
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [sessionState, setSessionState] = useState("INACTIVE");
    const timerRef = useRef(null);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                client.publish({ destination: "/app/session/init" });

                client.subscribe("/topic/session", (message) => {
                    const status = JSON.parse(message.body);
                    setSessionState(status.state);
                    setSecondsLeft(status.seconds);

                    if (onTimerState) onTimerState(status.state);

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

    const maxTime = sessionState === "ACTIVE" ? 60 : 30;

    return (
        <div>
            <p>{sessionState === "ACTIVE" ? "Aktuelle Runde:" : ""} {secondsLeft} Sekunden
                <ProgressBar value={(secondsLeft / maxTime) * 100} showValue={false}/>
            </p>
        </div>
    );
}

import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from '@stomp/stompjs';

export default function CurrentLetter() {
    const [letter, setLetter] = useState("");

    useEffect(() => {
        let client; // Variable außerhalb des Client-Objekts

        const socket = new SockJS('http://localhost:8080/ws');
        client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe('/topic/buchstabe', (message) => {
                    const newLetter = message.body;
                    setLetter(newLetter);
                });
                client.publish({
                    destination: '/app/session/buchstabe'
                });
            },

        });

        client.activate();

        return () => {
            if (client) {
                client.deactivate();
            }
        };
    }, []);

    return <>{letter.toUpperCase() || "-"}</>;
}
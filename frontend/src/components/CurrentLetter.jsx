//Komponente geschrieben von Yasmin Holik

import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from '@stomp/stompjs';

export default function CurrentLetter() {
    //State für den aktuellen Buchstaben
    const [letter, setLetter] = useState("");

    useEffect(() => {
        let client; // Variable außerhalb des Client-Objekts

        //Verbindung zum Backend mit SockJS
        const socket = new SockJS('http://localhost:8080/ws');
        client = new Client({
            webSocketFactory: () => socket,
            //autom. Reconnect nach 5 s
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe('/topic/buchstabe', (message) => {
                    const newLetter = message.body;
                    setLetter(newLetter);
                });
                //Direkt beim Connect den aktuellen Buchstaben ziehen
                client.publish({
                    destination: '/app/session/buchstabe'
                });
            },

        });

        //Verbindung aktivieren
        client.activate();

        return () => {
            if (client) {
                client.deactivate();
            }
        };
    }, []);

    //Ausgabe des Buchstabens in Großbuchstaben
    return <>{letter.toUpperCase() || "-"}</>;
}
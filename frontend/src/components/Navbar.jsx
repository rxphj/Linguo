//geschrieben von Yasmin Holik

import { Highscore } from "./Highscore";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";


/*Navbar Komponente stellt das Grid Element da, welches DIe aktuelle Teilnehmer und die Weiterleitung zur Highscore
Seite anzeigen soll*/

export default function Navbar() {

    //State um den Highscore Dialog anzuzeigen
    const [showDialog, setShowDialog] = useState(false);
    //State für die aktuellen Teilnehmer
    const [teilnehmer, setTeilnehmer] = useState([]);
    //Stomp Client
    const [stompClient, setStompClient] = useState(null);

    // Teilnehmer holen
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe('/topic/benutzer', (message) => {
                    try {
                        const benutzerListe = JSON.parse(message.body);
                        setTeilnehmer(benutzerListe);
                    } catch (error) {
                        setTeilnehmer([]);
                    }
                });

                client.publish({
                    destination: '/app/session/benutzer'
                });
            },
        });

        //Verbindung aktivieren
        client.activate();
        setStompClient(client);

        return () => {
            if (client) {
                client.deactivate();
            }
        };
    }, []);



    return (
        <aside className="navbar">
            <div className="teilnehmer">
                <div>Aktuelle Teilnehmer ({teilnehmer.length})</div>

                <ul>
                    {teilnehmer.length > 0 ? (
                        teilnehmer.map((user, index) => (
                            <li key={index} className="teilnehmer-item">
                                <span className="username">{user.username}</span>
                            </li>
                        ))
                    ) : (
                        <li>Keine Teilnehmer</li>
                    )}
                </ul>
            </div>

            {/* Highscore Icon klickbar machen*/}
            <div className="highscore">
                <img
                    src="/highScore_img.png"
                    alt="Highscore Image"
                    className="highscore_img"
                    onClick={() => setShowDialog(true)}
                />
            </div>

            <Highscore visible={showDialog} onHide={() => setShowDialog(false)} />
        </aside>
    );
}
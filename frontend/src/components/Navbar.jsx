import { Highscore } from "./Highscore";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function Navbar() {
    const [showDialog, setShowDialog] = useState(false);
    const [teilnehmer, setTeilnehmer] = useState([]);
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
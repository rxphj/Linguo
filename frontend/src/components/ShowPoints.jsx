import { useEffect, useState } from "react";
import axios from "axios";
import AdminVerwaltung from "./AdminVerwaltung.jsx";
import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";

export default function ShowPoints({ adminAdd, score, points }) {
    const [showDialog, setShowDialog] = useState(false);
    const [teilnehmer, setTeilnehmer] = useState([]);
    const [stomp, setStompClient] = useState({});
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
        <aside className="point-section">
            <div className="points">Deine Punkte: {score}</div>

            <ul>
                {teilnehmer.length > 0 ? (
                    teilnehmer.map((user, index) => (
                        <li key={index} className="teilnehmer-item">
                            <span className="username">{user.username}</span>
                            <span className ="points"> {teilnehmer.score}</span>
                        </li>
                    ))
                ) : (
                    <li>Keine Teilnehmer</li>
                )}
            </ul>

            <div className="adminsection">
                {adminAdd && <img
                    src="/Adminsection-img.png"
                    alt="adminsection-img"
                    className="adminsection_img"
                    onClick={() => setShowDialog(true)}
                />}
            </div>

            <AdminVerwaltung
                visible={showDialog}
                onHide={() => setShowDialog(false)}
            />
        </aside>
    );
}
//Komponente geschrieben von Yasmin Holik

import { useEffect, useState } from "react";
import axios from "axios";
import AdminVerwaltung from "./AdminVerwaltung.jsx";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import Timer from "./Timer.jsx";
export default function ShowPoints({ adminAdd, score, points }) {
    //State um den Adminbereich sichtbar zu machen
    const [showDialog, setShowDialog] = useState(false);
    //Teilnehmerliste
    const [teilnehmer, setTeilnehmer] = useState([]);
    //Stomp
    const [stomp, setStompClient] = useState({});
    //Websocket Verbindung
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                //Teilnehmerupdates abonnieren
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
        //Verbindung aktivieren
        return () => {
            if (client) {
                client.deactivate();
            }
        };
    }, []);
    return (
        <aside className="point-section">
            {/* Anzeige der eigenen Punkte */}
            <div className="points">Deine Punkte: {score}</div>

            <ul>
                {teilnehmer.length > 0 ? (
                    teilnehmer.map((user, index) => (
                        <li key={index} className="teilnehmer-item">
                            <span className="username">{user.username}</span>
                            <span className="points"> {user.score}</span>
                        </li>
                    ))
                ) : (
                    <li>Keine Teilnehmer</li>
                )}
            </ul>

            {/* Adminbereich-Icon soll nur sichtbar für Admins sein */}
            <div className="adminsection">
                {adminAdd && <img
                    src="/AdminBurgerMenue.png"
                    className="adminsection_img"
                    alt="/Adminsection-img.png"
                    onClick={() => setShowDialog(true)}
                    />}
            </div>

            {/* Admin-Verwaltung im Dialogfenster */}
            <AdminVerwaltung
                visible={showDialog}
                onHide={() => setShowDialog(false)}
            />
        </aside>
    );
}
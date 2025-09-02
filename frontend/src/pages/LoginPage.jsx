import { Button } from 'primereact/button';
import { login } from '../api/rest';
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import axios from "axios";
import { Client } from '@stomp/stompjs';
axios.get("http://localhost:3001/api/read/user")
export default function LoginPage({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [stompClient, setStompClient] = useState(null);

    // WebSocket-Verbindung aufbauen
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('✅ WebSocket verbunden');

                // Topic abonnieren
                client.subscribe('/topic/register', (message) => {
                    console.log('📥 Nachricht empfangen:', message.body);
                    const user = JSON.parse(message.body);
                    setRegisteredUsers((prev) => [...prev, user]);
                });
            },
            onStompError: (frame) => {
                console.error('❌ STOMP Fehler:', frame);
            }
        });

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, []);

    // Registrierung senden
    const handleRegister = () => {
        if (stompClient && stompClient.connected) {
            const user = { username };
            stompClient.publish({
                destination: '/app/register',
                body: JSON.stringify(user),
            });
            console.log("📤 Registrierung gesendet:", user);
        } else {
            console.warn("❌ STOMP nicht verbunden");
        }
    };

    // Login senden
    const handleLogin = async () => {
        setError('');
        try {
            const res = await login(username, password);
            handleRegister(); // Benutzer bei erfolgreichem Login registrieren
            onLoginSuccess(res);
        } catch (err) {
            setError(err.message);
        }
    };

    // UI anzeigen
    return (
        <div className="LoginPage">
            <div className="login-form">
                <h1 className="login-title">Log dich zum Spielen ein!</h1>
                <input
                    placeholder="Benutzername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /> <br />
                <input
                    placeholder="Passwort"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /> <br />
                <Button onClick={handleLogin}>Login</Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

        </div>
    );
}

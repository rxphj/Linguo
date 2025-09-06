// LoginPage.js
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import axios from "axios";
import { Client } from '@stomp/stompjs';

export default function LoginPage({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [stompClient, setStompClient] = useState(null);
    // WebSocket-Verbindung aufbauen
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('✅ WebSocket verbunden');
            },
            onStompError: (frame) => {
                console.error('❌ STOMP Fehler:', frame);
            }
        });

        client.activate();
        setStompClient(client);

        return () => client.deactivate();
    }, []);

    // Registrierung über WebSocket senden
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

    // Login über Axios direkt
    const handleLogin = async () => {
        setError('');
        try {
            const res = await axios.post("http://localhost:8080/api/session/login", {
                username,
                password
            })
            console.log("Login erfolgreich:", res.data);
            handleRegister(); // WebSocket-Registrierung
            onLoginSuccess(res.data); // User an Routing weitergeben


        } catch (err) {
            console.error("Login-Fehler:", err.response || err);
            setError(err.response?.data?.message || "Login fehlgeschlagen");
        }
    };

    return (
        <div className="LoginPage">
            <div className="login-form">
                <h1 className="login-title">Log dich zum Spielen ein!</h1>
                <input
                    placeholder="Benutzername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                /> <br />
                <input
                    placeholder="Passwort"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /> <br />
                <Button onClick={handleLogin}>Login</Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
}

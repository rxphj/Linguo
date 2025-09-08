import React, { useState } from 'react';
import { Button } from 'primereact/button';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

// Axios global konfigurieren (am besten in main.js)
axios.defaults.withCredentials = true;

export default function LoginPage({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const initWebSocket = () => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => console.log('✅ WebSocket verbunden'),
            onStompError: (frame) => console.error('❌ STOMP Fehler:', frame),
        });
        client.activate();
        return client;
    };

    const handleLogin = async () => {
        setError('');
        setLoading(true);

        try {
            const res = await axios.post(
                'http://localhost:8080/api/session/login',
                { username, password },
                { withCredentials: true }
            );

            console.log('Login response:', res.data);

            // Handle different response formats
            if (res.data.success !== false) {
                const userData = {
                    username: res.data.username,
                    role: res.data.role,
                    ...res.data
                };
                initWebSocket();
                onLoginSuccess(userData);
            } else {
                setError(res.data.error || 'Login fehlgeschlagen');
            }

        } catch (err) {
            const errorMessage = err.response?.data?.error
                || err.response?.data?.message
                || err.message
                || 'Login fehlgeschlagen';

            setError(errorMessage);
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="LoginPage" onKeyPress={handleKeyPress}>
            <div className="login-form">
                <h1 className="login-title">Log dich zum Spielen ein!</h1>

                <input
                    placeholder="Benutzername"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    disabled={loading}
                />
                <br />

                <input
                    placeholder="Passwort"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                />
                <br />

                <Button
                    onClick={handleLogin}
                    disabled={loading || !username || !password}
                    label={loading ? 'Lädt...' : 'Login'}
                />

                {error && (
                    <p style={{ color: 'red', marginTop: '10px' }}>
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}
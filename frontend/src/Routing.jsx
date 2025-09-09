//geschrieben von Yasmin Holik

import { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import AdminPage from "./pages/AdminPage.jsx";

export default function Routing() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/session/me', {
                withCredentials: true
            });

            // Handle both response formats
            if (res.data.authenticated) {
                setUser(res.data); // Neue Format: {authenticated: true, username: ...}
            } else if (res.data.username) {
                setUser(res.data); // Alte Format: {username: ...}
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Session check failed:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginSuccess = (userData) => {
        setUser({
            authenticated: true,
            username: userData.username,
            role: userData.role,
            ...userData
        });
        checkSession();
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/session/logout', {}, {
                withCredentials: true
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!user) return <LoginPage onLoginSuccess={handleLoginSuccess} />;

    // Korrekte Überprüfung ob User Admin ist
    const isAdmin = () => {
        // Verschiedene mögliche Pfade für die Rolle prüfen
        return user.rolle === 'Admin' ||
            user.data?.rolle === 'Admin'
    };

    if (isAdmin()) {
        return <AdminPage user={user} onLogout={handleLogout} />;
    }

    return <GamePage adminAdd={false} user={user} onLogout={handleLogout} />;
}
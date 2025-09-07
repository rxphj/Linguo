import { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';

export default function Routing() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/session/me', { withCredentials: true })
            .then(res => setUser(res.data.username ? res.data : null))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const handleLoginSuccess = (userData) => setUser(userData);
    const handleLogout = () => {
        axios.post('http://localhost:8080/api/session/logout', {}, { withCredentials: true })
            .finally(() => setUser(null));
    };

    if (loading) return <p>Loading...</p>;
    if (!user) return <LoginPage onLoginSuccess={handleLoginSuccess} />;

    return <GamePage onLogout={handleLogout} />;
}

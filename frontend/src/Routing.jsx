import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import AdminPage from './pages/AdminPage';

export default function Routing() {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => { 
        localStorage.removeItem('user'); 
        setUser(null); 
    };

    if (!user) return <LoginPage onLoginSuccess={handleLoginSuccess} />;

    if (user.rolle === 'admin') return <AdminPage />;

    return <GamePage />;//
}










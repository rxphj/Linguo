import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import AdminPage from './pages/AdminPage';

//Controller zum Anzeigen der Seite

export default function Routing() {


    const [user, setUser] = useState(null);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
    };

    if(!user){
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }

    if (user.role === 'admin') return <AdminPage />;
    return <GamePage />;

}

/*import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import AdminPage from './pages/AdminPage';

export default function Routing() {
    // User-State initialisieren aus localStorage
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

   
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    // Login-Handler: wird von LoginPage aufgerufen
    const handleLoginSuccess = (userData) => {
        setUser(userData);
    };

    // Logout-Funktion (optional)
    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    if (!user) return <LoginPage onLoginSuccess={handleLoginSuccess} />;

    if (user.role === 'admin') return <AdminPage />;

    return <GamePage />;
}*/






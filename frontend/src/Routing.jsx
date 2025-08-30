import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import AdminPage from './pages/AdminPage';

//Controller zum Anzeigen der Seite

export default function Routing() {


    /*const [isLoggedIn, setIsLoggedIn] = useState(false);

    return isLoggedIn ? <GamePage /> : <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />*/

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

import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import AdminPage from './pages/AdminPage';

//Controller zum Anzeigen der Seite

export default function Routing() {


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return isLoggedIn ? <AdminPage /> : <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />


}

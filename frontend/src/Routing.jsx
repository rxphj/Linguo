import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';

//Controller zum Anzeigen der Seite

export default function Route() {


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return isLoggedIn ? <GamePage /> : <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />


}

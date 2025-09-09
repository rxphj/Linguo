//Komponente geschrieben von Yasmin Holik

import React from "react";
import axios from "axios";

export default function Logout({ stompClient, onLogout }) {

    //Handler für Logout
    const handleLogout = () => {
        //Websocket verbindne wenn vorhanden
        if (stompClient) {
            stompClient.disable();
            axios.post("api/session/logout")
        }

        if (onLogout) {
            onLogout();
        }
    };

    //Logout Button
    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
}

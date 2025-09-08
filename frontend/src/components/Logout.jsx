import React from "react";
import axios from "axios";

export default function Logout({ stompClient, onLogout }) {

    const handleLogout = () => {
        if (stompClient) {
            stompClient.disable();
            axios.post("api/session/logout")
        }

        if (onLogout) {
            onLogout();
        }
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
}

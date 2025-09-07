// src/pages/GamePage.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import ShowPoints from "../components/ShowPoints";

export default function GamePage({ onLogout }) {
    return (
        <div className="layout">
            <Header adminlogo={false} />
            <Navbar bottomContent="Highscore" />

            <main className="game-main">
                <Content />
                <ShowPoints adminAdd={false} />
            </main>

            <Footer />

            <button className="logout-button" onClick={onLogout}>
                Logout
            </button>
        </div>
    );
}

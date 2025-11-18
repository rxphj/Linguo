//Komponente geschrieben von Yasmin Holik

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import ShowPoints from "../components/ShowPoints";
import Logout from "../components/Logout.jsx";

export default function GamePage() {
    const [score, setScore] = useState(0);
    const [points, setPoints] = useState([]);

    // Callback-Funktion um Score von Content zu erhalten
    const handleUpdateScore = (newScore) => {
        return setScore(newScore);
    };

    // Funktion um Punkte-Liste zu aktualisieren (falls benötigt)
    const updatePoints = (newPoints) => {
        setPoints(newPoints);
    };

    return (
        <div className="layout">
            <Header adminlogo={false}/>
            <Navbar bottomContent="Highscore"/>

            {/* Content mit Score-Callback */}
            <Content  />

            {/* ShowPoints mit aktuellen Score und Punkten */}
            <ShowPoints
                adminAdd={false}
                score={score}
                points={points}
            />

            <Footer />
        </div>
    );
}
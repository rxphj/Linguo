import { useEffect, useState } from "react";
import axios from "axios";
import AdminVerwaltung from "./AdminVerwaltung.jsx";




//adminAdd ist ein Prop von AdminPage, zum anzeigen der Adminbilder auf der Admin Seite
export default function ShowPoints({ adminAdd }) {

    const [showDialog, setShowDialog] = useState(false);
    const [points, setPoints] = useState([]);

    useEffect(() => {
        // Punkte für das aktuelle Spiel 
        axios.get("http://localhost:8080/api/currentGamePoints") // Pfad anpassen
            .then(res => setPoints(res.data))
            .catch(err => console.error("Fehler beim Laden der Punkte:", err));
    }, []);


    return (


        <aside className="point-section">
            <div className="points">Punkte</div>
            {points.length === 0 ? (
                <p>Keine Punkte vorhanden</p>
            ) : (
                <ul>
                    {points.map((player, index) => (
                        <li key={index}>
                            {player.name}: {player.score} Punkte
                        </li>
                    ))}
                </ul>
            )}

            <div className="adminsection">
                {adminAdd && <img src="/Adminsection-img.png"
                    alt="adminsection-img"
                    className="adminsection_img"
                    onClick={() => setShowDialog(true)} />}
            </div>

            <AdminVerwaltung visible={showDialog} onHide={() => setShowDialog(false)} />


        </aside >






    )

}
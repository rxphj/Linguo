import { Highscore } from "./Highscore";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {

      const [showDialog, setShowDialog] = useState(false);
      const [teilnehmer, setTeilnehmer] = useState([{ name: "Alice" },
    { name: "Bob" },
    { name: "Charlie" }]);

      useEffect(() => {

        //Angemeldete Teilnehmer aus dem Backend
        axios.get("http://localhost:8080/api/teilnehmer") //Korrekten Pfad angeben
        .then((res) => setTeilnehmer(res.data))
        .catch((err) => console.error("Fehler beim Laden der Teilnehmer",err))

      },[]);
    
    return(
    
        <aside className="navbar">
            <div className="teilnehmer">
                <div>Aktuelle Teilnehmer</div>
                 <ul>
                    {teilnehmer.map((p, index) => (
                        <li key={index}>{p.name}</li>
                    ))}
                </ul>
            </div>
            <div className="highscore">
                <img src="/highScore_img.png" 
                alt="Highscore Image" 
                className="highscore_img" 
                onClick={() => setShowDialog(true)}
                />
            </div>
            <Highscore visible={showDialog} onHide={() => setShowDialog(false)} />
        </aside>
    
    )
}
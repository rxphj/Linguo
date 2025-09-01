import { Highscore } from "./Highscore";
import { useState } from "react";   

export default function Navbar() {

      const [showDialog, setShowDialog] = useState(false);
    
    return(
    
        <aside className="navbar">
            <div className="teilnehmer">
                <div>Aktuelle Teilnehmer</div>
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
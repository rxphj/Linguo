import { Dialog } from "primereact/dialog"
import { useEffect, useState } from "react";
import axios from "axios";

export function Highscore({ visible, onHide }) {

    const [score, setScore] = useState([]);
    const [personalScore, setPersonalScore] = useState(null);

    useEffect(() => {
        if (visible) {

            //Highscores aus dem Backend
            axios.get("http://localhost:8080/api/highscore")
                .then(res => setScore(res.data))
                .catch(err => console.error("Fehler beim Laden der Highscore:", err));

            axios.get("http://localhost:8080/api/highscore/actualuser")
                .then(res => setPersonalScore(res.data))
                .catch(err => console.error(err));
        }
    }, [visible])



    return (
        <Dialog
            header="Highscore"
            visible={visible}
            style={{ width: '50vw' }}
            onHide={onHide}
        >
            <div>
                {score.length === 0 ? (
                    <p>Keine Highscores vorhanden</p>
                ) : (
                    <ul>
                        {score.map((entry, index) => (
                            <li key={index}>
                                {entry.name}: {entry.score} Punkte
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                {personalScore ? (
                    <>Deine bisher beste Punktzahl: {personalScore.score} Punkte</>
                ) : (
                    <>Aktuell kein Highscore vorhanden</>
                )}
            </div>
        </Dialog>

    )

}
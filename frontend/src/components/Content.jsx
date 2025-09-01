import { useState } from "react";
import CurrentLetter from "./CurrentLetter";
import Timer from "./Timer";

export default function Content() {


    // States für die Felder
    const [Stadt, setStadt] = useState("");
    const [Land, setLand] = useState("");
    const [Fluss, setFluss] = useState("");
    const [Tier, setTier] = useState("");

    const [locked, setLocked] = useState(false); // Sperren nach Abschicken

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocked(true);
        console.log("Abgeschickt:", { Stadt, Land, Fluss, Tier });
    };

    return (

        <main className="content">
            <div className="tool">
                Aktueller Buchstabe :
            </div>

            <div className="tool"> timer</div>

            <form className="spielfeld">

                <div className="rubrik">
                    <label>Stadt</label><br />
                    <input type="text" name="Stadt" placeholder="Stadt" value={Stadt} onChange={(e) => setStadt(e.target.value)} disabled={locked} />
                </div>

                <div className="rubrik">
                    <label>Land</label><br />
                    <input type="text" name="Land" placeholder="Land" value={Land} onChange={(e) => setLand(e.target.value)} disabled={locked} />
                </div>
                <div className="rubrik">
                    <label>Fluss</label><br />
                    <input type="text" name="Stadt" placeholder="Fluss" value={Fluss} onChange={(e) => setFluss(e.target.value)} disabled={locked} />
                </div>
                <div className="rubrik">
                    <label>Tier</label><br />
                    <input type="text" name="Tier" placeholder="Tier" value={Tier} onChange={(e) => setTier(e.target.value)} disabled={locked} />
                </div>

                <button type="submit" onClick={handleSubmit} disabled={locked}>
                    Abschicken
                </button>

            </form>
        </main>

    )

}
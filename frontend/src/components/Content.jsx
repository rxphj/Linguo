import { useState } from "react";
import CurrentLetter from "./CurrentLetter";
import Timer from "./Timer";
import { InputText } from "primereact/inputtext";

export default function Content() {
  const [Stadt, setStadt] = useState("");
  const [Land, setLand] = useState("");
  const [Fluss, setFluss] = useState("");
  const [Tier, setTier] = useState("");

  const [locked, setLocked] = useState(false);
  const [isPause, setIsPause] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocked(true);
    console.log("Abgeschickt:", { Stadt, Land, Fluss, Tier });
  };

  const handleTimerState = (pause) => {
    setIsPause(pause);
    setLocked(pause); // Eingaben sperren, wenn Pause
    if (!pause) {
      // neue Runde: Felder zurücksetzen und freigeben
      setStadt("");
      setLand("");
      setFluss("");
      setTier("");
      setLocked(false);
    }
  };

  return (
    <main className="content">
      <div className="toolBox">
        <div className="toolLetter">
          Aktueller Buchstabe: <CurrentLetter isPause={isPause} />
        </div>

        <div className="toolTimer">
          <Timer onTimerState={handleTimerState} />
        </div>
      </div>

      <form className="spielfeld" onSubmit={handleSubmit}>
        <div className="rubrik">
          <label>Stadt</label><br />
          <InputText
            placeholder="Stadt"
            value={Stadt}
            onChange={(e) => setStadt(e.target.value)}
            disabled={locked}
          />
        </div>

        <div className="rubrik">
          <label>Land</label><br />
          <InputText
            placeholder="Land"
            value={Land}
            onChange={(e) => setLand(e.target.value)}
            disabled={locked}
          />
        </div>

        <div className="rubrik">
          <label>Fluss</label><br />
          <InputText
            placeholder="Fluss"
            value={Fluss}
            onChange={(e) => setFluss(e.target.value)}
            disabled={locked}
          />
        </div>

        <div className="rubrik">
          <label>Tier</label><br />
          <InputText
            placeholder="Tier"
            value={Tier}
            onChange={(e) => setTier(e.target.value)}
            disabled={locked}
          />
        </div>

        <button type="submit" disabled={locked}>
          Abschicken
        </button>
      </form>
    </main>
  );
}

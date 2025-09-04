import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

export default function HelpButton() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const text = `Willkommen bei Stadt, Land, Fluss, Tier. 
Wähle die Kategorien Stadt, Land, Fluss und Tier. 
Fülle die Felder mit passenden Begriffen aus und klicke auf abschicken, wenn du fertig bist. 
Jede Runde dauert sechzig Sekunden. 
Danach gibt es eine kurze Pause von dreißig Sekunden, bevor es weitergeht. 
Viel Spaß beim Spielen!`;

  const startSpeaking = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => setIsSpeaking(false);
    synth.speak(utterance);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <>
      {/* Button neben Logout */}
      <button
        onClick={() => setIsDialogOpen(true)}
        className="hilfe-btn"
      >
        Hilfe
      </button>

      <Dialog
        header="Spielanleitung"
        visible={isDialogOpen}
        style={{ width: "450px" }}
        modal
        onHide={() => {
          stopSpeaking();
          setIsDialogOpen(false);
        }}
      >
        <p>{text}</p>

        {isSpeaking ? (
          <button onClick={stopSpeaking}>
            Stop
          </button>
        ) : (
          <button className="tts-btn play" onClick={startSpeaking}>
            Vorlesen
          </button>
        )}
      </Dialog>
    </>
  );
}

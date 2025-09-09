//geschrieben von Yasmin

import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

export default function HelpButton() {
  //State ob gerade vorgelesen wird
  const [isSpeaking, setIsSpeaking] = useState(false);
  //State um zu prüfen ob Dialogfenster geöffnet ist
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //Text der vorgelesen werden soll, wird auch angezeigt
  const text = `Willkommen bei Stadt, Land, Fluss, Tier. 
Wähle die Kategorien Stadt, Land, Fluss und Tier. 
Fülle die Felder mit passenden Begriffen aus und klicke auf abschicken, wenn du fertig bist. 
Jede Runde dauert sechzig Sekunden. 
Danach gibt es eine kurze Pause von dreißig Sekunden, bevor es weitergeht. 
Viel Spaß beim Spielen!`;

  //Startet Sprachausgabe - Web Speech API verwendet
  const startSpeaking = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    //Einstellungen in welchem Sprachstil, Tempo und Tonhöhe gesprochen werden soll
    utterance.lang = "de-DE";
    utterance.rate = 1;
    utterance.pitch = 1;

    //zurücksetzen
    utterance.onend = () => setIsSpeaking(false);
    synth.speak(utterance);
    setIsSpeaking(true);
  };

  //Sprachausgabe stoppen
  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <>
      {/* Button neben Logout, öffnet Hilfe Dialogfenster*/}
      <button
        onClick={() => setIsDialogOpen(true)}
        className="hilfe-btn"
      >
        Hilfe
      </button>

      {/* Dialogfenster wo der Hilfetext angeeigt werden soll*/}
      <Dialog
        header="Spielanleitung"
        visible={isDialogOpen}
        style={{ width: "450px" }}
        modal
        onHide={() => {
          //Beim schließen des Fensters soll die Sprachausgabe beendet werden
          stopSpeaking();
          setIsDialogOpen(false);
        }}
      >
        {/* Hilfetext einfügen */}
        <p>{text}</p>

        {/*Button zum Vorlesen lassen oder zum stoppen der Sprachausgabe */}
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

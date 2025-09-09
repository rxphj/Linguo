//Komponente geschrieben von Yasmin Holik

import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

export default function HelpButton() {
  //State ob gerade vorgelesen wird
  const [isSpeaking, setIsSpeaking] = useState(false);
  //State um zu prüfen ob Dialogfenster geöffnet ist
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //Text der vorgelesen werden soll, wird auch angezeigt
  const text = `Willkommen bei Linguo.
                Du bekommst einen zufälligen Buchstaben.
                Schreibe zu Stadt, Land, Fluss und Tier passende Wörter mit diesem Buchstaben.
                Wenn du fertig bist, klicke auf „Abschicken“.
                Eine Runde dauert 60 Sekunden, danach gibt es 30 Sekunden Pause.
                Jedes richtige Wort bringt dir 10 Punkte.
                Viel Spaß!`;

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

import { ProgressBar } from 'primereact/progressbar';
import { useEffect, useState } from "react";
import CurrentLetter from './CurrentLetter';
import axios from "axios";

export default function Timer({onTimerState}) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPause, setIsPause] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!isPause) {
        // Pause starten
        setIsPause(true);
        setTimeLeft(30);
      } else {
        setIsPause(false);
        setTimeLeft(60);

        if(onTimerState){
          onTimerState(false);
        }

      }
    }
  }, [timeLeft, isPause]);
    useEffect(() => {
    if (onTimerState) {
      onTimerState(isPause);
    }
  }, [isPause, onTimerState]);

 
  return (
    <div>
      <p>{isPause ? "Pause: " : "Aktuelle Runde läuft: "} {timeLeft} Sekunden</p>
      <ProgressBar
        value={isPause ? (timeLeft / 30) * 100 : (timeLeft / 60) * 100}
        showValue={false}
      />
    </div>
  );
}

import { ProgressBar } from 'primereact/progressbar';
import { useEffect, useState } from "react";

export default function Timer({ onTimerState }) {
    const ROUND_TIME = 60;
    const PAUSE_TIME = 30;

    const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
    const [isPause, setIsPause] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            // Warten auf nächsten Tick, um State stabil zu halten
            setTimeout(() => {
                if (!isPause) {
                    // Runde ist vorbei → Pause beginnt
                    setIsPause(true);
                    setTimeLeft(PAUSE_TIME);
                    console.log("Timer → Runde vorbei → Pause startet");
                    onTimerState?.(true); // signalisiere "Pause"
                } else {
                    // Pause ist vorbei → Neue Runde beginnt
                    setIsPause(false);
                    setTimeLeft(ROUND_TIME);
                    console.log("Timer → Pause vorbei → Neue Runde startet");
                    onTimerState?.(false); // signalisiere "Spiel läuft"
                }
            }, 0);
        }
    }, [timeLeft]); // nur timeLeft als Abhängigkeit!

    return (
        <div>
            <p>{isPause ? "Pause: " : "Runde läuft: "} {timeLeft} Sekunden</p>
            <ProgressBar
                value={isPause ? (timeLeft / PAUSE_TIME) * 100 : (timeLeft / ROUND_TIME) * 100}
                showValue={false}
            />
        </div>
    );
}

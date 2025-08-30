
        import { ProgressBar } from 'primereact/progressbar';
import { useEffect } from 'react';


export default function RoundTimer() {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div>
      <h3>Noch {timeLeft} Sekunden</h3>
      <ProgressBar value={(timeLeft / 60) * 100} />
    </div>
  );
}

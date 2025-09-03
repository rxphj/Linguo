import { useEffect, useState } from "react";
import axios from "axios";

export default function CurrentLetter({ isPause }) {
  const [letter, setLetter] = useState("");

  // beim ersten Render sofort Buchstaben holen
  useEffect(() => {
    fetchLetter();
  }, []);

  // immer wenn eine neue Runde startet (Pause -> false)
  useEffect(() => {
    if (isPause === false) {
      fetchLetter();
    }
  }, [isPause]);

  const fetchLetter = () => {
    axios.get("http://localhost:8080/api/generate/buchstabe")
      .then((res) => {
        setLetter(res.data);
        console.log("Buchstabe vom Backend:", res.data);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen des Buchstabens:", error);
      });
  };

  return <>{letter || "-"}</>;
}

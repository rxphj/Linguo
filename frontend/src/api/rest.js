export async function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin" && password === "admin123") resolve({ role: "admin", highscore: "17", username });
      else if (username === "spieler" && password === "spieler123") resolve({ role: "spieler" });
      else reject({ message: "Ungültige Login-Daten" });
    }, 500); // simuliert Netzwerkverzögerung
  });
}


export async function currentLetter(letter) {
    
}


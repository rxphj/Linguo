import axios from "axios";
export async function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin" && password === "admin123") resolve({ role: "admin", highscore: "17", username });
      else if (username === "spieler" && password === "spieler123") resolve({ role: "spieler" });
      else reject({ message: "Ungültige Login-Daten" });
    }, 500); // simuliert Netzwerkverzögerung
  });
}

// Wörter
export const addWord = async (word) => {
    const res = await fetch('/api/create/wort', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word }),
    });
    return res.json();
}

export const deleteWord = async (word) => {
    const res = await fetch('/api/words/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word }),
    });
    return res.json();
}

// User
export const addUser = async (user) => {
    const res = await fetch('/api/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user }),
    });
    return res.json();
}

export const deleteUser = async (user) => {
    const res = await fetch('/api/users/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user }),
    });
    return res.json();
}


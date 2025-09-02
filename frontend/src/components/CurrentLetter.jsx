import axios from "axios";

export default function CurrentLetter(){
    
    /*const letter =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    
    const randomLetter = Math.floor(Math.random() * 26);
    return letter[randomLetter]; //0-25*/

    //Buchstabe aus dem Backend ziehen
   axios.get("http://localhost:8080/api/get/letter").then((res) => {

    const letter = res.data; 
    console.log("Buchstabe vom Backend:", letter);
    
  })
  .catch((error) => {
    console.error("Fehler beim Abrufen des Buchstabens:", error);
  })

  const letter = "B";
  return letter;

}
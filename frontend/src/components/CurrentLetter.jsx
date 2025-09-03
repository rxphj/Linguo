import axios from "axios";
import Timer from "./Timer";
import { useState } from "react";  

export default function CurrentLetter(){
    
    /*const letter =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    
    const randomLetter = Math.floor(Math.random() * 26);
    return letter[randomLetter]; //0-25*/

    //Buchstabe aus dem Backend ziehen


    const [letter, setLetter] = useState("");

    const handleTimerState = (isPause) => {

        if(isPause === false) {
      
   axios.get("http://localhost:8080/api/generate/buchstabe").then((res) => {

    const letter = res.data; 
    console.log("Buchstabe vom Backend:", letter);
    
  })
  .catch((error) => {
    console.error("Fehler beim Abrufen des Buchstabens:", error);
  }, [isPause])
}

}
return <>{letter || "-"}</>;
}


  
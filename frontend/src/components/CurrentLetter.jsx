export default function currentLetter(){
    
    const letter =['A', 'B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    
    const randomLetter = Math.floor(Math.random() * 26);
    return letter[randomLetter]; //0-25
}
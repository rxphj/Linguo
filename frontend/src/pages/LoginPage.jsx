
import { Button } from 'primereact/button';

export default function LoginPage( {onLoginSuccess}) {

//Login Überprüfung
const handleLogin= () => {

    //später muss backendlogik rein zur überprüfung ob Login erfolgreich war

    onLoginSuccess();
}


//Ansicht Login
  return (
      <div className='LoginPage'>
      <div className="login-form">
        <h1 className='login-title'>Log dich zum spielen ein!</h1>
        <input placeholder="Benutzername" /> <br />
        <input placeholder="Passwort" type="password" /> <br />
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
}

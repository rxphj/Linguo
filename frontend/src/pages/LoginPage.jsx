
import { Button } from 'primereact/button';

export default function LoginPage() {
  return (
      <div className='LoginPage'>
      <div className="login-form">
        <h1 className='login-title'>Log dich zum spielen ein!</h1>
        <input placeholder="Benutzername" /> <br />
        <input placeholder="Passwort" type="password" /> <br />
        <Button>Login</Button>
      </div>
    </div>
  );
}

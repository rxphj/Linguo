
import { Button } from 'primereact/button';
import { useState } from 'react';
import { login } from '../api/rest';

export default function LoginPage({onLoginSuccess}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

//Login Überprüfung
const handleLogin= async () => {
  setError('');
  try{
    const res = await login(username, password);
     onLoginSuccess(res);
  }catch(err){
    setError(err.message);
  }
};


//Ansicht Login
  return (
      <div className='LoginPage'>
      <div className="login-form">
        <h1 className='login-title'>Log dich zum spielen ein!</h1>
        <input placeholder="Benutzername" value={username} onChange={(e) => setUsername(e.target.value)}/> <br />
        <input placeholder="Passwort" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/> <br />
        <Button onClick={handleLogin}>Login</Button>
        {error && <p style={{ color: 'red'}}>{error}</p>}
      </div>
    </div>
  );
}

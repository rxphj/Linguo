import { Button } from 'primereact/button';
import Logout from './Logout';
import Help from './Help';
//geschrieben von Yasmin
export default function Header({ adminlogo }) {
  return (
    <header className="header">
      <div className="links">
      {adminlogo && <img src="/admin_logo.png" alt="adminlogo" className="adminlogo" />}
      </div>

      <div className="center"> 
        <img src="/logo.png" alt="LinguoLogo" className="logo" />
      </div>

      <div className='rechts'>
        <Logout/>
        <Help/>
      </div>

    </header>
  );
}
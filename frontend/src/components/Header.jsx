//Komponente geschrieben von Yasmin Holik
import { Button } from 'primereact/button';
import Logout from './Logout';
import Help from './Help';

export default function Header({ adminlogo }) {
  return (

    //Anzeige des Headers
    <header className="header">
      <div className="links">
        {/* Adminlogo*/}
        {adminlogo && <img src="/admin_logo.png" alt="adminlogo" className="adminlogo" />}
      </div>

      <div className="center">
        {/* Anzeige des Linguo Logos */}
        <img src="/logo.png" alt="LinguoLogo" className="logo" />
      </div>

      {/* Einbindung der Komponente Logout und Help im rechten Grid */}
      <div className='rechts'>
        <Logout />
        <Help />
      </div>

    </header>
  );
}
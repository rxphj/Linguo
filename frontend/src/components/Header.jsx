
//geschrieben von Yasmin
export default function Header({ adminlogo }) {
  return (
    <header className="header">
      <div className="links">
      <img src="/glitter.png" alt="glitterPicture" className="glitter" />
      {adminlogo && <img src="/admin_logo.png" alt="adminlogo" className="adminlogo" />}
      </div>

      <div className="center"> 
        <img src="/logo.png" alt="glitterPicture" className="logo" />
      </div>

    </header>
  );
}
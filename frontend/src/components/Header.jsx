
//geschrieben von Yasmin
export default function Header({ adminlogo }) {
  return (
    <header className="header">
      <img src="/glitter.png" alt="glitterPicture" />
      <div>
        {adminlogo && <img src="/admin_logo.png" alt="adminlogo" className="adminlogo" />}
      </div>
      <span className="titel"> <img src="/logo.png" alt="glitterPicture" className="logo" /></span>

    </header>
  );
}
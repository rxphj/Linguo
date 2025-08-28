

export default function Header({ adminlogo }) {
  return (
    <header className="header">
      <div>
        <img src="/glitter.png" alt="glitterPicture" className="glitter" />
        {adminlogo && <img src="/admin_logo.png" alt="adminlogo" className="adminlogo" />}
      </div>
      <span className="titel">Linguo</span>

    </header>
  );
}
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">
          <span className="weather-icon">🌤️</span>
          Hava Durumu
        </h1>
        <p className="header-subtitle">
          Şehir adı girerek güncel hava durumunu öğrenin
        </p>
      </div>
    </header>
  );
}

export default Header;

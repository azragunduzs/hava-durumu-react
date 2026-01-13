import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">
                    © 2026 Hava Durumu Uygulaması
                </p>
                <p className="footer-api">
                    Powered by{' '}
                    <a
                        href="https://openweathermap.org/api"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        OpenWeather API
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;

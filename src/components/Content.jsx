import { useState, useEffect } from 'react';
import axios from 'axios';
import './Content.css';

// OpenWeather API key - Ücretsiz hesap oluşturup kendi API key'inizi alın
const API_KEY = '4d8fb5b93d4af21d66a2948710284366';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function Content({ onWeatherChange }) {
    // useState hook'ları
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchCity, setSearchCity] = useState('');

    // useEffect hook - şehir değiştiğinde API çağrısı yap
    useEffect(() => {
        if (!searchCity) return;

        const fetchWeather = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(BASE_URL, {
                    params: {
                        q: searchCity,
                        appid: API_KEY,
                        units: 'metric',
                        lang: 'tr'
                    }
                });

                setWeather(response.data);
                // Hava durumu kodunu parent'a gönder
                onWeatherChange(response.data.weather[0].id);
            } catch (err) {
                if (err.response?.status === 404) {
                    setError('Şehir bulunamadı. Lütfen geçerli bir şehir adı girin.');
                } else {
                    setError('Bir hata oluştu. Lütfen tekrar deneyin.');
                }
                setWeather(null);
                onWeatherChange(null);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [searchCity, onWeatherChange]);

    // Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            setSearchCity(city.trim());
        }
    };

    // Hava durumu ikonunu belirle
    const getWeatherEmoji = (code) => {
        if (code >= 200 && code < 300) return '⛈️'; // Fırtına
        if (code >= 300 && code < 400) return '🌧️'; // Çisenti
        if (code >= 500 && code < 600) return '🌧️'; // Yağmur
        if (code >= 600 && code < 700) return '❄️'; // Kar
        if (code >= 700 && code < 800) return '🌫️'; // Sis
        if (code === 800) return '☀️'; // Açık
        if (code > 800) return '☁️'; // Bulutlu
        return '🌤️';
    };

    return (
        <main className="content">
            {/* Arama Formu */}
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Şehir adı girin (örn: İstanbul)"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                        <span className="search-icon">🔍</span>
                        Ara
                    </button>
                </div>
            </form>

            {/* Yükleniyor Durumu */}
            {loading && (
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Yükleniyor...</p>
                </div>
            )}

            {/* Hata Durumu */}
            {error && (
                <div className="error">
                    <span className="error-icon">⚠️</span>
                    <p>{error}</p>
                </div>
            )}

            {/* Hava Durumu Kartı */}
            {weather && !loading && (
                <div className="weather-card">
                    <div className="weather-main">
                        <span className="weather-emoji">
                            {getWeatherEmoji(weather.weather[0].id)}
                        </span>
                        <div className="weather-temp">
                            <span className="temp-value">{Math.round(weather.main.temp)}</span>
                            <span className="temp-unit">°C</span>
                        </div>
                    </div>

                    <h2 className="city-name">
                        {weather.name}, {weather.sys.country}
                    </h2>

                    <p className="weather-description">
                        {weather.weather[0].description}
                    </p>

                    <div className="weather-details">
                        <div className="detail-item">
                            <span className="detail-icon">🌡️</span>
                            <span className="detail-label">Hissedilen</span>
                            <span className="detail-value">{Math.round(weather.main.feels_like)}°C</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-icon">💧</span>
                            <span className="detail-label">Nem</span>
                            <span className="detail-value">{weather.main.humidity}%</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-icon">💨</span>
                            <span className="detail-label">Rüzgar</span>
                            <span className="detail-value">{weather.wind.speed} m/s</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-icon">👁️</span>
                            <span className="detail-label">Görüş</span>
                            <span className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Başlangıç Durumu */}
            {!weather && !loading && !error && (
                <div className="welcome">
                    <span className="welcome-icon">🌍</span>
                    <p>Hava durumunu öğrenmek için bir şehir arayın</p>
                </div>
            )}
        </main>
    );
}

export default Content;

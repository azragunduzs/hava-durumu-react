import { useState, useCallback } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import './App.css';

function App() {
  // Hava durumu koduna göre arka plan sınıfını belirle
  const [weatherCode, setWeatherCode] = useState(null);

  // Callback fonksiyonu - Content bileşeninden hava durumu kodunu al
  const handleWeatherChange = useCallback((code) => {
    setWeatherCode(code);
  }, []);

  // Hava durumu koduna göre arka plan sınıfını belirle
  const getBackgroundClass = () => {
    if (!weatherCode) return 'default';

    // OpenWeather API hava durumu kodları
    // https://openweathermap.org/weather-conditions
    if (weatherCode >= 200 && weatherCode < 300) return 'stormy';     // Fırtına
    if (weatherCode >= 300 && weatherCode < 400) return 'rainy';      // Çisenti
    if (weatherCode >= 500 && weatherCode < 600) return 'rainy';      // Yağmur
    if (weatherCode >= 600 && weatherCode < 700) return 'snowy';      // Kar
    if (weatherCode >= 700 && weatherCode < 800) return 'foggy';      // Sis/Pus
    if (weatherCode === 800) return 'sunny';                          // Açık
    if (weatherCode > 800 && weatherCode <= 804) return 'cloudy';     // Bulutlu

    return 'default';
  };

  return (
    <div className={`app ${getBackgroundClass()}`}>
      <div className="container">
        <Header />
        <Content onWeatherChange={handleWeatherChange} />
        <Footer />
      </div>
    </div>
  );
}

export default App;

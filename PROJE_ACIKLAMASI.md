# 📚 React Hava Durumu Uygulaması - Detaylı Proje Açıklaması

Bu dokümanda projenin tüm bileşenleri, kullanılan teknolojiler ve kod yapısı detaylı olarak açıklanmaktadır.

---

## 📋 İçindekiler

1. [Proje Genel Bakış](#proje-genel-bakış)
2. [Teknoloji Stack](#teknoloji-stack)
3. [Klasör Yapısı](#klasör-yapısı)
4. [Bileşen Açıklamaları](#bileşen-açıklamaları)
5. [API Entegrasyonu](#api-entegrasyonu)
6. [React Hooks Kullanımı](#react-hooks-kullanımı)
7. [Dinamik Arka Plan Sistemi](#dinamik-arka-plan-sistemi)
8. [CSS ve Tasarım](#css-ve-tasarım)

---

## 🎯 Proje Genel Bakış

Bu proje, React kütüphanesi kullanılarak geliştirilmiş bir hava durumu uygulamasıdır. Kullanıcı bir şehir adı girdiğinde, OpenWeather API'den gerçek zamanlı hava durumu verisi çekilir ve kullanıcıya görsel olarak sunulur.

### Temel Özellikler

| Özellik | Açıklama |
|---------|----------|
| **Şehir Arama** | Kullanıcıdan şehir adı alır |
| **API Entegrasyonu** | OpenWeather API ile veri çeker |
| **Dinamik Arka Plan** | Hava durumuna göre renk değişir |
| **Loading Durumu** | Yükleme animasyonu gösterir |
| **Hata Yönetimi** | Geçersiz şehir için uyarı verir |
| **Responsive Tasarım** | Mobil uyumlu arayüz |

---

## 🛠️ Teknoloji Stack

### React + Vite

**React** - Facebook tarafından geliştirilen kullanıcı arayüzü kütüphanesi.

**Vite** - Modern ve hızlı build aracı. Create React App'e göre çok daha hızlı geliştirme deneyimi sunar.

```bash
# Proje oluşturma komutu
npx create-vite@latest ./ --template react
```

### Axios

HTTP istekleri yapmak için kullanılan popüler kütüphane.

```bash
npm install axios
```

**Axios vs Fetch karşılaştırması:**
- Axios otomatik JSON dönüşümü yapar
- Timeout desteği var
- İstek/yanıt interceptor'ları
- Tarayıcı uyumluluğu daha iyi

---

## 📁 Klasör Yapısı

```
hava-durumu-react-7/
├── node_modules/          # Bağımlılıklar
├── public/                # Statik dosyalar
│   └── vite.svg
├── screenshots/           # Ekran görüntüleri
├── src/
│   ├── components/        # React bileşenleri
│   │   ├── Header.jsx     # Başlık bileşeni
│   │   ├── Header.css     # Başlık stilleri
│   │   ├── Content.jsx    # Ana içerik bileşeni
│   │   ├── Content.css    # İçerik stilleri
│   │   ├── Footer.jsx     # Alt bilgi bileşeni
│   │   └── Footer.css     # Alt bilgi stilleri
│   ├── App.jsx            # Ana uygulama bileşeni
│   ├── App.css            # Ana stiller
│   └── main.jsx           # React giriş noktası
├── index.html             # HTML şablonu
├── package.json           # Proje bağımlılıkları
├── vite.config.js         # Vite yapılandırması
└── README.md              # Proje dokümantasyonu
```

---

## 🧩 Bileşen Açıklamaları

### 1. Header.jsx

**Görevi:** Sayfanın üst kısmında başlık ve açıklama gösterir.

```jsx
function Header() {
  return (
    <header className="header">
      <h1>🌤️ Hava Durumu</h1>
      <p>Şehir adı girerek güncel hava durumunu öğrenin</p>
    </header>
  );
}
```

**Özellikler:**
- Glassmorphism tasarım (yarı saydam, bulanık arka plan)
- Animasyonlu hava durumu ikonu
- Responsive yapı

---

### 2. Content.jsx

**Görevi:** Uygulamanın ana işlevselliğini sağlar - arama formu, API isteği ve sonuç gösterimi.

**State Değişkenleri (useState):**

```jsx
const [city, setCity] = useState('');        // Kullanıcının girdiği şehir
const [weather, setWeather] = useState(null); // API'den gelen veri
const [loading, setLoading] = useState(false); // Yükleniyor durumu
const [error, setError] = useState(null);      // Hata mesajı
const [searchCity, setSearchCity] = useState(''); // Aranacak şehir
```

**API Çağrısı (useEffect):**

```jsx
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
          units: 'metric',  // Celsius için
          lang: 'tr'        // Türkçe açıklamalar
        }
      });
      setWeather(response.data);
    } catch (err) {
      setError('Şehir bulunamadı');
    } finally {
      setLoading(false);
    }
  };

  fetchWeather();
}, [searchCity]); // searchCity değiştiğinde çalışır
```

**Gösterilen Veriler:**
- 🌡️ Sıcaklık (°C)
- 🌡️ Hissedilen sıcaklık
- 💧 Nem oranı (%)
- 💨 Rüzgar hızı (m/s)
- 👁️ Görüş mesafesi (km)
- Hava durumu açıklaması (Türkçe)

---

### 3. Footer.jsx

**Görevi:** Sayfanın alt kısmında telif hakkı ve API bilgisi gösterir.

```jsx
function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Hava Durumu Uygulaması</p>
      <p>Powered by <a href="https://openweathermap.org/api">OpenWeather API</a></p>
    </footer>
  );
}
```

---

### 4. App.jsx

**Görevi:** Tüm bileşenleri bir araya getirir ve dinamik arka plan yönetimini sağlar.

```jsx
function App() {
  const [weatherCode, setWeatherCode] = useState(null);

  const handleWeatherChange = useCallback((code) => {
    setWeatherCode(code);
  }, []);

  const getBackgroundClass = () => {
    if (!weatherCode) return 'default';
    if (weatherCode >= 500 && weatherCode < 600) return 'rainy';
    if (weatherCode >= 600 && weatherCode < 700) return 'snowy';
    if (weatherCode === 800) return 'sunny';
    if (weatherCode > 800) return 'cloudy';
    return 'default';
  };

  return (
    <div className={`app ${getBackgroundClass()}`}>
      <Header />
      <Content onWeatherChange={handleWeatherChange} />
      <Footer />
    </div>
  );
}
```

---

## 🌐 API Entegrasyonu

### OpenWeather API

**Base URL:** `https://api.openweathermap.org/data/2.5/weather`

**Parametreler:**

| Parametre | Değer | Açıklama |
|-----------|-------|----------|
| `q` | Şehir adı | Aranacak şehir |
| `appid` | API Key | Kimlik doğrulama |
| `units` | metric | Celsius birimi |
| `lang` | tr | Türkçe açıklamalar |

**Örnek API Yanıtı:**

```json
{
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "açık"
    }
  ],
  "main": {
    "temp": 22.5,
    "feels_like": 21.8,
    "humidity": 45
  },
  "wind": {
    "speed": 3.5
  },
  "visibility": 10000,
  "name": "Istanbul",
  "sys": {
    "country": "TR"
  }
}
```

### Hava Durumu Kodları

| Kod Aralığı | Hava Durumu | Emoji |
|-------------|-------------|-------|
| 200-299 | Fırtına | ⛈️ |
| 300-399 | Çisenti | 🌧️ |
| 500-599 | Yağmur | 🌧️ |
| 600-699 | Kar | ❄️ |
| 700-799 | Sis/Pus | 🌫️ |
| 800 | Açık | ☀️ |
| 801-804 | Bulutlu | ☁️ |

---

## ⚛️ React Hooks Kullanımı

### 1. useState

State (durum) yönetimi için kullanılır.

```jsx
const [city, setCity] = useState('');
// city: mevcut değer
// setCity: değeri güncelleyen fonksiyon
// '': başlangıç değeri
```

### 2. useEffect

Yan etkileri (side effects) yönetmek için kullanılır.

```jsx
useEffect(() => {
  // API çağrısı yapılır
  fetchWeather();
}, [searchCity]); // Bağımlılık dizisi
```

**Bağımlılık Dizisi:**
- `[]` - Sadece component mount olduğunda çalışır
- `[searchCity]` - searchCity değiştiğinde çalışır
- Hiç yazılmazsa - Her render'da çalışır

### 3. useCallback

Fonksiyonları memoize etmek için kullanılır.

```jsx
const handleWeatherChange = useCallback((code) => {
  setWeatherCode(code);
}, []);
```

**Neden useCallback?**
- Gereksiz yeniden render'ları önler
- Performansı artırır
- Child component'lara prop olarak geçerken faydalı

---

## 🎨 Dinamik Arka Plan Sistemi

### Nasıl Çalışır?

1. Content bileşeni API'den hava durumu kodu alır
2. Bu kodu `onWeatherChange` prop'u ile App'e gönderir
3. App, koda göre CSS sınıfını belirler
4. CSS'te tanımlı gradient arka plan uygulanır

### CSS Arka Plan Sınıfları

```css
/* Güneşli */
.app.sunny {
  background: linear-gradient(135deg, #f093fb, #f5576c, #fda085);
}

/* Yağmurlu */
.app.rainy {
  background: linear-gradient(135deg, #1a2980, #26d0ce);
}

/* Karlı */
.app.snowy {
  background: linear-gradient(135deg, #e6dada, #274046);
}

/* Bulutlu */
.app.cloudy {
  background: linear-gradient(135deg, #8e9eab, #eef2f3, #8e9eab);
}
```

---

## 🎨 CSS ve Tasarım

### Glassmorphism Efekti

```css
.weather-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 30px;
}
```

### Animasyonlar

**Loading Spinner:**
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

**Float Animasyonu:**
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
```

### Responsive Tasarım

```css
@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
  }
  
  .temp-value {
    font-size: 4rem;
  }
}
```

---

## 🚀 Çalıştırma Adımları

1. **Bağımlılıkları yükle:**
   ```bash
   npm install
   ```

2. **Geliştirme sunucusunu başlat:**
   ```bash
   npm run dev
   ```

3. **Tarayıcıda aç:**
   ```
   http://localhost:5173
   ```

---

## 📝 Sonuç

Bu proje, React'ın temel kavramlarını (bileşenler, hooks, state yönetimi) ve API entegrasyonunu pratik bir örnekle göstermektedir. Modern CSS teknikleri (glassmorphism, gradient, animasyonlar) ile görsel olarak çekici bir kullanıcı deneyimi sunulmaktadır.

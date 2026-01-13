# 🌤️ Hava Durumu Uygulaması

React ile geliştirilmiş, OpenWeather API kullanarak gerçek zamanlı hava durumu bilgisi gösteren dinamik web uygulaması.

## 📸 Ekran Görüntüleri

Ekran görüntüleri `screenshots/` klasöründe bulunmaktadır.

## 🔗 Kullanılan API

**OpenWeather API**  
https://openweathermap.org/api

## 🚀 Projeyi Çalıştırma

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini açın.

## 🛠️ Teknolojiler

- **React** - UI kütüphanesi
- **Vite** - Build aracı
- **Axios** - HTTP istekleri
- **CSS** - Stil dosyaları

## ✨ Özellikler

- ✅ Şehir adı ile hava durumu arama
- ✅ Gerçek zamanlı API entegrasyonu
- ✅ Dinamik arka plan (hava durumuna göre değişir)
- ✅ Loading ve hata durumları
- ✅ Responsive tasarım
- ✅ Modern glassmorphism UI

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── Header.jsx    # Başlık bileşeni
│   ├── Header.css
│   ├── Content.jsx   # Ana içerik (arama + hava durumu)
│   ├── Content.css
│   ├── Footer.jsx    # Alt bilgi
│   └── Footer.css
├── App.jsx           # Ana uygulama
├── App.css           # Dinamik arka planlar
└── main.jsx          # Giriş noktası
```

## 👤 Geliştirici

Azra Betül Gündüz

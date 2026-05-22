#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Kurulum adımları
function runSetup() {
  try {
    console.log('🚀 Premium Hesap Makinesi Kurulumu Başlıyor...');

    // 1. Bağımlılıkları yükle
    console.log('📦 Bağımlılıklar yükleniyor...');
    execSync('npm install', { stdio: 'inherit' });

    // 2. Husky kurulumu
    console.log('🐶 Husky kurulumu yapılıyor...');
    execSync('npm run prepare', { stdio: 'inherit' });

    // 3. .env dosyası oluştur
    console.log('🔧 .env dosyası oluşturuluyor...');
    const envExamplePath = path.join(__dirname, '..', '.env.example');
    const envPath = path.join(__dirname, '..', '.env');

    if (fs.existsSync(envExamplePath) && !fs.existsSync(envPath)) {
      fs.copyFileSync(envExamplePath, envPath);
      console.log('✅ .env dosyası oluşturuldu');
    } else {
      console.log('ℹ️ .env dosyası zaten mevcut');
    }

    // 4. PWA ikonları kontrolü
    console.log('🖼️ PWA ikonları kontrol ediliyor...');
    const publicDir = path.join(__dirname, '..', 'public');
    const requiredIcons = ['pwa-192x192.png', 'pwa-512x512.png', 'favicon.ico'];

    requiredIcons.forEach(icon => {
      const iconPath = path.join(publicDir, icon);
      if (!fs.existsSync(iconPath)) {
        console.warn(`⚠️ ${icon} eksik - varsayılan ikon kullanılacak`);
      }
    });

    console.log('🎉 Kurulum tamamlandı!');
    console.log('👉 Geliştirme sunucusunu başlatmak için: npm run dev');
    console.log('👉 Testleri çalıştırmak için: npm test');
    console.log('👉 Build yapmak için: npm run build');
  } catch (error) {
    console.error('❌ Kurulum sırasında hata oluştu:', error.message);
    process.exit(1);
  }
}

// Scripti çalıştır
runSetup();
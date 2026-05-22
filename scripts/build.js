import { execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { join } from 'path';

// Build işlemini çalıştır
function buildApp() {
  console.log('🚀 Uygulama build işlemi başlatılıyor...');
  try {
    // Vite build komutunu çalıştır
    execSync('vite build', { stdio: 'inherit' });
    
    // Build sonrası işlemler
    const distPath = join(process.cwd(), 'dist');
    const publicPath = join(process.cwd(), 'public');

    // public klasöründeki dosyaları dist'e kopyala
    if (existsSync(publicPath)) {
      console.log('📁 Public dosyaları dist klasörüne kopyalanıyor...');
      if (!existsSync(distPath)) {
        mkdirSync(distPath);
      }
      
      // PWA manifest ve ikon dosyalarını kopyala
      const filesToCopy = ['manifest.json', 'pwa-192x192.png', 'pwa-512x512.png', 'favicon.ico', 'apple-touch-icon.png'];
      filesToCopy.forEach(file => {
        const src = join(publicPath, file);
        const dest = join(distPath, file);
        if (existsSync(src)) {
          copyFileSync(src, dest);
        }
      });
    }

    console.log('✅ Build işlemi başarıyla tamamlandı!');
  } catch (error) {
    console.error('❌ Build işlemi sırasında hata oluştu:', error);
    process.exit(1);
  }
}

// Build işlemini başlat
buildApp();
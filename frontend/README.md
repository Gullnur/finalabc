# Biznes İdarəetmə Sistemi - Frontend

Bu layihə React + TypeScript + Vite ilə yazılmış modern frontend tətbiqidir.

## Tələblər

- Node.js 18+ 
- npm və ya yarn

## Quraşdırma

```bash
# Dependencies quraşdırmaq
npm install

# Development server işə salmaq
npm run dev
```

Frontend `http://localhost:5173` ünvanında işləyəcək.

## Backend Konfiqurasiyası

Frontend backend API-ləri ilə əlaqə qurmaq üçün:
- Gateway service `http://localhost:1000` ünvanında işləməlidir
- Vite development server avtomatik olaraq `/api` çağırışlarını gateway-ə proxy edir

## İstifadə

1. **Qeydiyyat**: `/signup` səhifəsində yeni hesab yaradın
2. **Təsdiq**: Email-inizə gələn təsdiq kodunu `/verify` səhifəsində daxil edin
3. **Giriş**: `/login` səhifəsində daxil olun
4. **Dashboard**: Əsas səhifədə statistikaları görə bilərsiniz

## Səhifələr

- **Dashboard** - Ümumi statistikalar
- **Məhsullar** - Məhsul idarəetməsi
- **Kateqoriyalar** - Kateqoriya idarəetməsi
- **Müştərilər** - Müştəri idarəetməsi
- **Satışlar** - Satış idarəetməsi
- **Xərclər** - Xərc idarəetməsi
- **Hesabatlar** - Satış və xərc hesabatları

## Build

Production build üçün:

```bash
npm run build
```

Build faylları `dist` qovluğunda yaradılacaq.


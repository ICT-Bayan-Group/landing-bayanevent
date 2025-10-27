# BAYAN EVENT — Next.js Landing Page

Tech stack
- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&color=000000)
- ![React](https://img.shields.io/badge/React-61DAFB?style=flat)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat)
- ![Tailwind](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat)
- ![GSAP](https://img.shields.io/badge/GSAP-60BA78?style=flat)

Cara menjalankan (lokal)
------------------------
1. Install dependensi:
   npm install
2. Jalankan dev server:
   npm run dev
3. Build & start produksi:
   npm run build
   npm run start

Catatan penting & saran perbaikan
---------------------------------
- Pastikan file gambar (mis. /public/images/white.png atau logo) tersedia di folder public agar path seperti `/images/logo.png` valid.
- Jika ingin menggunakan Next Image: import Image from 'next/image' dan ganti tag <img>.
- Pisahkan logika GSAP ke hook custom (mis. useGsapAnimations) untuk keterbacaan dan testabilitas.
- Tambahkan fallback statis bila video gagal dimuat (poster atau background image).
- Cek cleanup event listener pada useEffect agar selalu dilepas saat unmount.


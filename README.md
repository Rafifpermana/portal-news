# 🌐 Portal Berita AI Terkini

Sebuah portal berita sederhana yang dibuat menggunakan React.js, Vite, dan Tailwind CSS. Aplikasi ini secara otomatis mengambil berita terbaru seputar *Artificial Intelligence* (AI) dari berbagai sumber API publik dan menampilkannya dalam satu antarmuka yang bersih, responsif, dan mudah digunakan.


---

## ✨ Fitur Utama

- **Agregator Berita**: Mengambil dan menggabungkan berita dari tiga sumber API berbeda secara bersamaan (**GNews**, **NewsData.io**, dan **Mediastack**).
- **Pencarian Real-time**: Fitur pencarian *client-side* yang memungkinkan pengguna memfilter artikel berita berdasarkan kata kunci secara instan tanpa memuat ulang halaman.
- **Desain Responsif**: Tampilan yang dapat beradaptasi dengan baik di berbagai ukuran layar, mulai dari perangkat seluler hingga desktop, berkat Tailwind CSS.
- **Tampilan Modern**: Antarmuka yang bersih dan modern dengan fokus pada keterbacaan.
- **Penanganan Error**: Memberikan umpan balik kepada pengguna jika terjadi kegagalan saat memuat data dari API.

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: [React.js](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Bahasa**: JavaScript

---

## 🔑 API yang Digunakan

Proyek ini mengintegrasikan data dari tiga API berita berikut:
1.  [GNews API](https://gnews.io/)
2.  [NewsData.io API](https://newsdata.io/)
3.  [Mediastack API](https://mediastack.com/)

---

## ⚙️ Cara Kerja Aplikasi

Aplikasi ini memiliki arsitektur berbasis komponen yang sederhana.

1.  **Pengambilan Data (`App.jsx`)**:
    - Saat komponen `App` pertama kali dimuat, `useEffect` hook akan terpicu.
    - `Promise.allSettled` digunakan untuk memanggil ketiga API berita secara paralel. Ini memastikan aplikasi tetap berjalan meskipun salah satu API gagal merespons.
    - Setiap respons dari API kemudian diproses oleh **fungsi transformer** khusus (`transformGNews`, `transformNewsDataIo`, dll.) untuk mengubah format data yang berbeda-beda menjadi satu format objek yang konsisten.
    - Semua data yang telah distandarisasi digabungkan, duplikat dihapus, diurutkan berdasarkan tanggal terbaru, dan disimpan dalam satu *state* array bernama `articles`.

2.  **Pencarian (`SearchBar.jsx` & `App.jsx`)**:
    - Input pencarian adalah *controlled component* yang nilainya terikat pada *state* `searchQuery`.
    - Setiap kali pengguna mengetik, *state* `searchQuery` diperbarui.
    - Sebelum me-render daftar berita, array `articles` utama akan difilter berdasarkan `searchQuery`. Proses filter ini terjadi di sisi klien, sehingga sangat cepat dan tidak memerlukan panggilan API baru.

3.  **Tampilan (`NewsList.jsx` & `NewsItem.jsx`)**:
    - Komponen `NewsList` menerima array berita yang sudah difilter.
    - Komponen ini melakukan *mapping* (looping) pada array tersebut dan me-render satu komponen `NewsItem` untuk setiap artikel berita.

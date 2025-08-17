import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import NewsList from "./components/NewsList";
import SearchBar from "./components/SearchBar";

function App() {
  // State untuk menyimpan data berita dalam bentuk array
  const [articles, setArticles] = useState([]);
  // State untuk menandakan proses loading data
  const [loading, setLoading] = useState(true);
  // State untuk menyimpan pesan error jika terjadi
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    // Fungsi untuk mengambil data berita
    const fetchNews = async () => {
      // Ganti 'YOUR_API_KEY' dengan API key Anda dari gnews.io
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      const url = `https://gnews.io/api/v4/search?q=artificial%20intelligence&lang=en&token=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Gagal mengambil data. Coba lagi nanti.");
        }
        const data = await response.json();

        // Menyimpan data artikel ke dalam state 'articles'
        setArticles(data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Array kosong [] berarti useEffect hanya berjalan sekali saat komponen dimuat

  // 3. Logika untuk memfilter artikel
  // Filter dijalankan setiap kali searchQuery atau articles berubah
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 4. Fungsi untuk menangani perubahan pada input pencarian
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Fungsi untuk menampilkan konten berdasarkan status
  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-500">Memuat berita...</p>;
    }
    if (error) {
      return <p className="text-center text-red-500">Error: {error}</p>;
    }
    // Jika tidak ada artikel, tampilkan pesan
    if (articles.length === 0) {
      return (
        <p className="text-center text-gray-500">
          Tidak ada berita yang ditemukan.
        </p>
      );
    }
    // Jika ada artikel, render komponen NewsList
    return <NewsList articles={filteredArticles} />;
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Navbar />
      <main className="container mx-auto p-4">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Berita Terbaru
        </h2>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;

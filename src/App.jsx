import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import NewsList from "./components/NewsList";

const API_KEYS = {
  gnews: import.meta.env.VITE_GNEWS_API_KEY,
  mediastack: import.meta.env.VITE_MEDIASTACK_API_KEY,
  newsdataIO: import.meta.env.VITE_NEWSDATAIO_API_KEY,
};

const API_URLS = {
  gnews: `https://gnews.io/api/v4/search?q=artificial%20intelligence&lang=en&token=${API_KEYS.gnews}`,
  newsdataIO: `https://newsdata.io/api/1/news?apikey=${API_KEYS.newsdataIO}&q=artificial%20intelligence&language=en`,
  mediastack: `http://api.mediastack.com/v1/news?access_key=${API_KEYS.mediastack}&keywords=artificial%20intelligence&languages=en`,
};

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAllNews = async () => {
      setLoading(true);

      const transformGNews = (article) => ({
        title: article.title,
        url: article.url,
        publishedAt: article.publishedAt,
        sourceName: article.source.name,
      });

      const transformMediastack = (article) => ({
        title: article.title,
        url: article.url,
        publishedAt: article.published_at,
        sourceName: article.source,
      });

      const transformNewsDataIo = (article) => ({
        title: article.title,
        url: article.link,
        publishedAt: article.pubDate,
        sourceName: article.source_id,
      });

      const promises = [
        fetch(API_URLS.gnews).then((res) => res.json()),
        fetch(API_URLS.newsdataIO).then((res) => res.json()),
        fetch(API_URLS.mediastack).then((res) => res.json()),
      ];

      const results = await Promise.allSettled(promises);
      let combinedArticles = [];

      if (results[0].status === "fulfilled" && results[0].value.articles) {
        combinedArticles.push(...results[0].value.articles.map(transformGNews));
      }

      if (results[1].status === "fulfilled" && results[1].value.results) {
        combinedArticles.push(
          ...results[1].value.results.map(transformNewsDataIo)
        );
      }

      if (results[2].status === "fulfilled" && results[2].value.data) {
        combinedArticles.push(
          ...results[2].value.data.map(transformMediastack)
        );
      }

      const uniqueArticles = Array.from(
        new Map(combinedArticles.map((item) => [item.url, item])).values()
      );
      const sortedArticles = uniqueArticles.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );

      setArticles(sortedArticles);

      if (sortedArticles.length === 0) {
        setError(
          "Gagal memuat berita dari semua sumber atau tidak ada berita ditemukan."
        );
      } else {
        setError(null);
      }

      setLoading(false);
    };

    fetchAllNews();
  }, []);

  const filteredArticles = articles.filter(
    (article) =>
      article.title &&
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const renderContent = () => {
    if (loading)
      return (
        <p className="text-center text-rich-black">
          Memuat berita dari berbagai sumber...
        </p>
      );
    if (error && filteredArticles.length === 0)
      return <p className="text-center text-red-500">Error: {error}</p>;
    if (filteredArticles.length === 0)
      return (
        <p className="text-center text-rich-black">
          Tidak ada berita yang cocok dengan pencarian Anda.
        </p>
      );
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
        <h2 className="text-xl font-bold text-rich-black mb-4">
          AI News Today
        </h2>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;

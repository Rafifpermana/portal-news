import React from "react";

const NewsItem = ({ article }) => {
  // Format tanggal agar lebih mudah dibaca
  const formattedDate = new Date(article.publishedAt).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-lg font-bold mb-2">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {article.title}
        </a>
      </h3>
      <div className="text-sm text-gray-500 flex justify-between items-center">
        <span>{article.source.name}</span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default NewsItem;

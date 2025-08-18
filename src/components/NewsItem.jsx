import React from "react";

const NewsItem = ({ article }) => {
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
          className="text-navy-blue hover:underline"
        >
          {article.title}
        </a>
      </h3>
      <div className="text-sm text-rich-black flex justify-between items-center">
        <span>{article.sourceName}</span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default NewsItem;

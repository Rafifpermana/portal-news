import React from "react";
import NewsItem from "./NewsItem";

const NewsList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <NewsItem key={article.url || index} article={article} />
      ))}
    </div>
  );
};

export default NewsList;

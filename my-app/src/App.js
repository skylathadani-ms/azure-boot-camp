import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sentiment from 'sentiment';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=microsoft%20finance&apiKey=7e725d089e1344659ed123634947279d&pageSize=10`
      );
      const articlesWithSentiment = response.data.articles.map((article) => {
        const sentimentResult = sentiment(article.description || '');
        const score = sentimentResult && sentimentResult.score;
        const sentimentScore = score ? Math.round((score + 5) / 10 * 100) : null;
        const color = sentimentScore && sentimentScore > 50 ? 'green' : 'inherit';
        return { ...article, sentimentScore, color };
      });
      setArticles(articlesWithSentiment);
    };

    fetchArticles();
  }, []);

  return (
    <div className="container">
      <h1>Microsoft Finance News</h1>
      {articles.map((article) => (
        <div key={article.url} className="article" style={{ color: article.color }}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          {article.sentimentScore && (
            <p>Sentiment Score: {article.sentimentScore}%</p>
          )}
          <a href={article.url}>Read More</a>
        </div>
      ))}
    </div>
  );
}

export default App;





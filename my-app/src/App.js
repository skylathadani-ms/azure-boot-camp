import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sentiment from 'sentiment';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get(
        `https://api.newscatcherapi.com/v2/search?q=microsoft finance&page=1`,
        {
          headers: {
            'x-api-key': 'yh47a1ZE9lO7_OhWD2u7hcl4LjwaPcEmIiObFinWtC0'
          }
        }
      );
      const articlesWithSentiment = response.data.articles.map((article) => {
        const sentimentResult = sentiment(article.summary || '');
        const score = sentimentResult && sentimentResult.score;
        const sentimentScore = score ? Math.round((score + 5) / 10 * 100) : null;
        const titleColor = sentimentScore && sentimentScore > 50 ? 'green' : 'inherit';
        const summaryColor = sentimentScore && sentimentScore > 50 ? 'green' : 'inherit';
        return { ...article, sentimentScore, titleColor, summaryColor };
      });
      setArticles(articlesWithSentiment);
    };

    fetchArticles();
  }, []);

  return (
    <div className="container">
      <h1>Microsoft Finance News</h1>
      {articles.map((article) => (
        <div key={article.link} className="article">
          <h2 style={{ color: article.titleColor }}>{article.title}</h2>
          <p style={{ color: article.summaryColor }}>{article.summary}</p>
          {article.sentimentScore && (
            <p>Sentiment Score: {article.sentimentScore}%</p>
          )}
          <a href={article.link}>Read More</a>
        </div>
      ))}
    </div>
  );
}

export default App;

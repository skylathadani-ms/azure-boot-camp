import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=7e725d089e1344659ed123634947279d&pageSize=10`
    );
    setArticles(response.data.articles);
  };

  return (
    <div className="container">
      <h1>Microsoft News Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
        />
        <button type="submit">Search</button>
      </form>
      {articles.map((article) => (
        <div key={article.url} className="article">
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <a href={article.url}>Read More</a>
        </div>
      ))}
    </div>
  );
}

export default App;

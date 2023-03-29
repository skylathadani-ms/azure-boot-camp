import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://finance.yahoo.com';

const searchArticles = async (query) => {
  const response = await axios.get(`${BASE_URL}/search`, {headers: {
    'Access-Control-Allow-Origin': '*',
  }},{
    params: {
      q: query,
    },
  });

  const articles = response.data.items.filter(item => item.category === 'news');
  return articles;
};

const getSentiment = async (text) => {
  // code for performing sentiment analysis goes here
};

const ArticleList = ({ articles }) => {
  return (
    <div>
      {articles.map(article => (
        <div key={article.title}>
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
          <p>{article.classification}</p>
        </div>
      ))}
    </div>
  );
};

const SearchForm = ({ onSubmit }) => {
  const [sentiment, setSentiment] = useState('positive');

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = `Microsoft ${sentiment}`;
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="radio" name="sentiment" value="positive" checked={sentiment === 'positive'} onChange={() => setSentiment('positive')} />
        Show positive articles
      </label>
      <label>
        <input type="radio" name="sentiment" value="negative" checked={sentiment === 'negative'} onChange={() => setSentiment('negative')} />
        Show negative articles
      </label>
      <br/><br/>
      <button type="submit">Search</button>
    </form>
  );
};

const App = () => {
  const [articles, setArticles] = useState([]);

  const handleSearch = async (query) => {
    const results = await searchArticles(query);
    const classifiedArticles = [];

    for (const article of results) {
      const sentimentScore = await getSentiment(article.summary);
      const classification = sentimentScore > 0 ? 'positive' : 'negative';
      classifiedArticles.push({
        title: article.title,
        summary: article.summary,
        classification: classification,
      });
    }

    setArticles(classifiedArticles);
  };

  return (
    <div>
      <h1>Microsoft Finances</h1>
      <SearchForm onSubmit={handleSearch} />
      <br/><br/>
      <ArticleList articles={articles} />
    </div>
  );
};

export default App;


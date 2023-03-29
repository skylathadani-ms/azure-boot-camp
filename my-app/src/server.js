const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.get('/articles', async (req, res) => {
  try {
    const response = await axios.get('https://finance.yahoo.com/search', {
      params: {
        q: 'Microsoft finance',
      },
    });

    const articles = response.data.items.filter(item => item.category === 'news');

    res.header('Access-Control-Allow-Origin', '*'); // add Access-Control-Allow-Origin header
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

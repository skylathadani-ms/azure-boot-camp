<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Microsoft Stock Price</title>
</head>
<body>
  <div id="root"></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.8.6/umd/react.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
  <script type="text/babel">
    class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          price: null
        };
      }

      componentDidMount() {
        // Fetch Microsoft stock price from Alpha Vantage API
        fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=YOUR_API_KEY')
          .then(response => response.json())
          .then(data => this.setState({ price: data['Global Quote']['05. price'] }));
      }

      render() {
        const { price } = this.state;
        return (
          <div>
            <h1>Microsoft Stock Price</h1>
            <p>{price ? `$${price}` : 'Loading...'}</p>
          </div>
        );
      }
    }

    ReactDOM.render(<App />, document.getElementById('root'));
  </script>
</body>
</html>

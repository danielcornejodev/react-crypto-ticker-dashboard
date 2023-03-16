import "./styles.css";
import { useState, useEffect } from "react";

const COIN_NAMES = {
  BTCUSDT: "Bitcoin",
  ETHUSDT: "Ethereum",
  SOLUSDT: "Solana",
  ADAUSDT: "Cardano",
  DOGEUSDT: "DogeCoin"
};

// const COINS = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "ADAUSDT", "DOGEUSDT"];

const COINS = Object.keys(COIN_NAMES);

export default function App() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetch("https://api2.binance.com/api/v3/ticker/24hr")
      .then((resData) => resData.json())
      .then((jsonData) => {
        const filteredData = jsonData.filter((stock) => {
          if (COINS.includes(stock.symbol)) {
            return true;
          }
        });
        setStockData(filteredData);
      });
  }, []);

  return (
    <div className="App">
      <nav>
        <img
          alt="logo"
          src="https://assets.codepen.io/6060109/crypto-logo-secondary.png"
        />
        <input type="text" placeholder="Search" />
      </nav>
      <div className="main-content">
        <h2>Today's cryptocurrency prices</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h %</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((stock, i) => {
              return (
                <tr key={stock.symbol}>
                  <td>{i + 1}</td>
                  <td>{COIN_NAMES[stock.symbol]}</td>
                  <td>${Number(stock.askPrice).toLocaleString(2)}</td>
                  <td
                    style={
                      Number(stock.priceChangePercent) > 0
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  >
                    {Number(stock.priceChangePercent) > 0 ? "▲" : "▼"}
                    {stock.priceChangePercent}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="bottom-logo-ctr">
          <img
            className="bottom-logo"
            alt="logo"
            src="https://assets.codepen.io/6060109/crypto-logo-primary.png"
          />
        </div>
      </div>
    </div>
  );
}

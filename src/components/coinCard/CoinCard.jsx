import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CoinCard.css";

function CoinCard(props) {
  const [isCryptoAdded, setisCryptoAdded] = useState(false);

  useEffect(() => {
    setisCryptoAdded(props.coin.isAdded);
  }, [props]);

  return (
    <div className="CoinCardDiv">
      <Link to={`/coins/${props.coin.id}`}>
        <div className="InnerCoinDiv">
          <h2 className="CoinName">
            {props.coin.name} <i className="fa-brands fa-bitcoin"></i>
          </h2>

          <p>Symbol: {props.coin.symbol}</p>
          <p>Rank: {props.coin.rank}</p>
          <p>Price: {props.coin.priceUsd} $</p>
          <p>Change Percent over 24 hours: {props.coin.changePercent24Hr} %</p>
        </div>
      </Link>
      <button className="coinBtn"
        onClick={(event) => {
          event.preventDefault();
          isCryptoAdded
            ? props.RemoveCryptoCoin(props.coin)
            : props.submitHandler(props.coin);
        }}
      >
        {isCryptoAdded ? "Remove" : "Add Coin"}
      </button>
    </div>
  );
}

export default CoinCard;

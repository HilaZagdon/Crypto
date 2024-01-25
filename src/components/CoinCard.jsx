import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CoinCard(props) {
  // const isCryptoAdded = props.coin.isAdded;
  const [isCryptoAdded, setisCryptoAdded] = useState(false);
  // console.log(isCryptoAdded);

  useEffect(() => {
    setisCryptoAdded(props.coin.isAdded);
  }, [props]);
  // console.log();
  return (
    <div>
      <h1>{props.coin.name}</h1>
      <p>Symbol: {props.coin.symbol}</p>
      <p>Rank: {props.coin.rank}</p>
      <p>Price: {props.coin.priceUsd} $</p>
      <p>Change Percent 24 hours: {props.coin.changePercent24Hr} %</p>
      <button
        onClick={() =>
          isCryptoAdded
            ? props.RemoveCryptoCoin(props.coin)
            : props.submitHandler(props.coin)
        }
      >
        {isCryptoAdded ? "Remove" : "Add Coin"}
      </button>
      <Link to={`/coins/${props.coin.id}`}> Go to </Link>
    </div>
  );
}

export default CoinCard;

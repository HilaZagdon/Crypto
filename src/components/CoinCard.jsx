import { useEffect, useState } from "react";

function CoinCard(props) {
  // const isCryptoAdded = props.Coins.isAdded;
  const [isCryptoAdded, setisCryptoAdded] = useState(false);
  // console.log(isCryptoAdded);

  useEffect(() => {
    setisCryptoAdded(props.Coins.isAdded);
  }, [props]);

  return (
    <div>
      <h1>{props.Coins.name}</h1>
      <p>Symbol: {props.Coins.symbol}</p>
      <p>Rank: {props.Coins.rank}</p>
      <p>Price: {props.Coins.priceUsd} $</p>
      <p>Change Percent 24 hours: {props.Coins.changePercent24Hr} %</p>
      <button
        onClick={() =>
          isCryptoAdded
            ? props.RemoveCryptoCoin(props.Coins)
            : props.submitHandler(props.Coins)
        }
      >
        {isCryptoAdded ? "Remove" : "Add Coin"}
      </button>
    </div>
  );
}

export default CoinCard;

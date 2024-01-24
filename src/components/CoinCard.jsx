function CoinCard(props) {
  const isCryptoAdded = props.Coins.isAdded;

  // console.log(isCryptoAdded);

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

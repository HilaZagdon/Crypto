import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./SingleCoin.css";

function SingleCoin() {

  const { coinId } = useParams();
  const [coin, setCoin] = useState({});
  console.log({ coinId });
  const getCoin = async () => {
    try {
      const res = await fetch(`https://api.coincap.io/v2/assets/${coinId}`);
      const data = await res.json();
      console.log(data);
      setCoin(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCoin();
  }, []);

  return (
    <div className="SingleCoinDiv">
      <div className="SingleCoinDivInner" >
      <h1 className="H1Name">{coin?.name}</h1> 
 <p className="Symbol">Symbol: {coin?.symbol}</p>
      <p className="Rank">Rank: {coin?.rank}</p>
      <p className="Usd">Price: {coin?.priceUsd} $</p>
      <p className="Change24">Change Percent over 24 hours: {coin?.changePercent24Hr} %</p>
      <p className="Supply">Supply: {coin?.supply}</p>
<button><Link target="_blank" to={coin?.explorer}>
  <i className="fa-solid fa-external-link-alt"></i>
  </Link>
  </button>
</div>
    </div>
  );
}

export default SingleCoin;

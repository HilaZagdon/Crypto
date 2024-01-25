import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleCoin() {
  // const params = useParams();
  // console.log(params);
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
    <div>
      <h1>{coin?.name}</h1>
    </div>
  );
}

export default SingleCoin;

import React, { useState, useEffect } from "react";
import {
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import CoinCard from "../components/CoinCard";
import { db } from "../Config/firebaseConfig";

function Home(props) {
  const [Coins, setCoins] = useState([]);
  const [ErrMsg, setErrMsg] = useState("");
  const [addedCoinIds, setAddedCoinIds] = useState([]);

  const fetchCoins = async () => {
    try {
      const response = await fetch("https://api.coincap.io/v2/assets");
      const data = await response.json();
      setCoins(data.data);
      //
    } catch (error) {
      console.log("Error fetching coins:", error);
    }
  };

  useEffect(() => {
    props.getMyCrypto();
  }, [props.user, Coins]);

  // console.log(props.Cryptos);

  const submitHandler = async (crypto) => {
    try {
      const isAlreadyAdded = props.Cryptos.some(
        (item) => item.id === crypto.uid
      );

      if (!isAlreadyAdded) {
        const CryptoCoinDoc = await addDoc(props.CryptoCoinCollectionRef, {
          ...crypto,
          isAdded: true,
          user: props.user.uid,
        });

        const CryptoCoinRef = doc(db, "MyCrypto", CryptoCoinDoc.id);
        const newDoc = await getDoc(CryptoCoinRef);
        props.setCryptos([
          ...props.Cryptos,
          { ...newDoc.data(), uid: newDoc.id },
        ]);
        setAddedCoinIds([...addedCoinIds, crypto.id]);

        setCoins((prevCoins) =>
          prevCoins.map((item) =>
            item.id === crypto.id ? { ...item, isAdded: true } : item
          )
        );
      }
    } catch (error) {
      setErrMsg("Something went wrong");
    }
  };

  const RemoveCryptoCoin = async (crypto) => {
    try {
      const q = query(
        props.CryptoCoinCollectionRef,
        where("id", "==", crypto.id),
        where("user", "==", props.user.uid)
      );

      const CryptoCoinDoc = await getDocs(q);

      console.log(CryptoCoinDoc);
      await deleteDoc(doc(db, "MyCrypto", CryptoCoinDoc.docs[0].id));

      const filtered = props.Cryptos.filter((item) => item.id !== crypto.id);

      props.setCryptos(filtered);

      setCoins((prevCoins) =>
        prevCoins.map((item) =>
          item.id === crypto.id ? { ...item, isAdded: false } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const isIsFavorite = (id) => {
    for (let i = 0; i < props.Cryptos.length; i++) {
      const element = props.Cryptos[i];
      if (element.id == id) return true;
    }
    return false;
  };

  useEffect(() => {
    if (props.Cryptos.length) {
      setCoins((prevCoins) =>
        prevCoins.map((item) =>
          isIsFavorite(item.id) ? { ...item, isAdded: true } : item
        )
      );
    }
  }, [props.Cryptos, props.user]);

  return (
    props.Cryptos && (
      <div>
        {Coins.map((item, i) => (
          <CoinCard
            Coins={item}
            RemoveCryptoCoin={RemoveCryptoCoin}
            submitHandler={submitHandler}
            key={`co_${i}`}
          />
        ))}
      </div>
    )
  );
}

export default Home;

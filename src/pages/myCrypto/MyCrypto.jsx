import React from "react";
import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import CoinCard from "../../components/coinCard/CoinCard";
import { db, auth } from "../../Config/firebaseConfig";
import "./MyCrypto.css"

function MyCrypto(props) {
  useEffect(() => {
    props.getMyCrypto();
  }, [props.user]);

  const RemoveCryptoCoin = async (crypto) => {
    console.log(crypto.id);
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
  return (
    <div className="MyCryptoDiv">
      {props.Cryptos.map((item, i) => {
        return (
          <div className="MyCryptoDivInner" >
            <CoinCard
              coin={item}
              RemoveCryptoCoin={RemoveCryptoCoin}
              key={`co_${i}`}
            />
          </div>
        );
      })}
    </div>
  );
}
export default MyCrypto;

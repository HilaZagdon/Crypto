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
import CoinCard from "../components/CoinCard";
import { db, auth } from "../Config/firebaseConfig";

function MyCrypto(props) {
  // const [MyCrypto, setMyCrypto] = useState([]);
  // const [CryptoCoin, setCryptoCoin] = useState({});
  // const [ErrMsg, setErrMsg] = useState("");

  // const CryptoCoinCollectionRef = collection(db, "MyCrypto");

  useEffect(() => {
    props.getMyCrypto();
  }, [props.user]);

  // const submitHandler = async (crypto) => {
  //   try {
  //     const CryptoCoinDoc = await addDoc(CryptoCoinCollectionRef, {
  //       ...crypto,
  //       isAdded: !crypto.isAdded,
  //     });

  //     console.log({ CryptoCoinDoc });

  //     const CryptoCoinRef = doc(db, "MyCrypto", CryptoCoinDoc.id);
  //     const newDoc = await getDoc(CryptoCoinRef);
  //     setMyCrypto([...MyCrypto, { ...newDoc.data(), id: newDoc.id }]);
  //   } catch (error) {
  //     setErrMsg("something went wrong");
  //   }

  // const RemoveCryptoCoin = async (CryptoCoin) => {
  //   try {
  //     const CryptoCoinDoc = doc(db, "MyCrypto", CryptoCoin.id);
  //     await deleteDoc(CryptoCoinDoc);

  //     const filtered = props.Cryptos.filter((item) => {
  //       return item.id !== CryptoCoin.id;
  //     });
  //     props.setCryptos(filtered);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

      // setAddedCoinIds((prevIds) => prevIds.filter((id) => id !== crypto.id));

      setCoins((prevCoins) =>
        prevCoins.map((item) =>
          item.id === crypto.id ? { ...item, isAdded: false } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(props.Cryptos);
  return (
    <div>
      {props.Cryptos.map((item, i) => {
        return (
          <CoinCard
            Coins={item}
            RemoveCryptoCoin={RemoveCryptoCoin}
            key={`co_${i}`}
          />
        );
      })}
    </div>
  );
}
export default MyCrypto;

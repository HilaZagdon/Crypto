import { useState, useEffect } from "react";
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
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./Config/firebaseConfig";
import Navbar from "./components/NavBar";
import Auth from "./pages/Auth";
import MyCrypto from "./pages/MyCrypto";
import SingleCoin from "./pages/SingleCoin";

function App() {
  const [user, setUser] = useState(null);
  const [Cryptos, setCryptos] = useState([]);

  const CryptoCoinCollectionRef = collection(db, "MyCrypto");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
        // getMyCrypto();
      } else {
        setUser(null);
      }
    });
  }, []);

  const getMyCrypto = async () => {
    try {
      if (!user) {
        return;
      }
      const q = query(CryptoCoinCollectionRef, where("user", "==", user.uid));
      const rowDocs = await getDocs(q);
      const docs = rowDocs.docs.map((doc) => {
        return { ...doc.data(), uid: doc.id };
      });
      setCryptos(docs);
    } catch (err) {
      console.error(err);
    }
  };

  // console.log(user);

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
        <Route
          path="/home"
          element={
            <Home
              setCryptos={setCryptos}
              Cryptos={Cryptos}
              getMyCrypto={getMyCrypto}
              user={user}
              CryptoCoinCollectionRef={CryptoCoinCollectionRef}
            />
          }
        />

        <Route path="/coins/:coinId" element={<SingleCoin />} />
        <Route
          path="/myCrypto"
          element={
            <MyCrypto
              setCryptos={setCryptos}
              Cryptos={Cryptos}
              getMyCrypto={getMyCrypto}
              user={user}
              CryptoCoinCollectionRef={CryptoCoinCollectionRef}
            />
          }
        />
        <Route
          path="/authentication"
          element={
            <Auth
              CryptoCoinCollectionRef={CryptoCoinCollectionRef}
              setCryptos={setCryptos}
              Cryptos={Cryptos}
              setUser={setUser}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

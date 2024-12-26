import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase/firebase'; // Firebase設定
import { CreatePost } from './components/CreatePost/createPost';
import './App.css';
import { Home } from "./pages/Home";
import { LoginOrSignup } from './pages/LoginOrSignup';
import { Login } from './pages/login';
import { Signup } from './pages/Signup';
import { Header } from './components/Header/header';
import { QrScanner } from './pages/QrScanner';
import { Inquiry } from './pages/Inquiry';
import { PointCard } from './components/PointCard/pointCard';
import { Mm1 } from './pages/Mm1'

function App() {
  const [stampCount, setStampCount] = useState(0); // ローカル状態
  const [user, setUser] = useState(null); // 現在のユーザー情報

  // ユーザーのポイントデータをFirestoreから取得
  const fetchPoints = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setStampCount(userDoc.data().points || 0); // Firestoreのデータを状態に反映
      } else {
        // 新規ユーザーの場合は初期ポイントを設定
        await setDoc(doc(db, 'users', uid), { points: 0 });
        setStampCount(0);
      }
    } catch (error) {
      console.error("ポイントデータの取得に失敗しました:", error);
    }
  };

  // QRコードスキャンでポイントを追加
  const addStamp = async () => {
    if (!user) return;


    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        points: Math.min(stampCount + 1), // 最大10ポイントまで
      });
      setStampCount((prevCount) => Math.min(prevCount + 1));
    } catch (error) {
      console.error("ポイントの更新に失敗しました:", error);
    }
  };

  // ログイン状態を監視
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchPoints(currentUser.uid); // ログインユーザーのポイントを取得
      } else {
        setUser(null);
        setStampCount(0); // ログアウト時はポイントをリセット
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginOrSignup" element={<LoginOrSignup />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/QRcode" element={<QrScanner addStamp={addStamp} />} />
        <Route path="/PointCard" element={<PointCard stampCount={stampCount} />} />
        <Route path="/Inquiry" element={<Inquiry />} />
        <Route path="/Post" element={<CreatePost />} />
        <Route path="/map" element={<Mm1 />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import "../styles/login.css";
import "../styles/Signup.css";
import Header from "../components/Header/header";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 新規登録処理
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestoreにユーザーデータを保存
      const userRef = doc(db, "user", user.uid);
      await setDoc(userRef, {
        username: username,
        points: 0, // 初期ポイント
        coupons:0,//初期クーポン
        email: email,
      });

      // 登録完了後にログインページへ遷移
      navigate("/login");
    } catch (err) {
      setError("メールまたはパスワードは使えません");
    }
  };

  return (
    <>
    <div className="signup-container">
      <div className="form-wrapper">
        <h2>新規登録</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ユーザー名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            required
          />
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
          <button type="submit" className="button">
            新規登録
          </button>
        </form>
        <p className="navi-signup">ログインは<a onClick={goToLogin}>こちら</a></p>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
    </>
  );
};

export default Signup;

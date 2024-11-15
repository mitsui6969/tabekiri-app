import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import "../styles/login.css";
import "../styles/Signup.css"

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");

      try {
          // 新規登録処理
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          const userRef = doc(db, "user", user.uid);
          await setDoc(userRef, { username });

          navigate("/login");
      } catch (err) {
          setError("メールまたはパスワードは使えません");
      }
  };

  return (
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
        <p className="navi-signup">ログインは<a href="/login">こちら</a></p>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Signup;
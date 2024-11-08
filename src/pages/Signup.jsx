import React, { useState } from "react";
import "./Signup.css"
export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = () => {
    // 簡単なバリデーション（必要に応じて強化）
    if (username && email && password) {
      setSuccess("新規登録が成功しました！");
      setError("");
    } else {
      setError("すべてのフィールドを入力してください。");
      setSuccess("");
    }
  };

  return (
    <div className="signup-container">
      <div className="form-wrapper">
        <h2>新規登録</h2>
        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button onClick={handleSignup} className="button">
          新規登録
        </button>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </div>
    </div>
  );
};

export default Signup;
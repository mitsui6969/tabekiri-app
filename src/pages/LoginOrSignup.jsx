import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginOrSignup.css"; // スタイル用のCSSファイルを作成してインポート

export const LoginOrSignup = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignup = () => {
    navigate("/Signup");
  };

  return (
    <div className="menu-container">
      <h2>ようこそ！</h2>
      <div className="button-container">
        <button onClick={goToLogin} className="menu-button">
          ログイン
        </button>
        <button onClick={goToSignup} className="menu-button">
          新規登録
        </button>
      </div>
    </div>
  );
};

export default LoginOrSignup;

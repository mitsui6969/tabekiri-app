import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/LoginOrsignup.css';

export const LoginOrSignup = () => {
  const navigate = useNavigate();

  // ログイン画面への遷移関数
  const goToLogin = () => {
    navigate("/login");
  };

  // 新規登録画面への遷移関数
  const goToSignup = () => {
    navigate("/Signup");
  };

  return (
    <div className="menu-container">
      <h2>ようこそ</h2>
      <div className="button-container">
        <button
          className="menu-button"
          data-tooltip="ログイン画面へ進む"
          onClick={goToLogin}
        >
          <span className="icon">🔑</span> ログイン画面
        </button>
        <button
          className="menu-button"
          data-tooltip="アカウントを作成する"
          onClick={goToSignup}
        >
          <span className="icon">📝</span> 新規登録
        </button>
      </div>
    </div>
  );
};

export default LoginOrSignup;

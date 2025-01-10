import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { signOut } from "firebase/auth"; // Firebaseのログアウト関数
import { auth } from "../firebase/firebase"; // Firebase認証のインスタンス
import './Logout.css';
import Header from "../components/Header/header";

export const Logout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // ログイン状態を管理（初期値をtrueに設定）
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth); // Firebaseでサインアウト
            setIsLoggedIn(false); // ログイン状態を更新
            navigate("/LoginOrSignup"); // ログインページにリダイレクト
        } catch (error) {
            console.error("ログアウトに失敗しました:", error);
        }
    };

    return (
        <div className="logout-page">
            <Header />
            <div className="logout-container">
                <h1 className="logout-header">ログアウト</h1>
                {isLoggedIn ? (
                    <div className="logout-content">
                        <p>本当にログアウトしますか？</p>
                        <button className="logout-button" onClick={handleLogout}>
                            ログアウト
                        </button>
                    </div>
                ) : (
                    <p>
                        ログアウトしました。<Link to="/LoginOrSignup">こちら</Link>から再度ログインしてください。
                    </p>
                )}
            </div>
        </div>
    );
};

export default Logout;

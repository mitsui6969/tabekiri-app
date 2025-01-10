import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import "../styles/Signup.css";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // 新規登録画面への遷移関数
    const goToSignup = () => {
        navigate("/Signup");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // ログイン処理
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            setError("メールまたはパスワードが違います");
        }
    };

    return (
        <div className="signup-container">
            <div className='form-wrapper'>
            <h2>ログイン</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="メール"
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
                    ログイン
                </button>
            </form>
            <p className="navi-signup">新規登録は<a onClick={goToSignup}>こちら</a></p>
            {error && <div className="error-message">{error}</div>}
            </div>
        </div>

    );
}

export default Login;

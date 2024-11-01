import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // サンプルのユーザー名とパスワード
    const correctUsername = "admin";
    const correctPassword = "1234";

    // 入力内容のチェック
    if (username === correctUsername && password === correctPassword) {
      alert("ログイン成功！");
      setError("");
      // ログイン後の処理をここに追加
    } else {
      setError("ユーザー名またはパスワードが違います。");
    }
  };

  return (
    <div style={styles.container}>
      <h2>ログイン</h2>
      <input
        type="text"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>
        ログイン
      </button>
      {error && <div style={styles.errorMessage}>{error}</div>}
    </div>
  );
}

// スタイルの設定
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "4px"
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  errorMessage: {
    color: "red",
    marginTop: "10px",
    textAlign: "center"
  }
};

export default Login;

import './Header.css'; // ヘッダー用のCSSファイルをインポート
import './Footer.css'; // フッター用のCSSファイルをインポート

export function Home2() {
  const handleNavigate = () => {
    window.location.href = "http://localhost:5173";
  };
  const home_go = () => {
    window.location.href = "https://webmoyou.com/web/298/";
  };

  return (
    <div>
      <header className= "header">
        <div className="header__logo">
          <a href="https://webmoyou.com/web/298/">Tabekiri</a> {/* 適当なサイト*/}
        </div>
        <nav className= "hader">
          <ul>
            <li><a href="#home">ホーム</a></li>
            <li><a href="#about">概要</a></li>
            <li><a href="#services">サービス</a></li>
           <li><a href="#contact">お問い合わせ</a></li>
          </ul>
        </nav>
      </header>
      <button onClick={handleNavigate}>
      リンクへ飛ぶ
      </button>
      <button onClick={home_go}>
      ホームへ飛ぶ
      </button>
      <footer className="footer">
      <div className="footer__item">
        <a href="#home">
          <img src="画像頼んだ" alt="ホーム" className="footer__icon" /> 
        </a>
      </div>
      <div className="footer__item">
        <a href="#balance">
          <img src="画像頼んだ" alt="残高" className="footer__icon" />
        </a>
      </div>
      <div className="footer__item">
        <a href="#pay">
          <img src="画像頼んだ" alt="支払い" className="footer__icon" />
        </a>
      </div>
      <div className="footer__item">
        <a href="#history">
          <img src="画像頼んだ" alt="履歴" className="footer__icon" />
        </a>
      </div>
      <div className="footer__item">
        <a href="#account">
          <img src="画像頼んだ" alt="アカウント" className="footer__icon" />
        </a>
      </div>
    </footer>
   </div>
    
  );
}


export default Home2;
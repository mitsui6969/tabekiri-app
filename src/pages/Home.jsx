import React from 'react';
import PointCard from './PointCard'; // PointCard をインポート

export function Home() {
  const handleNavigate = () => {
    window.location.href = "https://www.infra-linux.com/linux-ex-menu/#%E6%BC%94%E7%BF%92%EF%BC%90%EF%BC%91%EF%BC%8D%EF%BC%92%EF%BC%90";
  };

  return (
    <div>
      <div>
        <button onClick={handleNavigate}>
          <img src="QRコード画像" alt="QRコード画面" className="footer__icon" /> 
        </button>
      </div>
    

      {/* ポイントカードの表示 */}
      <PointCard />

      <footer className="footer">
        {/* フッターコンテンツ */}
      </footer>
    </div>
  );
}

export default Home;

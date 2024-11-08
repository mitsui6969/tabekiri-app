import React from 'react';
import PointCard from './PointCard'; // PointCard をインポート

export function Home() {
  const handleNavigate = () => {
    window.location.href = "./pages/QrScanner";
  };

  return (
    <div>
      <button onClick={handleNavigate}>
        <img src="QRコード画像" alt="QRコード画面" className="footer__icon" /> 
      </button>

      {/* ポイントカードの表示 */}
      <PointCard />

      <footer className="footer">
        {/* フッターコンテンツ */}
      </footer>
    </div>
  );
}

export default Home;

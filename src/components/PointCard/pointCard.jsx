import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from "../../firebase/firebase";
import './pointCard.css';

export const PointCard = () => {
  const [points, setPoints] = useState(0); // 現在のポイント数
  const [coupons, setCoupons] = useState(0); // 現在のクーポン数
  const [cardColor, setCardColor] = useState('#ff4d4d');
  const [isFlipped, setIsFlipped] = useState(false);
  const [userName, setUserName] = useState(); // ユーザー名
  const [error, setError] = useState(''); // エラー管理用
  const [userId, setUserId] = useState(null); // 現在のユーザーID

  // Firestore からユーザーデータをリアルタイムで監視
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        const userRef = doc(db, 'user', user.uid);

        // Firestoreのデータをリアルタイムで監視
        const unsubscribeSnapshot = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.data();
            setPoints(userData.points || 0);
            setCoupons(userData.coupons || 0);
            setUserName(userData.username || "匿名ユーザー");

            // ポイントが10以上になった場合の処理
            if (userData.points >= 10) {
              resetPointsAndAddCoupon(userRef, userData.points, userData.coupons);
            }
          } else {
            setError("ユーザーデータが見つかりません");
          }
        });

        return () => unsubscribeSnapshot();
      } else {
        setError("ログインが必要です");
      }
    });

    return () => unsubscribe();
  }, []);

  // Firestoreでポイントをリセットし、クーポンを追加
  const resetPointsAndAddCoupon = async (userRef, currentPoints, currentCoupons) => {
    try {
      await updateDoc(userRef, {
        points: currentPoints - 10, // 10ポイント消費
        coupons: currentCoupons + 1, // クーポン1つ追加
      });

      console.log("クーポンが追加され、ポイントがリセットされました");
    } catch (err) {
      console.error("Firestoreの更新中にエラーが発生しました:", err);
    }
  };

  const handleCardFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const isDarkColor = (color) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance < 128;
  };

  const textColor = isDarkColor(cardColor) ? 'white' : 'black';

  // スタンプ表示ロジック
  const stamps = Array(2)
    .fill(null)
    .map((_, rowIndex) =>
      Array(5)
        .fill(false)
        .map((_, colIndex) => rowIndex * 5 + colIndex < points)
    );

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="card-color">カードの色を選択:</label>
        <input
          id="card-color"
          type="color"
          value={cardColor}
          onChange={(e) => setCardColor(e.target.value)}
        />
      </div>

      <div
        className={`card ${isFlipped ? 'flipped' : ''}`}
        onClick={handleCardFlip}
      >
        <div className="card-inner">
          {/* カードの表面 */}
          <div
            className="card-front"
            style={{ backgroundColor: cardColor }}
          >
            <div className="grid">
              {stamps.map((row, rowIndex) =>
                row.map((isStamped, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="stamp"
                    style={{
                      backgroundImage: isStamped ? 'url("/stamp.jpg")' : 'none',
                      backgroundSize: 'cover',
                      backgroundColor: isStamped ? '#ff8080' : '#e0e0e0',
                      color: 'black',
                    }}
                  >
                    {!isStamped && rowIndex * 5 + colIndex + 1}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* カードの裏面 */}
          <div
            className="card-back"
            style={{
              backgroundColor: cardColor,
              color: textColor,
            }}
          >
            <p>{userName ? `こんにちは、${userName}さん！` : 'ユーザー名を読み込み中...'}</p>
            <p>現在のクーポン: {coupons}</p>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointCard;

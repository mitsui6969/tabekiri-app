import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from "../../firebase/firebase";
import './pointCard.css';

export const PointCard = () => {
  const [points, setPoints] = useState(0); // 現在のポイント数
  const [cardColor, setCardColor] = useState('#ff4d4d');
  const [isFlipped, setIsFlipped] = useState(false);
  const [userName, setUserName] = useState(); // ユーザー名
  const [error, setError] = useState(''); // エラー管理用
  const [userId, setUserId] = useState(null); // 現在のユーザーID

  // Firestore からユーザーデータを取得
  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'user', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserName(userData.username);
        setPoints(userData.points || 0); // ポイント情報を取得
      } else {
        setError('ユーザーデータが見つかりません');
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('データ取得中にエラーが発生しました');
    }
  };

  // Firestore のポイントを更新
  const addPointToFirestore = async () => {
    if (!userId) return;

    try {
      const userRef = doc(db, 'user', userId);
      const newPoints = Math.min(points + 1); // 最大 10 ポイント
      await updateDoc(userRef, { points: newPoints });
      setPoints(newPoints); // ローカル状態も更新
    } catch (err) {
      console.error('Error updating points:', err);
    }
  };

  // QRコード読み取り時にポイントを追加
  const handleQrScan = () => {
    addPointToFirestore(); // Firestore のポイントを更新
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchUserData(user.uid); // ユーザーデータを取得
      } else {
        setError('ログインが必要です');
      }
    });
    return () => unsubscribe();
  }, []);

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
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointCard;

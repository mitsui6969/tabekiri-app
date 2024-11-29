import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore'; // Firestoreを使う
import { db } from "../../firebase/firebase"; // Firebase設定をインポート
import './pointCard.css';

export const PointCard = () => {
  const [stamps, setStamps] = useState(
    Array(2).fill(Array(5).fill(false))
  );
  const [cardColor, setCardColor] = useState('#ff4d4d');
  const [isFlipped, setIsFlipped] = useState(false);
  const [userName, setUserName] = useState(''); // ユーザー名のステート

  // Firebaseからユーザー名を取得する関数
  const fetchUserName = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', 'USER_ID')); // USER_IDは適切に置き換える
      if (userDoc.exists()) {
        setUserName(userDoc.data().name); // Firestoreの`name`フィールドを使用
      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUserName(); // コンポーネントのマウント時にユーザー名を取得
  }, []);

  const handleStampClick = (rowIndex, colIndex) => {
    setStamps((prevStamps) =>
      prevStamps.map((row, rIdx) =>
        row.map((stamp, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? true : stamp
        )
      )
    );
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

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>ポイントカード</h2>

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
                      backgroundImage: isStamped
                        ? 'url("/stamp.jpg")'
                        : 'none',
                      backgroundSize: 'cover',
                      backgroundColor: isStamped
                        ? '#ff8080'
                        : '#e0e0e0',
                      color: 'black',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStampClick(rowIndex, colIndex);
                    }}
                  >
                    {!isStamped && (rowIndex * 5 + colIndex + 1)}
                  </div>
                ))
              )}
            </div>
          </div>

          <div
            className="card-back"
            style={{
              backgroundColor: cardColor,
              color: textColor,
            }}
          >
            <p>{userName ? `こんにちは、${userName}さん！` : 'ユーザー名を読み込み中...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointCard;

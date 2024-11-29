import React, { useState } from 'react';
import './pointCard.css';

export const PointCard = () => {
  const [stamps, setStamps] = useState(
    Array(2).fill(Array(5).fill(false))
  );

  const [cardColor, setCardColor] = useState('#ff4d4d'); // カードの初期色

  // スタンプを押す処理
  const handleStampClick = (rowIndex, colIndex) => {
    setStamps((prevStamps) =>
      prevStamps.map((row, rIdx) =>
        row.map((stamp, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? true : stamp
        )
      )
    );
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* 色選択インプット */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="card-color">カードの色を選択:</label>
        <input
          id="card-color"
          type="color"
          value={cardColor}
          onChange={(e) => setCardColor(e.target.value)} // 選択した色を反映
        />
      </div>

      {/* ポイントカード */}
      <div
        className="card"
        style={{
          backgroundColor: cardColor, // カードの色を選択した色に変更
        }}
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
                onClick={() => handleStampClick(rowIndex, colIndex)}
              >
                {/* 数字をスタンプが押されていない場合だけ表示 */}
                {!isStamped && (rowIndex * 5 + colIndex + 1)}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PointCard;

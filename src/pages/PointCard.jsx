import React, { useState } from 'react';

function PointCard() {
  // 2行×5列の配列で、各スタンプが押されたかどうかを管理
  const [stamps, setStamps] = useState(
    Array(2).fill(Array(5).fill(false))
  );

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
    <div style={styles.card}>
      <h2>ポイントカード</h2>
      <div style={styles.grid}>
        {stamps.map((row, rowIndex) =>
          row.map((isStamped, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                ...styles.stamp,
                backgroundImage: isStamped ? 'url("/stamp.jpg")' : 'none', // スタンプが押された場合に画像を表示
                backgroundSize: 'cover',
                backgroundColor: isStamped ? '#f9f9f9' : '#e0e0e0', // 押されていない場合は灰色
              }}
              onClick={() => handleStampClick(rowIndex, colIndex)}
            >
              {isStamped ? '' : ''}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// スタイル設定
const styles = {
  card: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 50px)', // 横5列
    gridTemplateRows: 'repeat(2, 50px)', // 縦2行
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stamp: {
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default PointCard;

import React, { useState } from 'react';
import './pointCard.css';

export const PointCard = () => {
    const [stamps, setStamps] = useState(
        Array(2).fill(Array(5).fill(false))
    );
    const [cardColor, setCardColor] = useState('#ff4d4d'); // カードの初期色
    const [isFlipped, setIsFlipped] = useState(false); // 表/裏の状態を管理

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

    // カードの表/裏を切り替える処理
    const handleCardFlip = () => {
        setIsFlipped((prev) => !prev);
    };

    // 色の明るさを判定する関数
    const isDarkColor = (color) => {
        // カラーコード (#RRGGBB) を RGB に分解
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        // 輝度を計算 (簡易的な方法)
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

        // 輝度が128以下なら暗い色とみなす
        return luminance < 128;
    };

    const textColor = isDarkColor(cardColor) ? 'white' : 'black'; // 色を判定して文字色を設定

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

        {/* スタンプカード */}
        <div
            className={`card ${isFlipped ? 'flipped' : ''}`} // 表/裏の状態を切り替え
            onClick={handleCardFlip} // カード全体のクリックで裏返す
        >
            <div className="card-inner">
            {/* 表面 */}
            <div
                className="card-front"
                style={{ backgroundColor: cardColor }} // 選択した色を適用
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
                        e.stopPropagation(); // カードのクリックイベントを防止
                        handleStampClick(rowIndex, colIndex);
                        }}
                    >
                        {!isStamped && (rowIndex * 5 + colIndex + 1)}
                    </div>
                    ))
                )}
                </div>
            </div>

            {/* 裏面 */}
            <div
                className="card-back"
                style={{
                backgroundColor: cardColor,
                color: textColor, // 動的に文字色を設定
                }}
            >
                <p>裏面の内容</p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default PointCard;

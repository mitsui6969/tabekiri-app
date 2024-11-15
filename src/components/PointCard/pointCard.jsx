import React, { useState } from 'react';
import "./pointCard.css"

export function PointCard() {
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
        <div className='card'>
            <h2>ポイントカード</h2>
        <div className='grid'>
            {stamps.map((row, rowIndex) =>
                row.map((isStamped, colIndex) => (
                    <div
                    key={`${rowIndex}-${colIndex}`}
                    className='stamp'
                    style={{
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

export default PointCard;

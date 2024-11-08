import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QrScanner = () => {
  const [data, setData] = useState('No result'); // QRコードの結果を格納するためのステート
  const [isFrontCamera, setIsFrontCamera] = useState(false); //　カメラの向きを切り替えるためのステート

  // QRコード読み取り成功時の処理
  const handleScan = (result) => {
    if (result) {
      setData(result.text); // 結果を更新
    }
  };

  // 読み取りエラーの処理
  const handleError = (err) => {
    console.error(err); // エラーをコンソールに表示
  };

  // カメラの向きを切り替える処理
  const toggleCamera = () => {
    setIsFrontCamera((prev) => !prev); // カメラの向きを反転
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>QRコードをスキャンしてください</h2>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            handleScan(result);
          }
          if (!!error) {
            handleError(error);
          }
        }}
        constraints={{ facingMode: isFrontCamera ? 'user' : 'environment' }} // 背面カメラを使用する
        style={{ width: '300px', margin: '0 auto' }}
      />

      <button onClick = {toggleCamera} style = {{ margin: '10px'}}>
        カメラを{isFrontCamera ? '外' : '内'}カメラに切り替える  
      </button>

      <p>スキャン結果: {data}</p>
    </div>
  );
};

export default QrScanner;

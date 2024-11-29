import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

export const QrScanner = () => {
  const [data, setData] = useState('No result'); // QRコードの結果を格納するためのステート
  const [isFrontCamera, setIsFrontCamera] = useState(false); //　カメラの向きを切り替えるためのステート



  // QRコード読み取り成功時の処理
  const handleScan = (result) => {
    if (result) {
      const scannedText = result.text;
      setData(scannedText); // 結果を更新

      // 効果音を再生
      Sound();

      // QRコードの内容がURLであれば自動でリダイレクト
      if (isValidURL(scannedText)) {
        window.location.href = scannedText;
      }
    }
  }

  const Sound = () => {
    const audio = new Audio('ラッパのファンファーレ.mp3'); // 音声ファイルのパス
    audio.play().catch((error) => {
      console.error("音声再生に失敗しました:", error);
    })
  }

  // URLの形式かどうかを判定する関数
  const isValidURL = (text) => {
    try {
      new URL(text); // textをURLとして扱えるかチェック
      return true;
    } catch (e) {
      return false;
    }
  }

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

      <button onClick={toggleCamera} style={{ margin: '10px'}}>
        カメラを{isFrontCamera ? '外' : '内'}カメラに切り替える  
      </button>

      <p style = {styles.result}>スキャン結果: {data}</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'conter', // 垂直方向の中央
    alignItems: 'center', // 水平方向の中央
    height: '100vh', // 画面全体の高さ
    textalign: 'center',
  },
  title: {
    marginBottom: '20px',
  },
  qrReader: {
    width: '300px', // QrReaderの幅を指定
    maxWidth:'100%',
  },
  result: {
    marginTop: '20px',
  },
}
export default QrScanner;

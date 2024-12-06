import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';

const QrScanner = ({addStamp}) => {
  const [data, setData] = useState('No result'); // QRコードの結果を格納するためのステート
  const [facingMode, setFacingMode] = useState('environment'); //　カメラの向きを切り替えるためのステート
  const navigate = useNavigate(); // React Routerのナビゲーション


  // QRコード読み取り成功時の処理
  const handleScan = (result) => {
    if (result) {
      const scannedText = result.text;
      setData(scannedText); // 結果を更新

      // 効果音を再生
      Sound();

      // スタンプを1つ追加
      addStamp();

      // QRコードが読み込まれたらホーム画面に遷移
      navigate('/')
    }
  }

  const Sound = () => {
    const audio = new Audio('ラッパのファンファーレ.mp3'); // 音声ファイルのパス
    audio.play().catch((error) => {
      console.error("音声再生に失敗しました:", error);
    })
  }
  
  // 読み取りエラーの処理
  const handleError = (err) => {
    console.error(err); // エラーをコンソールに表示
  };

  // カメラの向きを切り替える処理
  const toggleFacingMode = () => {
    setFacingMode((prevMode) => 
      prevMode === 'user' ? 'environment' : 'user'
    ); // カメラの向きを切り替える
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>QRコードをスキャン</h2>
      <h2>してください</h2>
      
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            handleScan(result);
          }
          if (!!error) {
            handleError(error);
          }
        }}
        constraints={{ facingMode}} // facingModeを利用してカメラの向きを設定
        style={{ width: '300px', margin: '0 auto' }}
      />

      <button onClick={toggleFacingMode} style={{ margin: '10px'}}>
        カメラを{facingMode === 'user' ? '外' : '内'}カメラに切り替える  
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

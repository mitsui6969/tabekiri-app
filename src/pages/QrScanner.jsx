import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import Header from '../components/Header/header';

export const QrScanner = () => {
  const [data, setData] = useState('No result'); // QRコードの結果を格納するためのステート
  const [facingMode] = useState('environment'); // カメラの向きを切り替えるためのステート
  const navigate = useNavigate(); // React Routerのナビゲーション

  // QRコード読み取り成功時の処理
  const handleScan = async (result) => {
    if (result) {
      const scannedText = result.text;
      setData(scannedText); // 結果を更新

      // ユーザーがログインしている場合にポイントを追加
      const user = auth.currentUser;
      if (user) {
        await updatePoints(user.uid); // ポイントを更新
      }

      // 効果音を再生
      Sound();

      // QRコードが読み込まれたらホーム画面に遷移
      navigate('/');
    }
  };

  // Firestoreのポイントを更新する関数
  const updatePoints = async (uid) => {
    try {
      const userRef = doc(db, 'user', uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const currentPoints = userDoc.data().points || 0;
        const newPoints = Math.min(currentPoints + 1, 10); // 最大10ポイントまで

        await updateDoc(userRef, { points: newPoints });
        console.log(`ポイントが更新されました: ${newPoints}`);
      } else {
        console.error('ユーザーデータが存在しません');
      }
    } catch (err) {
      console.error('ポイント更新中にエラーが発生しました:', err);
    }
  };

  const Sound = () => {
    const audio = new Audio('ラッパのファンファーレ.mp3'); // 音声ファイルのパス
    audio.play().catch((error) => {
      console.error('音声再生に失敗しました:', error);
    });
  };

  // 読み取りエラーの処理
  const handleError = (err) => {
    console.error(err); // エラーをコンソールに表示
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Header/>
      <h2>QRコードをスキャンしてください</h2>

      <div className="qrReader">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              handleScan(result);
            }
            if (!!error) {
              handleError(error);
            }
          }}
          constraints={{ facingMode }} // facingModeを利用してカメラの向きを設定
          style={{ width: '300px', margin: '0 auto' }}
        />
      </div>

      <p className="result">スキャン結果: {data}</p>
    </div>
  );
};

export default QrScanner;

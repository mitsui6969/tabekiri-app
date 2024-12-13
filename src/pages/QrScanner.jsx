import React, { useEffect, useRef, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';

export const QrScanner = ({ addStamp }) => {
  const [data, setData] = useState('No result'); // QRコードの結果を格納するステート
  const [device, setDevices] = useState([]); // 利用可能なデバイス一覧
  const [selectedDeviceId, setSelectedDeviceId] = useState(''); // 選択されたカメラID
  const navigate = useNavigate(); // React Routerのナビゲーション
  const videoRef = useRef(null);

  // デバイス一覧を取得
  const getDevices = async () => {
    try {
      const mediaDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = mediaDevices.filter(
        (device) => device.kind === 'videoinput'
      );
      setDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId); // デフォルトは最初のカメラ
      }
    } catch (err) {
      console.error('デバイスの取得に失敗しました:', err);
    }
  };

  // カメラストリームを開始
  const startStream = async () => {
    if (!selectedDeviceId) return;
    try {
      const constraints = {
        video: {
          deviceId: { exact: selectedDeviceId }, // 選択されたカメラIDを設定
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('ストリームの開始に失敗しました:', err);
    }
  };

  useEffect(() => {
    getDevices(); // コンポーネントのマウント時にデバイス一覧を取得
  }, []);

  useEffect(() => {
    startStream(); // カメラデバイスが変更されたらストリームを開始
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop()); // 前のストリームを停止
      }
    };
  }, [selectedDeviceId]);

  // QRコード読み取り成功時の処理
  const handleScan = (result) => {
    if (result) {
      const scannedText = result.text;
      setData(scannedText); // 結果を更新

      // 効果音を再生
      const audio = new Audio('ラッパのファンファーレ.mp3');
      audio.play().catch((error) =>
        console.error('音声再生に失敗しました:', error)
      );

      // スタンプを1つ追加
      addStamp();

      // QRコードが読み込まれたらホーム画面に遷移
      navigate('/');
    }
  };

  const handleError = (err) => {
    console.error('QRコード読み取りエラー:', err);
  };

  useEffect(() => {
    getDevices();
  }, )

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>QRコードをスキャンしてください</h2>

      {/* QRコードリーダー */}
      <div>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              handleScan(result);
            }
            if (!!error) {
              handleError(error);
            }
          }}
          constraints={{
            video: { deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined },
          }}
          style={{ width: '300px', margin: '0 auto' }}
        />

      </div>

      <p>スキャン結果: {data}</p>
    </div>
  );
};

export default QrScanner;

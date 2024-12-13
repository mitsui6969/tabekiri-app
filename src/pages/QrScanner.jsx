import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';

export const QrScanner = ({ addStamp }) => {
  const [data, setData] = useState('No result'); // QRコードの結果を格納するステート
  const [devices, setDevices] = useState([]); // 利用可能なデバイス一覧
  const [selectedDeviceId, setSelectedDeviceId] = useState(''); // 現在選択中のカメラID
  const [isFrontCamera, setIsFrontCamera] = useState(true); // カメラの向き（内カメラ:true, 外カメラ:false）を管理
  const navigate = useNavigate(); // React Routerのナビゲーション

  // デバイス一覧を取得
  const getDevices = async () => {
    try {
      const mediaDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = mediaDevices.filter(
        (device) => device.kind === 'videoinput'
      );
      setDevices(videoDevices);

      // 初期値を設定（内カメラ優先）
      if (videoDevices.length > 0) {
        const frontCamera = videoDevices.find((device) =>
          device.label.toLowerCase().includes('front')
        );
        const defaultCameraId = frontCamera
          ? frontCamera.deviceId
          : videoDevices[0].deviceId;
        setSelectedDeviceId(defaultCameraId);
        setIsFrontCamera(!!frontCamera);
      }
    } catch (err) {
      console.error('デバイスの取得に失敗しました:', err);
    }
  };

  // カメラの切り替え
  const toggleCamera = () => {
    if (devices.length === 0) return;

    const nextCamera = isFrontCamera
      ? devices.find((device) => device.label.toLowerCase().includes('back')) // 外カメラを探す
      : devices.find((device) => device.label.toLowerCase().includes('front')); // 内カメラを探す

    if (nextCamera) {
      setSelectedDeviceId(nextCamera.deviceId);
      setIsFrontCamera(!isFrontCamera);
    }
  };

  useEffect(() => {
    getDevices(); // コンポーネントのマウント時にデバイス一覧を取得
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>QRコードをスキャンしてください</h2>

      {/* カメラ切り替えボタン */}
      <div style={{ marginBottom: '10px' }}>
        <button
          onClick={toggleCamera}
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          カメラを{isFrontCamera ? '外' : '内'}カメラに切り替える
        </button>
      </div>

      {/* QRコードリーダー */}
      <div>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              const scannedText = result.text;
              setData(scannedText);

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
            if (!!error) {
              console.error('QRコード読み取りエラー:', error);
            }
          }}
          constraints={{
            video: {
              deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
            },
          }}
          style={{ width: '300px', margin: '0 auto' }}
        />
      </div>

      <p>スキャン結果: {data}</p>
    </div>
  );
};

export default QrScanner;
import { useEffect, useRef } from 'react';

export const MapComponent = () => {
  const mapRef = useRef(null); // 地図のDOMを参照するためのRef

  useEffect(() => {
    // 地図が表示されるまで処理を待機
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 36.5946, lng: 136.6173 }, // 金沢工業大学（野々市）の緯度経度を設定
        zoom: 15, // ズームレベル（大学周辺が見える程度）
      });

      // 金沢工業大学（野々市）のマーカーを設定
      const marker = new google.maps.Marker({
        position: { lat: 36.5946, lng: 136.6173 },
        map: map,
        title: '金沢工業大学（野々市キャンパス）',
      });
    }
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default MapComponent;
  
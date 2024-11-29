import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css"; // 必要ならカスタムCSSを作成

const mymap = () => {
  // 地図の中心位置 (緯度, 経度)
  const position = [35.6895, 139.6917]; // 東京

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={position} // 地図の中心位置
        zoom={13}         // ズームレベル
        style={{ height: "100%", width: "100%" }} // 地図のサイズ
      >
        {/* OSMの地図タイルを表示 */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* マーカーを配置 */}
        <Marker position={position}>
          <Popup>ここは東京です！</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default mymap;

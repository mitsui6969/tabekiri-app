import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "./Mm1.css";
import Header from '../components/Header/header';

export const Mm1 = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [watchId, setWatchId] = useState(0);
  const [accuracy, setAccuracy] = useState('__');

  // Custom icons for markers
  const redIcon = L.icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const greenIcon = L.icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // Function to add predefined markers (加盟店)
  const drawMark = (coordinates, name, address) => {
    const text = `
      <b>${name}</b><br>
      住所: ${address}<br>
      座標: ${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}
    `;
    L.marker(coordinates, { icon: greenIcon }).addTo(map).bindPopup(text).openPopup();
  };

  // Initialize the map
  const initMap = () => {
    if (!mapRef.current) return;

    const mapInstance = L.map(mapRef.current).setView([35.360631, 138.727307], 13);

    // Add scale and tile layer
    L.control.scale({ maxWidth: 200, position: 'bottomleft', imperial: false }).addTo(mapInstance);
    const gsi = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
      attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>",
    });
    gsi.addTo(mapInstance);

    setMap(mapInstance);
  };

  // Add加盟店 markers once the map is initialized
  useEffect(() => {
    if (map) {
      drawMark({ lat: 36.530105, lng: 136.629286 }, 'KIT 学食', '石川県野々市市扇が丘7-1');
      drawMark({ lat: 36.572162427156194, lng: 136.64797949391553 }, 'フードバンクいしかわ', '金沢市芳斉2丁目13-12');
      drawMark({ lat: 36.40053494326456, lng: 136.47417698345168 }, 'フードバンク小松', '小松市打越町丙106－3');
    }
  }, [map]);

  // Monitor current position
  const monitorPosition = (position) => {
    const { latitude, longitude, accuracy } = position.coords;
    setAccuracy(accuracy.toFixed(0));

    const markerPosition = new L.LatLng(latitude, longitude);
    const markerText = `現在地: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

    // Add current position marker
    L.marker(markerPosition, { icon: redIcon }).addTo(map).bindPopup(markerText).openPopup();
    map.setView(markerPosition);
  };

  // Handle location errors
  const handleError = (error) => {
    console.warn(`ERROR(${error.code}): ${error.message}`);
  };

  // Toggle location monitoring
  const togglePositionMonitoring = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(0);
    } else {
      const options = {
        enableHighAccuracy: true,
        timeout: 50000,
        maximumAge: 0,
      };
      const id = navigator.geolocation.watchPosition(monitorPosition, handleError, options);
      setWatchId(id);
    }
  };

  useEffect(() => {
    if (!map) {
      initMap();
    }
  }, [map]);

  return (
    <div className='map-page'>
      <Header/>
      <div className="controls">
        <span className="title">現在地確認</span>
        <button className="toggle-button" onClick={togglePositionMonitoring}>
          {watchId ? '測定停止' : '測定開始'}
        </button>
        精度: <span className="accuracy">{accuracy}</span>m
      </div>
      <div id="mapDiv" ref={mapRef} style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default Mm1;

import React from 'react';
import QrScanner from './QrScanner';
import Header from '../components/Header/header';

function App() {
  return (
    <div className = "App">
      <Header/>
      <h1>QRコードリーダー</h1>
      <QrScanner />
    </div>
  );
}

export default App;

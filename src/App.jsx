
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css'
import { Home } from "./pages/Home"
import { LoginOrSignup } from './pages/LoginOrSignup'
import { Login } from './pages/login'
import { Signup } from './pages/Signup'
import { Header } from './components/Header/header'
import { Footer } from './components/footer/footer'
import { QrScanner }  from './pages/QrScanner'
import { Inquiry } from './pages/Inquiry'
import { PointCard } from './components/PointCard/pointCard';


function App() {
  const [stampCount, setStampCount] = useState(() => {
    // localStorageから初期値を取得
    const savedCount = localStorage.getItem('stampCount');
    return savedCount ? parseInt(savedCount, 10) : 0;  }
  ); 

  useEffect(() => {
    localStorage.setItem('stampCount', stampCount);
  }, [stampCount]);
    
  // スタンプを1つ追加する関数
  const addStamp = () => {
    setStampCount((prevCount) => Math.min(prevCount + 1, 10));
  }

  return (

    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/LoginOrSignup" element={<LoginOrSignup/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/QRcode" element={<QrScanner/>} />
        <Route path='/' element={<QrScanner addStamp={addStamp} />} />
        <Route path='/PointCard' element={<PointCard stampCount={stampCount}/>} />
        <Route path="/Inquiry" element={<Inquiry/>} />
      </Routes>
      <Footer/>
    </Router>
  )
}
export default App;

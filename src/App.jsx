
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css'
import { Home } from "./pages/Home"
import { LoginOrSignup } from './pages/LoginOrSignup'
import { Login } from './pages/login'
import { Signup } from './pages/Signup'
import { Header } from './components/Header/header'
import { Footer } from './components/footer/footer'
<<<<<<< HEAD
import { QrScanner }  from './pages/QrScanner'
=======
import { QrScanner } from "./pages/QrScanner";
>>>>>>> 3890dc0b7c664fb2e6163b0edf3b29860a4b5415



function App() {
  const [stampCount, setStampCount] = useState(() => {
    // localStorageから初期値を取得
    const savedCount = localStorage.getItem('stampCount')
    return savedCount ? parseInt(savedCount, 10) : 0;
  })

  // スタンプ数をlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('stampCount', stampCount)
  }, [stampCount]);

  // スタンプを1つ追加する関数
  const addStamp = () => {
    setStampCount((prevCount) => prevCount + 1);
  };

  return (

    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/LoginOrSignup" element={<LoginOrSignup/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/QRcode" element={<QrScanner/>} />
      </Routes>
      <Footer/>
    </Router>
  )
}
export default App

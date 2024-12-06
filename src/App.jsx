
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

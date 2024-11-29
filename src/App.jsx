
import React, { useState } from 'react';
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
  const [stampCount, setStampCount] = useState(0); // スタンプ数の状態

  // スタンプを1つ追加する関数
  const addStamp = () => {
    setStampCount((prevCount) => prevCount + 1);
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
        <Route path='../components/PointCard' element={<Home stampCount={stampCount}/>} />
      </Routes>
      <Footer/>
    </Router>
  )
}
export default App

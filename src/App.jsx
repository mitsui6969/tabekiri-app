
import React from 'react';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css'
import { Home } from "./pages/Home"
import { LoginOrSignup } from './pages/LoginOrSignup'
import { Login } from './pages/login'
import { Signup } from './pages/Signup'
import { Header } from './components/Header/header'
import { Footer } from './components/footer/footer'
import { QrScanner }  from './pages/QrScanner'
import Inquiry from "./pages/Inquiry";



function App() {

  return (

    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/LoginOrSignup" element={<LoginOrSignup/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/QRcode" element={<QrScanner/>} />
        <Route path="/Inquiry" element={<Inquiry/>} />
      </Routes>
      <Footer/>
    </Router>
  )
}
export default App

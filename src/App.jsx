import React from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css'
import { Header } from './components/Header/header'
import { Home } from "./pages/Home"
import { Login } from './pages/login'
import { BlueBotton } from './pages/BlueBotton'
import QrScanner  from './pages/QrScanner'
import { mymap } from './mymap'


function App() {

  return (
    

    <Router>  
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/bluebutton" element={<BlueBotton/>} />
        <Route path="/QRcode" element={<QrScanner/>} />
        <Route path="/mymap" element={<Mymap/>} />

      </Routes>
    </Router>
    
  )
}
export default App

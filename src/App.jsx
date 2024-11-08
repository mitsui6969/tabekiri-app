import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css'
import { Header } from './components/Header/header'
import { Home } from "./pages/Home"
import { Login } from './pages/login'
import { BlueBotton } from './pages/BlueBotton'
import { Footer } from './components/footer/footer'


function App() {

  return (
    <Router>
      <Header/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/bluebutton" element={<BlueBotton/>} />
      </Routes>

      <Footer/>
    </Router>
  )
}

export default App

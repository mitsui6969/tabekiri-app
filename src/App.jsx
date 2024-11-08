import {BrowserRouter as Router, Route, Routes } from "react-router-dom"

import './App.css'
import { Header } from './components/Header/header'
import { Home } from "./pages/Home"
import { LoginOrSignup } from './pages/LoginOrSignup'
import { Login } from './pages/login'
import { Signup } from './pages/Signup'
import { BlueBotton } from './pages/BlueBotton'



function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/LoginOrSignup" element={<LoginOrSignup/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/bluebutton" element={<BlueBotton/>} />

      </Routes>
    </Router>
  )
}
export default App

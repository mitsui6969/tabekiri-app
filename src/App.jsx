import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home.jsx"
import { Login } from "./pages/Login.jsx"


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App

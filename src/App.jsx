import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home.jsx"
import {login} from "./pages/login.jsx"


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<login/>} />
      </Routes>
    </Router>
  )
}

export default App

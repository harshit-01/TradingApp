import './App.css';
import { Routes, Route } from "react-router-dom";
import Signup from "./components/signup.js"
import Home from "./components/home.js"
import Login from "./components/login.js"
import Profile from "./components/profile.js"
import MyPortfolio from './components/myPortfolio.js'
import Trade from "./components/trade.js"

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Signup />}/>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="myPortfolio" element={<MyPortfolio />} />
          <Route path="trade" element={<Trade />} />
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;

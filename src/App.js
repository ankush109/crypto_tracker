import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Coindetails from "./components/Coindetails";
import Exchange from "./components/Exchange";
import Coins from "./components/Coins";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/exchanges" element={<Exchange />} />
        <Route path="/coins/:id" element={<Coindetails />} />
      </Routes>
    </Router>
  );
}
export default App;

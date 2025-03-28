import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyFiles from "./Components/MyFiles";
import MyHistory from "./Components/MyHistory";
import Navbar from "./Components/NavBar";
import Home from "./Components/Home";
import TakeFile from "./Components/TakeFile";
import QRTransfer from "./Components/QRTransfer";
import SeatTransfer from "./Components/SeatTransfer";
import Login from "./Components/Login";

function App() {
  return (
    <Router>
      <div className="flex">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Login />} /> {/* Default Login Page */}
            <Route path="/home" element={<Home />} /> {/* Home Page after Login */}
            <Route path="/track" element={<h1>Track File Page</h1>} />
            <Route path="/my-files" element={<MyFiles />} />
            <Route path="/take-file" element={<TakeFile />} />
            <Route path="/transfer-file/qr" element={<QRTransfer />} />
            <Route path="/transfer-file/seat" element={<SeatTransfer />} />
            <Route path="/my-history" element={<MyHistory />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

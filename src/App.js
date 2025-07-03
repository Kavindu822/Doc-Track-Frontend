import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyFiles from "./Components/MyFiles";
import MyProfile from "./Components/MyProfile";
import MyHistory from "./Components/MyHistory";
import Files from "./Components/Files";
import Home from "./Components/Home";
import TakeFile from "./Components/TakeFile";
import QRTransfer from "./Components/QRTransfer";
import GenerateQR from "./Components/GenerateQR";
import SeatTransfer from "./Components/SeatTransfer";
import Login from "./Components/Login";
import AdminDashboard from "./Components/AdminDashboard";
import Dyeing from "./Components/Dyeing";
import DyeingI from "./Components/DyeingI";
import SignUp from "./Components/SignUp";
import Admin from "./Components/Admin";
import Quality from "./Components/Quality";
import FileHistory from "./Components/FileHistory";
import AddFiles from "./Components/AddFiles";
import Pending from "./Components/Pending"; // or adjust the path as needed
import ForgotPassword from "./Components/ForgotPassword"; // Adjust the path as needed
import AdminProfile from "./Components/AdminProfile";

function App() {
  return (
    <Router>
      <div className="flex">
        <div className="flex-1">
          <Routes>
            {/* Public Route for Login */}
            <Route path="/" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-dashboard/files" element={<Files />} />
            <Route path="/admin-dashboard/employee" element={<Dyeing />} />
            <Route path="/admin-dashboard/add-files" element={<AddFiles />} />
            <Route
              path="/admin-dashboard/generateQR"
              element={<GenerateQR />}
            />
            <Route
              path="/admin-dashboard/employee/dyeing"
              element={<Dyeing />}
            />
            <Route
              path="/admin-dashboard/employee/quality"
              element={<Quality />}
            />
            <Route
              path="/admin-dashboard/employee/dyeingI"
              element={<DyeingI />}
            />
            <Route path="/admin-dashboard/admin" element={<Admin />} />
            <Route path="/admin-dashboard/transfer-file" element={<Admin />} />
            <Route path="/admin-dashboard/generateQR" element={<Admin />} />

            <Route
              path="/admin-dashboard/transfer-file/qr"
              element={<QRTransfer />}
            />
            <Route
              path="/admin-dashboard/transfer-file/seat"
              element={<SeatTransfer />}
            />
            <Route
              path="/admin-dashboard/file-history"
              element={<FileHistory />}
            />
            <Route
              path="/admin-dashboard/admin-profile"
              element={<AdminProfile />}
            />

            {/* ✅ Pending Employees Route */}
            <Route path="/admin-dashboard/pending" element={<Pending />} />

            {/* Other Routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/my-files" element={<MyFiles />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/take-file" element={<TakeFile />} />
            <Route path="/my-history" element={<MyHistory />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

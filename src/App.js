import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyFiles from "./Components/MyFiles";
import MyHistory from "./Components/MyHistory";
import Files from "./Components/Files";
import Home from "./Components/Home";
import TakeFile from "./Components/TakeFile";
import QRTransfer from "./Components/QRTransfer";
import SeatTransfer from "./Components/SeatTransfer";
import Login from "./Components/Login";
import AdminDashboard from "./Components/AdminDashboard";
import Deying from "./Components/Deying";
import SignUp from "./Components/SignUp";
import Admin from "./Components/Admin";
import Quality from "./Components/Quality";
import FileHistory from "./Components/FileHistory";
import AddFiles from "./Components/AddFiles";
import Pending from "./Components/Pending"; // or adjust the path as needed
import ForgotPassword from "./Components/ForgotPassword"; // Adjust the path as needed

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
            <Route path="/admin-dashboard/employee" element={<Deying />} />
            <Route path="/admin-dashboard/add-files" element={<AddFiles />} />
            <Route
              path="/admin-dashboard/employee/deying"
              element={<Deying />}
            />
            <Route
              path="/admin-dashboard/employee/quality"
              element={<Quality />}
            />
            <Route path="/admin-dashboard/admin" element={<Admin />} />
            <Route path="/admin-dashboard/transfer-file" element={<Admin />} />
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

            {/* ✅ Pending Employees Route */}
            <Route path="/admin-dashboard/pending" element={<Pending />} />

            {/* Other Routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/my-files" element={<MyFiles />} />
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

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MyFiles from "./Components/MyFiles";
// import MyHistory from "./Components/MyHistory";
// import Navbar from "./Components/NavBar";
// import Files from "./Components/Files";
// import Home from "./Components/Home";
// import TakeFile from "./Components/TakeFile";
// import QRTransfer from "./Components/QRTransfer";
// import SeatTransfer from "./Components/SeatTransfer";
// import Login from "./Components/Login";
// import AdminDashboard from "./Components/AdminDashboard";
// import Deyin from "./Components/Deyin";
// import SignUp from "./Components/SignUp";
// import Admin from "./Components/Admin";
// import FileHistory from "./Components/FileHistory"; // Assuming you have this component
// import { ArrowUpFromDotIcon } from "lucide-react";

// function App() {
//   return (
//     <Router>
//       <div className="flex">
//         <div className="flex-1">
//           <Routes>
//             {/* Public Route for Login */}
//             <Route path="/" element={<Login />} />
//             {/* Admin Routes */}
//             <Route path="/admin-dashboard" element={<AdminDashboard />} />
//             <Route path="/admin-dashboard/files" element={<Files />} />
//             <Route path="/admin-dashboard/employee" element={<Deyin />} />
//             <Route
//               path="/admin-dashboard/employee/deying"
//               element={<Deyin />}
//             />
//             <Route
//               path="/admin-dashboard/employee/quality"
//               element={<Deyin />}
//             />{" "}
//             {/* Update with appropriate component */}
//             <Route path="/admin-dashboard/admin" element={<Admin />} />
//             <Route
//               path="/admin-dashboard/transfer-file"
//               element={<Admin />}
//             />{" "}
//             {/* Update with proper component if needed */}
//             <Route
//               path="/admin-dashboard/transfer-file/qr"
//               element={<QRTransfer />}
//             />
//             <Route
//               path="/admin-dashboard/transfer-file/seat"
//               element={<SeatTransfer />}
//             />
//             <Route
//               path="/admin-dashboard/file-history"
//               element={<FileHistory />}
//             />
//             {/* Other Routes */}
//             <Route path="/my-files" element={<MyFiles />} />
//             <Route path="/take-file" element={<TakeFile />} />
//             <Route path="/my-history" element={<MyHistory />} />
//             <Route path="/signup" element={<SignUp />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

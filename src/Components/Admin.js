// import React, { useState, useEffect } from "react";
// import AdminNavbar from "./AdminNavbar";
// import axios from "axios";
// import { AiOutlineSearch } from "react-icons/ai";

// const Admin = () => {
//   const [employees, setEmployees] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);

//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [resetModalOpen, setResetModalOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [temporaryPassword, setTemporaryPassword] = useState("");

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const token = localStorage.getItem("jwtToken"); // Replace with sessionStorage if needed

//         const res = await axios.get(`/api/UserAccounts/admins`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setEmployees(res.data);
//         setFiltered(res.data);
//       } catch (err) {
//         setError("Failed to load employees.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   useEffect(() => {
//     const lower = search.toLowerCase();
//     const results = employees.filter(
//       (e) =>
//         e.epfNo.toLowerCase().includes(lower) ||
//         e.eName.toLowerCase().includes(lower) ||
//         (e.seatNo && e.seatNo.toLowerCase().includes(lower))
//     );
//     setFiltered(search.trim() === "" ? employees : results);
//   }, [search, employees]);

//   const totalPages = Math.ceil(filtered.length / itemsPerPage);
//   const currentItems = filtered.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePageChange = (page) => setCurrentPage(page);

//   const handleDelete = async () => {
//     if (!selectedEmployee) return;

//     try {
//       await axios.delete(`/api/UserAccounts/delete/${selectedEmployee.epfNo}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
//         },
//       });
//       setEmployees((prev) =>
//         prev.filter((emp) => emp.epfNo !== selectedEmployee.epfNo)
//       );
//       setFiltered((prev) =>
//         prev.filter((emp) => emp.epfNo !== selectedEmployee.epfNo)
//       );
//       setDeleteModalOpen(false);
//     } catch (err) {
//       alert("Failed to delete employee.");
//     }
//   };

//   const handleResetPassword = async () => {
//     if (!selectedEmployee || !temporaryPassword) return;

//     try {
//       await axios.post(
//         `/api/UserAccounts/admin-reset-password`,
//         {
//           epfNo: selectedEmployee.epfNo,
//           temporaryPassword,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       alert("Password reset successful.");
//       setResetModalOpen(false);
//       setTemporaryPassword("");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to reset password.");
//     }
//   };

//   return (
//     <div className="flex flex-col sm:flex-row h-screen bg-primaryBg">
//       <AdminNavbar />
//       <div className="relative flex flex-col w-full h-screen pt-16 sm:pt-0">
//         <div
//           className="absolute inset-0 bg-cover bg-center before:absolute before:inset-0 before:bg-black before:opacity-50"
//           style={{ backgroundImage: "url('/bg.jpg')" }}
//         ></div>

//         {/* Search */}
//         <div className="relative z-10 p-4 flex justify-center">
//           <div className="flex items-center w-full max-w-lg bg-white bg-opacity-90 rounded-full px-4 py-2 shadow-md">
//             <AiOutlineSearch className="text-gray-600 text-xl mr-2" />
//             <input
//               type="text"
//               placeholder="Search Admin"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full bg-transparent outline-none text-gray-800 font-semibold placeholder-gray-500"
//             />
//           </div>
//         </div>

//         {/* Content */}
//         <div className="relative z-10 flex-1 overflow-y-auto px-4 pb-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
//           {loading ? (
//             <p className="text-white text-center mt-10">Loading...</p>
//           ) : error ? (
//             <p className="text-red-500 text-center mt-10">{error}</p>
//           ) : filtered.length === 0 ? (
//             <p className="text-gray-300 text-center mt-10">No admins found.</p>
//           ) : (
//             <div className="flex flex-col items-center">
//               {/* Admin List */}
//               <div className="w-full max-w-3xl space-y-3 mt-4">
//                 {currentItems.map((emp, idx) => (
//                   <div
//                     key={idx}
//                     className="flex flex-col sm:flex-row justify-between items-center bg-[#0b4b61] bg-opacity-80 text-white px-4 py-3 rounded-md shadow-md space-y-2 sm:space-y-0"
//                   >
//                     <div className="text-center sm:text-left w-full sm:w-auto text-sm sm:text-base font-semibold">
//                       {emp.eName} - {emp.epfNo} - {emp.seatNo || "N/A"} -{" "}
//                       {emp.contactNo}
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => {
//                           setSelectedEmployee(emp);
//                           setDeleteModalOpen(true);
//                         }}
//                         className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-bold"
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={() => {
//                           setSelectedEmployee(emp);
//                           setResetModalOpen(true);
//                         }}
//                         className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-sm font-bold"
//                       >
//                         Reset
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Pagination */}
//               <div className="mt-4 flex flex-wrap justify-center gap-2">
//                 {Array.from({ length: totalPages }, (_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handlePageChange(index + 1)}
//                     className={`px-4 py-2 rounded-full ${
//                       currentPage === index + 1
//                         ? "bg-[#007d9c] text-white"
//                         : "bg-white text-black"
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Delete Modal */}
//         {deleteModalOpen && selectedEmployee && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
//             <div className="bg-white p-5 rounded-lg w-full max-w-md">
//               <h3 className="text-lg font-bold mb-4">
//                 Delete {selectedEmployee.eName}?
//               </h3>
//               <div className="flex justify-between">
//                 <button
//                   onClick={() => setDeleteModalOpen(false)}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className="px-4 py-2 bg-red-600 text-white rounded-md"
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Reset Modal */}
//         {resetModalOpen && selectedEmployee && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
//             <div className="bg-white p-5 rounded-lg w-full max-w-md">
//               <h3 className="text-lg font-bold mb-4">
//                 Reset Password for {selectedEmployee.eName}
//               </h3>
//               <input
//                 type="password"
//                 placeholder="Enter temporary password"
//                 value={temporaryPassword}
//                 onChange={(e) => setTemporaryPassword(e.target.value)}
//                 className="w-full p-2 mb-4 border border-gray-300 rounded-md"
//               />
//               <div className="flex justify-between">
//                 <button
//                   onClick={() => {
//                     setResetModalOpen(false);
//                     setTemporaryPassword("");
//                   }}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleResetPassword}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md"
//                 >
//                   OK
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Admin;

import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import "../App.css"; // Make sure custom-scrollbar is in here

const Admin = () => {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [temporaryPassword, setTemporaryPassword] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/UserAccounts/admins`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEmployees(res.data);
        setFiltered(res.data);
      } catch (err) {
        setError("Failed to load employees.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    const results = employees.filter(
      (e) =>
        e.epfNo.toLowerCase().includes(lower) ||
        e.eName.toLowerCase().includes(lower) ||
        (e.seatNo && e.seatNo.toLowerCase().includes(lower))
    );
    setFiltered(search.trim() === "" ? employees : results);
  }, [search, employees]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const handleDelete = async () => {
    if (!selectedEmployee) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/UserAccounts/delete/${selectedEmployee.epfNo}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      setEmployees((prev) =>
        prev.filter((emp) => emp.epfNo !== selectedEmployee.epfNo)
      );
      setFiltered((prev) =>
        prev.filter((emp) => emp.epfNo !== selectedEmployee.epfNo)
      );
      setDeleteModalOpen(false);
    } catch (err) {
      alert("Failed to delete employee.");
    }
  };

  const handleResetPassword = async () => {
    if (!selectedEmployee || !temporaryPassword) return;

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/UserAccounts/admin-reset-password`,
        {
          epfNo: selectedEmployee.epfNo,
          temporaryPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Password reset successful.");
      setResetModalOpen(false);
      setTemporaryPassword("");
    } catch (err) {
      alert("Failed to reset password.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-primaryBg">
      <AdminNavbar />
      <div className="relative flex flex-col w-full h-screen pt-16 sm:pt-0">
        <div
          className="absolute inset-0 bg-cover bg-center before:absolute before:inset-0 before:bg-black before:opacity-50"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>

        {/* Search */}
        <div className="relative z-10 p-4 flex justify-center">
          <div className="flex items-center w-full max-w-lg bg-white bg-opacity-90 rounded-full px-4 py-2 shadow-md">
            <AiOutlineSearch className="text-gray-600 text-xl mr-2" />
            <input
              type="text"
              placeholder="Search Admin"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-800 font-semibold placeholder-gray-500"
            />
          </div>
        </div>

        {/* Content with custom scrollbar */}
        <div className="relative z-10 flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar">
          {loading ? (
            <p className="text-white text-center mt-10">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center mt-10">{error}</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-300 text-center mt-10">No admins found.</p>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-full max-w-3xl space-y-3 mt-4">
                {currentItems.map((emp, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row justify-between items-center bg-[#0b4b61] bg-opacity-80 text-white px-4 py-3 rounded-md shadow-md space-y-2 sm:space-y-0"
                  >
                    <div className="text-center sm:text-left w-full sm:w-auto text-sm sm:text-base font-semibold">
                      {emp.eName} - {emp.epfNo} - {emp.seatNo || "N/A"} -{" "}
                      {emp.contactNo}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedEmployee(emp);
                          setDeleteModalOpen(true);
                        }}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-bold"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEmployee(emp);
                          setResetModalOpen(true);
                        }}
                        className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-sm font-bold"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded-full ${
                      currentPage === index + 1
                        ? "bg-[#007d9c] text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Delete Modal */}
        {deleteModalOpen && selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
            <div className="bg-white p-5 rounded-lg w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">
                Delete {selectedEmployee.eName}?
              </h3>
              <div className="flex justify-between">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reset Modal */}
        {resetModalOpen && selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
            <div className="bg-white p-5 rounded-lg w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">
                Reset Password for {selectedEmployee.eName}
              </h3>
              <input
                type="password"
                placeholder="Enter temporary password"
                value={temporaryPassword}
                onChange={(e) => setTemporaryPassword(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setResetModalOpen(false);
                    setTemporaryPassword("");
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetPassword}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

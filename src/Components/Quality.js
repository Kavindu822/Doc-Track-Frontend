import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

const Quality = () => {
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
        const res = await axios.get(
          "/api/UserAccounts/employees-by-department/Quality",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );
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
        (e.epfNo && e.epfNo.toLowerCase().includes(lower)) ||
        (e.eName && e.eName.toLowerCase().includes(lower))
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
      await axios.delete(`/api/UserAccounts/delete/${selectedEmployee.epfNo}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        `/api/UserAccounts/admin-reset-password`,
        {
          epfNo: selectedEmployee.epfNo,
          temporaryPassword: temporaryPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      alert("Password reset successful.");
      setResetModalOpen(false);
    } catch (err) {
      alert("Failed to reset password.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-primaryBg">
      <AdminNavbar />
      <div className="relative flex flex-col flex-1">
        <div
          className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>

        <div className="relative z-10 p-4">
          {/* Search */}
          <div className="max-w-md mx-auto mb-4">
            <div className="flex items-center bg-white bg-opacity-90 rounded-full px-4 py-2 shadow-md">
              <AiOutlineSearch className="text-gray-600 text-xl mr-2" />
              <input
                type="text"
                placeholder="Search Employee"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500 font-semibold"
              />
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(100vh-150px)] px-2">
            {loading ? (
              <p className="text-white text-center">Loading...</p>
            ) : error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : filtered.length === 0 ? (
              <p className="text-gray-300 text-center">No employees found.</p>
            ) : (
              <div className="space-y-3 max-w-3xl mx-auto">
                {currentItems.map((emp, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:justify-between items-center bg-[#0b4b61] bg-opacity-80 text-white px-4 py-2 rounded-md shadow-md"
                  >
                    <div className="text-center sm:text-left font-semibold">
                      {emp.eName} - {emp.epfNo} - {emp.seatNo || "N/A"} -{" "}
                      {emp.contactNo}
                    </div>
                    <div className="flex gap-2 mt-2 sm:mt-0">
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

                {/* Pagination */}
                <div className="flex flex-wrap justify-center mt-4 gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-4 py-1 rounded-full font-medium ${
                        currentPage === i + 1
                          ? "bg-[#007d9c] text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Delete Modal */}
        {deleteModalOpen && selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center px-2">
            <div className="bg-white p-5 rounded-lg w-full max-w-md space-y-4">
              <h3 className="text-lg font-semibold">
                Are you sure you want to delete{" "}
                <span className="text-red-600">{selectedEmployee.name}</span>?
              </h3>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reset Modal */}
        {resetModalOpen && selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center px-2">
            <div className="bg-white p-5 rounded-lg w-full max-w-md space-y-4">
              <h3 className="text-lg font-semibold">
                Reset Password for {selectedEmployee.name}
              </h3>
              <input
                type="password"
                placeholder="Enter temporary password"
                value={temporaryPassword}
                onChange={(e) => setTemporaryPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setResetModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetPassword}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
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

export default Quality;

// import React, { useState, useEffect } from "react";
// import AdminNavbar from "./AdminNavbar";
// import { AiOutlineSearch } from "react-icons/ai";
// import axios from "axios";

// const Quality = () => {
//   const [employees, setEmployees] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Manage modal visibility
//   const [resetModalOpen, setResetModalOpen] = useState(false); // Reset password modal visibility
//   const [selectedEmployee, setSelectedEmployee] = useState(null); // Store selected employee for deletion
//   const [temporaryPassword, setTemporaryPassword] = useState(""); // Temporary password input

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const res = await axios.get(
//           "/api/UserAccounts/employees-by-department/Quality",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
//             },
//           }
//         );
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
//         (e.epfNo && e.epfNo.toLowerCase().includes(lower)) || // Check if epfNo is defined
//         (e.eName && e.eName.toLowerCase().includes(lower))
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
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setEmployees(
//         employees.filter((emp) => emp.epfNo !== selectedEmployee.epfNo)
//       );
//       setFiltered(
//         filtered.filter((emp) => emp.epfNo !== selectedEmployee.epfNo)
//       );
//       setDeleteModalOpen(false); // Close the modal after deletion
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
//           temporaryPassword: temporaryPassword,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
//           },
//         }
//       );
//       alert("Password reset successful.");
//       setResetModalOpen(false); // Close the reset modal
//     } catch (err) {
//       alert("Failed to reset password.");
//     }
//   };

//   return (
//     <div className="flex h-screen bg-primaryBg">
//       <AdminNavbar />
//       <div className="relative flex flex-col w-full h-screen">
//         {/* Background */}
//         <div
//           className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
//           style={{ backgroundImage: "url('/bg.jpg')" }}
//         ></div>

//         {/* Search Bar */}
//         <div className="relative z-10 flex items-center justify-center p-4">
//           <div className="flex items-center w-full max-w-md bg-white bg-opacity-90 rounded-full px-4 py-2 shadow-md">
//             <AiOutlineSearch className="text-gray-600 text-xl mr-2" />
//             <input
//               type="text"
//               placeholder="Search Employee"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500 font-semibold"
//             />
//           </div>
//         </div>

//         {/* Content */}
//         <div className="relative z-10 w-full h-full px-4 pb-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
//           {loading ? (
//             <p className="text-white text-center">Loading...</p>
//           ) : error ? (
//             <p className="text-red-500 text-center">{error}</p>
//           ) : filtered.length === 0 ? (
//             <p className="text-gray-300 text-center">No employees found.</p>
//           ) : (
//             <div className="flex flex-col items-center">
//               {/* Employee Rows */}
//               <div className="shadow-lg mt-4 p-4 w-full max-w-3xl bg-black bg-opacity-50 rounded-lg space-y-3">
//                 {currentItems.map((emp, idx) => (
//                   <div
//                     key={idx}
//                     className="flex justify-between items-center bg-[#0b4b61] bg-opacity-80 text-white px-4 py-2 rounded-md shadow-md"
//                   >
//                     <div className="text-sm sm:text-base font-semibold text-center w-full">
//                       {emp.eName} - {emp.epfNo} - {emp.seatNo || "N/A"} -{" "}
//                       {emp.contactNo}
//                     </div>
//                     <button
//                       onClick={() => {
//                         setSelectedEmployee(emp);
//                         setDeleteModalOpen(true); // Open modal when delete button is clicked
//                       }}
//                       className="ml-4 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-bold"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => {
//                         setSelectedEmployee(emp);
//                         setResetModalOpen(true); // Open reset password modal
//                       }}
//                       className="ml-4 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-sm font-bold"
//                     >
//                       Reset
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               {/* Pagination */}
//               <div className="mt-4 flex flex-wrap gap-2 justify-center">
//                 {Array.from({ length: totalPages }, (_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handlePageChange(index + 1)}
//                     className={`px-4 py-2 rounded-full ${
//                       currentPage === index + 1
//                         ? "bg-[#007d9c] text-white"
//                         : "bg-white text-black"
//                     } text-white`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Delete Confirmation Modal */}
//         {deleteModalOpen && selectedEmployee && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
//             <div className="bg-white p-4 rounded-lg w-96">
//               <h3 className="text-xl mb-4">
//                 Are you sure you want to delete {selectedEmployee.name}?
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
//                   className="px-4 py-2 bg-red-500 text-white rounded-md"
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Reset Password Modal */}
//         {resetModalOpen && selectedEmployee && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
//             <div className="bg-white p-4 rounded-lg w-96">
//               <h3 className="text-xl mb-4">
//                 Reset Password for {selectedEmployee.name}
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
//                   onClick={() => setResetModalOpen(false)}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleResetPassword}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md"
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

// export default Quality;

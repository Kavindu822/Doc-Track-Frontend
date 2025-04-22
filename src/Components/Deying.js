// import React, { useState, useEffect } from "react";
// import AdminNavbar from "./AdminNavbar";
// import axios from "axios";

// const Deying = () => {
//   const [employees, setEmployees] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const res = await axios.get(
//           "/api/UserAccounts/employees-by-department/Deying",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
//             },
//           }
//         );

//         // Filter only approved employees
//         const approved = res.data.filter((emp) => emp.isApproved === true);
//         setEmployees(approved);
//         setFiltered(approved);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load employees.");
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   useEffect(() => {
//     if (search.trim() === "") {
//       setFiltered(employees);
//     } else {
//       const lower = search.toLowerCase();
//       const results = employees.filter(
//         (e) =>
//           e.epfNo.toLowerCase().includes(lower) ||
//           e.name.toLowerCase().includes(lower) ||
//           (e.seatNo && e.seatNo.toLowerCase().includes(lower))
//       );
//       setFiltered(results);
//     }
//   }, [search, employees]);

//   const handleDeleteClick = (emp) => {
//     setSelectedEmployee(emp); // Set the selected employee for deletion
//     setDeleteModalOpen(true); // Open the confirmation modal
//   };

//   const handleDelete = async () => {
//     if (!selectedEmployee) return;

//     const { epfNo } = selectedEmployee;

//     try {
//       await axios.delete(`/api/UserAccounts/delete/${epfNo}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setEmployees(employees.filter((e) => e.epfNo !== epfNo));
//       setFiltered(filtered.filter((e) => e.epfNo !== epfNo));
//       setDeleteModalOpen(false); // Close the modal after deletion
//     } catch (err) {
//       console.error("Delete failed", err);
//       alert("Delete failed. Please try again.");
//     }
//   };

//   const totalPages = Math.ceil(filtered.length / itemsPerPage);
//   const currentItems = filtered.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
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
//         <div className="z-10 relative mt-4 mb-4 w-full max-w-md mx-auto">
//           <input
//             type="text"
//             placeholder="Search Employee"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full p-3 pr-10 text-center border rounded-full text-secondaryText border-borderColor bg-white opacity-90 focus:ring-2 focus:ring-[#00a2cd] transition duration-200 truncate placeholder:text-sm placeholder:font-bold"
//           />
//         </div>

//         {/* Content */}
//         <div className="relative z-10 w-full h-full px-4 pb-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
//           {loading ? (
//             <p className="text-white text-center">Loading...</p>
//           ) : error ? (
//             <p className="text-red-500 text-center">{error}</p>
//           ) : filtered.length === 0 ? (
//             <p className="text-gray-300 text-center">
//               No approved employees found.
//             </p>
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
//                       onClick={() => handleDeleteClick(emp)} // Open the modal with the selected employee
//                       className="ml-4 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-bold"
//                     >
//                       Delete
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
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {deleteModalOpen && selectedEmployee && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
//           <div className="bg-white p-4 rounded-lg w-96">
//             <h3 className="text-xl mb-4">
//               Are you sure you want to delete {selectedEmployee.name}?
//             </h3>
//             <div className="flex justify-between">
//               <button
//                 onClick={() => setDeleteModalOpen(false)} // Close the modal without deleting
//                 className="px-4 py-2 bg-gray-500 text-white rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete} // Proceed with delete
//                 className="px-4 py-2 bg-red-500 text-white rounded-md"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Deying;

import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";

const Deying = () => {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [resetPasswordVisibleFor, setResetPasswordVisibleFor] = useState(null);
  const [tempPassword, setTempPassword] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          "/api/UserAccounts/employees-by-department/Deying",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );
        const approved = res.data.filter((emp) => emp.isApproved === true);
        setEmployees(approved);
        setFiltered(approved);
        setLoading(false);
      } catch (err) {
        setError("Failed to load employees.");
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFiltered(employees);
    } else {
      const lower = search.toLowerCase();
      const results = employees.filter(
        (e) =>
          e.epfNo.toLowerCase().includes(lower) ||
          e.name.toLowerCase().includes(lower) ||
          (e.seatNo && e.seatNo.toLowerCase().includes(lower))
      );
      setFiltered(results);
    }
  }, [search, employees]);

  const handleDeleteClick = (emp) => {
    setSelectedEmployee(emp);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedEmployee) return;
    const { epfNo } = selectedEmployee;
    try {
      await axios.delete(`/api/UserAccounts/delete/${epfNo}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEmployees(employees.filter((e) => e.epfNo !== epfNo));
      setFiltered(filtered.filter((e) => e.epfNo !== epfNo));
      setDeleteModalOpen(false);
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed. Please try again.");
    }
  };

  const handleResetPassword = async (emp) => {
    if (!tempPassword.trim()) {
      alert("Please enter a temporary password.");
      return;
    }

    try {
      await axios.post(
        "/api/UserAccounts/admin-reset-password",
        {
          epfNo: emp.epfNo,
          temporaryPassword: tempPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      alert(`Temporary password set for ${emp.eName}`);
      setResetPasswordVisibleFor(null);
      setTempPassword("");
    } catch (err) {
      console.error("Password reset failed", err);
      alert("Password reset failed. Please try again.");
    }
  };

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen bg-primaryBg">
      <AdminNavbar />
      <div className="relative flex flex-col w-full h-screen">
        <div
          className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>

        <div className="z-10 relative mt-4 mb-4 w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search Employee"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 pr-10 text-center border rounded-full text-secondaryText border-borderColor bg-white opacity-90 focus:ring-2 focus:ring-[#00a2cd] transition duration-200 truncate placeholder:text-sm placeholder:font-bold"
          />
        </div>

        <div className="relative z-10 w-full h-full px-4 pb-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
          {loading ? (
            <p className="text-white text-center">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-300 text-center">
              No approved employees found.
            </p>
          ) : (
            <div className="flex flex-col items-center">
              <div className="shadow-lg mt-4 p-4 w-full max-w-3xl bg-black bg-opacity-50 rounded-lg space-y-3">
                {currentItems.map((emp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center bg-[#0b4b61] bg-opacity-80 text-white px-4 py-2 rounded-md shadow-md">
                      <div className="text-sm sm:text-base font-semibold text-center w-full">
                        {emp.eName} - {emp.epfNo} - {emp.seatNo || "N/A"} -{" "}
                        {emp.contactNo}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() =>
                            setResetPasswordVisibleFor(
                              resetPasswordVisibleFor === emp.epfNo
                                ? null
                                : emp.epfNo
                            )
                          }
                          className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded text-sm font-bold text-white"
                        >
                          Reset
                        </button>
                        <button
                          onClick={() => handleDeleteClick(emp)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-bold text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {resetPasswordVisibleFor === emp.epfNo && (
                      <div className="mt-2 bg-white p-2 rounded-md shadow-md flex gap-2 items-center">
                        <input
                          type="text"
                          value={tempPassword}
                          onChange={(e) => setTempPassword(e.target.value)}
                          placeholder="Enter temporary password"
                          className="flex-1 p-2 border border-gray-300 rounded-md"
                        />
                        <button
                          onClick={() => handleResetPassword(emp)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-bold"
                        >
                          OK
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2 justify-center">
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
      </div>

      {deleteModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h3 className="text-xl mb-4">
              Are you sure you want to delete {selectedEmployee.name}?
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
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deying;

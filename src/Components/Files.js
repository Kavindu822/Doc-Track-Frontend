// import React, { useState, useEffect } from "react";
// import AdminNavbar from "./AdminNavbar";
// import { AiOutlineSearch, AiOutlineFilter } from "react-icons/ai";
// import axios from "axios";
// import "../App.css";

// import { jwtDecode } from "jwt-decode";

// const Files = () => {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("");
//   const [department, setDepartment] = useState(""); // ✅ No default
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const filesPerPage = 20;
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [transferModalOpen, setTransferModalOpen] = useState(false);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);

//   const fetchFilesByDepartment = async (dept) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `/api/RcodeFiles/files-by-department/${dept}`
//       );
//       setFiles(response.data);
//       setError(null);
//     } catch (err) {
//       setFiles([]);
//       setError("No files found for this department.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchEmployees = async (dept) => {
//     try {
//       const response = await axios.get(
//         `/api/UserAccounts/receive-employees/${dept}`
//       );
//       const simplifiedEmployees = response.data.map((emp) => ({
//         epfNo: emp.epfNo,
//         eName: emp.eName,
//         contactNo: emp.contactNo,
//       }));
//       setEmployees([
//         { epfNo: "Library", eName: "Library", contactNo: "N/A" },
//         ...simplifiedEmployees,
//       ]);
//     } catch (err) {
//       console.error("Failed to fetch employees:", err);
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("jwtToken");
//     if (token) {
//       const decoded = jwtDecode(token);
//       const userDept = decoded.Department;
//       setDepartment(userDept);
//       fetchFilesByDepartment(userDept);
//       fetchEmployees(userDept);
//     }
//   }, []);

//   const handleCheckboxChange = (file) => {
//     setSelectedFiles((prev) =>
//       prev.includes(file) ? prev.filter((f) => f !== file) : [...prev, file]
//     );
//   };

//   const handleDelete = async () => {
//     if (selectedFiles.length > 0) {
//       const rCodes = selectedFiles.map((f) => f.rcode);
//       try {
//         const response = await axios.delete(
//           `${process.env.REACT_APP_API_URL}/RcodeFiles`,
//           {
//             data: rCodes,
//           }
//         );
//         alert(response.data.message);
//         setFiles((prev) => prev.filter((f) => !rCodes.includes(f.rcode)));
//         setSelectedFiles([]);
//       } catch (error) {
//         console.error("Error:", error);
//         alert("Error deleting files");
//       }
//     } else {
//       alert("No files selected for deletion.");
//     }
//     setDeleteModalOpen(false);
//   };

//   const handleTransfer = async () => {
//     if (selectedFiles.length > 0 && selectedEmployee) {
//       const transferData = {
//         rcodes: selectedFiles.map((f) => f.rcode),
//         newEpfNo: selectedEmployee.epfNo,
//         newEName: selectedEmployee.eName,

//         newContactNo: selectedEmployee.contactNo,
//         transferredAt: new Date().toISOString(),
//       };
//       try {
//         const response = await axios.put(
//           `/api/RcodeFiles/update-multi-files`,
//           transferData
//         );
//         alert(response.data.message);
//         setTransferModalOpen(false);
//         setSelectedFiles([]);
//         fetchFilesByDepartment(department);
//       } catch (error) {
//         console.error("Transfer error:", error);
//         alert("Failed to transfer files.");
//       }
//     } else {
//       alert("Select files and an employee.");
//     }
//   };

//   const filteredFiles = files
//     .filter(
//       (f) =>
//         (f.rcode.toLowerCase().includes(search.toLowerCase()) ||
//           f.eName.toLowerCase().includes(search.toLowerCase())) &&
//         (status === "" ||
//           (status === "in" && f.eName === "Library") ||
//           (status === "out" && f.eName !== "Library"))
//     )
//     .sort((a, b) => new Date(b.updateDate) - new Date(a.updateDate));

//   const indexOfLast = currentPage * filesPerPage;
//   const currentFiles = filteredFiles.slice(
//     indexOfLast - filesPerPage,
//     indexOfLast
//   );
//   const pageCount = Math.ceil(filteredFiles.length / filesPerPage);

//   return (
//     <div className="flex h-screen bg-primaryBg">
//       <AdminNavbar />
//       <div className="relative flex flex-col w-full h-screen pt-16 sm:pt-0">
//         <div
//           className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
//           style={{ backgroundImage: "url('/bg.jpg')" }}
//         ></div>

//         {/* Search & Filter */}
//         <div className="relative z-30 p-4">
//           <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md w-full max-w-md">
//             <AiOutlineSearch className="text-gray-600 text-xl mr-2" />
//             <input
//               type="text"
//               placeholder="Search File"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full bg-transparent outline-none"
//             />
//             {/* <AiOutlineFilter
//               className="ml-2 text-xl cursor-pointer"
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//             /> */}
//           </div>
//           {/* {dropdownOpen && (
//             <div className="absolute bg-white shadow-md rounded-md mt-2 p-2 w-60 z-50">
//               <select
//                 className="w-full mb-2 p-2"
//                 value={status}
//                 onChange={(e) => {
//                   setStatus(e.target.value);
//                   setDropdownOpen(false);
//                 }}
//               >
//                 <option value="">All Status</option>
//                 <option value="in">In Library</option>
//                 <option value="out">Out of Library</option>
//               </select>
//               <select
//                 className="w-full p-2"
//                 value={department}
//                 onChange={(e) => {
//                   setDepartment(e.target.value);
//                   setDropdownOpen(false);
//                 }}
//               >
//                 <option value="Dyeing-Lanka">Dyeing-Lanka</option>
//                 <option value="Quality-Lanka">Quality-Lanka</option>
//               </select>
//             </div>
//           )} */}
//         </div>

//         {/* File List */}
//         <div className="relative z-10 p-4 overflow-y-auto max-h-[80vh]">
//           {loading ? (
//             <p className="text-white">Loading...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : currentFiles.length === 0 ? (
//             <p className="text-white">No files found.</p>
//           ) : (
//             <div className="space-y-3">
//               {currentFiles.map((file, idx) => (
//                 <div
//                   key={idx}
//                   className={`flex items-center justify-between p-3 rounded-md shadow ${
//                     file.eName === "Library" ? "bg-green-500" : "bg-red-500"
//                   } text-white`}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedFiles.includes(file)}
//                     onChange={() => handleCheckboxChange(file)}
//                   />
//                   <div className="flex-1 text-center font-semibold">
//                     {file.rcode} - {file.eName} - {file.epfNo || "N/A"} -{" "}
//                     {file.contactNo || "N/A"} - {file.department}-
//                     {new Date(file.updateDate).toLocaleString("en-LK", {
//                       timeZone: "Asia/Colombo",
//                     })}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Pagination */}
//           <div className="flex justify-center mt-4 space-x-2 items-center">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className={`px-3 py-1 rounded ${
//                 currentPage === 1
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-500 text-white"
//               }`}
//             >
//               &lt;
//             </button>
//             {[...Array(pageCount)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 rounded ${
//                   currentPage === i + 1
//                     ? "bg-blue-700 text-white"
//                     : "bg-blue-500 text-white"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, pageCount))
//               }
//               disabled={currentPage === pageCount}
//               className={`px-3 py-1 rounded ${
//                 currentPage === pageCount
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-500 text-white"
//               }`}
//             >
//               &gt;
//             </button>
//           </div>

//           {/* Action Buttons */}
//           {selectedFiles.length > 0 && (
//             <div className="flex justify-center space-x-4 mt-4">
//               <button
//                 className="bg-red-600 px-4 py-2 text-white rounded"
//                 onClick={() => setDeleteModalOpen(true)}
//               >
//                 Delete
//               </button>
//               <button
//                 className="bg-blue-600 px-4 py-2 text-white rounded"
//                 onClick={() => setTransferModalOpen(true)}
//               >
//                 Transfer
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Transfer Modal */}
//         {transferModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-4 rounded-md w-80 space-y-2">
//               <h2 className="text-lg font-semibold">Select Employee</h2>
//               <select
//                 className="w-full p-2 border rounded"
//                 onChange={(e) =>
//                   setSelectedEmployee(
//                     employees.find((emp) => emp.epfNo === e.target.value)
//                   )
//                 }
//               >
//                 <option value="">Select...</option>

//                 {/* Show "Library" first */}
//                 {employees
//                   .filter((emp) => emp.eName === "Library")
//                   .map((emp) => (
//                     <option key={emp.epfNo} value={emp.epfNo}>
//                       {emp.eName} ({emp.epfNo})
//                     </option>
//                   ))}

//                 {/* Then show others sorted alphabetically */}
//                 {employees
//                   .filter((emp) => emp.eName !== "Library")
//                   .sort((a, b) => a.eName.localeCompare(b.eName))
//                   .map((emp) => (
//                     <option key={emp.epfNo} value={emp.epfNo}>
//                       {emp.eName} ({emp.epfNo})
//                     </option>
//                   ))}
//               </select>

//               <div className="flex justify-end mt-4 space-x-2">
//                 <button
//                   className="bg-gray-300 px-3 py-1 rounded"
//                   onClick={() => setTransferModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="bg-blue-600 text-white px-3 py-1 rounded"
//                   onClick={handleTransfer}
//                 >
//                   Transfer
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Delete Modal */}
//         {deleteModalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-md shadow-lg">
//               <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
//               <p>Are you sure you want to delete the selected files?</p>
//               <div className="flex justify-end space-x-4 mt-4">
//                 <button
//                   className="px-4 py-2 bg-gray-500 text-white rounded"
//                   onClick={() => setDeleteModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-red-600 text-white rounded"
//                   onClick={handleDelete}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Files;

import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import "../App.css";
import { jwtDecode } from "jwt-decode";

const Files = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 20;
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [department, setDepartment] = useState("");

  const fetchFilesByDepartment = async (dept) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/RcodeFiles/files-by-department/${dept}`
      );
      setFiles(response.data);
      setError(null);
    } catch (err) {
      setFiles([]);
      setError("No files found for this department.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async (dept) => {
    try {
      const response = await axios.get(
        `/api/UserAccounts/receive-employees/${dept}`
      );
      const simplifiedEmployees = response.data.map((emp) => ({
        epfNo: emp.epfNo,
        eName: emp.eName,
        contactNo: emp.contactNo,
      }));
      setEmployees([
        { epfNo: "Library", eName: "Library", contactNo: "N/A" },
        ...simplifiedEmployees,
      ]);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded = jwtDecode(token);
      const userDept = decoded.Department;
      setDepartment(userDept);
      fetchFilesByDepartment(userDept);
      fetchEmployees(userDept);
    }
  }, []);

  const handleCheckboxChange = (file) => {
    setSelectedFiles((prev) =>
      prev.includes(file) ? prev.filter((f) => f !== file) : [...prev, file]
    );
  };

  const handleDelete = async () => {
    if (selectedFiles.length > 0) {
      const rCodes = selectedFiles.map((f) => f.rcode);
      try {
        const response = await axios.delete(`/api/RcodeFiles`, {
          data: rCodes,
        });
        alert(response.data.message);
        setFiles((prev) => prev.filter((f) => !rCodes.includes(f.rcode)));
        setSelectedFiles([]);
      } catch (error) {
        console.error("Error:", error);
        alert("Error deleting files");
      }
    } else {
      alert("No files selected for deletion.");
    }
    setDeleteModalOpen(false);
  };

  const handleTransfer = async () => {
    if (selectedFiles.length > 0 && selectedEmployee) {
      const transferData = {
        rcodes: selectedFiles.map((f) => f.rcode),
        newEpfNo: selectedEmployee.epfNo,
        newEName: selectedEmployee.eName,
        newContactNo: selectedEmployee.contactNo,
        transferredAt: new Date().toISOString(),
      };
      try {
        const response = await axios.put(
          `/api/RcodeFiles/update-multi-files`,
          transferData
        );
        alert(response.data.message);
        setTransferModalOpen(false);
        setSelectedFiles([]);
        fetchFilesByDepartment(department);
      } catch (error) {
        console.error("Transfer error:", error);
        alert("Failed to transfer files.");
      }
    } else {
      alert("Select files and an employee.");
    }
  };

  const filteredFiles = files
    .filter(
      (f) =>
        f.rcode.toLowerCase().includes(search.toLowerCase()) ||
        f.eName.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.updateDate) - new Date(a.updateDate));

  const indexOfLast = currentPage * filesPerPage;
  const currentFiles = filteredFiles.slice(
    indexOfLast - filesPerPage,
    indexOfLast
  );
  const pageCount = Math.ceil(filteredFiles.length / filesPerPage);

  return (
    <div className="flex h-screen bg-primaryBg">
      <AdminNavbar />
      <div className="relative flex flex-col w-full h-screen pt-16 sm:pt-0">
        <div
          className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>

        {/* Search */}
        <div className="relative z-30 p-4">
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md w-full max-w-md">
            <AiOutlineSearch className="text-gray-600 text-xl mr-2" />
            <input
              type="text"
              placeholder="Search File"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        {/* File List */}
        <div className="relative z-10 p-4 overflow-y-auto max-h-[80vh] custom-scrollbar">
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : currentFiles.length === 0 ? (
            <p className="text-white">No files found.</p>
          ) : (
            <div className="space-y-3">
              {currentFiles.map((file, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-md shadow ${
                    file.eName === "Library" ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file)}
                    onChange={() => handleCheckboxChange(file)}
                  />
                  <div className="flex-1 text-center font-semibold">
                    {file.rcode} - {file.eName} - {file.epfNo || "N/A"} -{" "}
                    {file.contactNo || "N/A"} - {file.department} -{" "}
                    {new Date(file.updateDate).toLocaleString("en-LK", {
                      timeZone: "Asia/Colombo",
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-4 flex items-center gap-2 justify-center text-sm font-medium">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-full ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-white text-black"
              }`}
            >
              ←
            </button>

            {Array.from({ length: pageCount }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === pageCount ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
              )
              .map((page, index, arr) => {
                const prev = arr[index - 1];
                const showEllipsis = prev && page - prev > 1;
                return (
                  <React.Fragment key={page}>
                    {showEllipsis && (
                      <span className="px-2 py-1 text-gray-500 select-none">
                        ...
                      </span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-full ${
                        currentPage === page
                          ? "bg-[#007d9c] text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                );
              })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, pageCount))
              }
              disabled={currentPage === pageCount}
              className={`px-3 py-1 rounded-full ${
                currentPage === pageCount
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-white text-black"
              }`}
            >
              →
            </button>
          </div>

          {/* Action Buttons */}
          {selectedFiles.length > 0 && (
            <div className="flex justify-center space-x-4 mt-4">
              <button
                className="bg-red-600 px-4 py-2 text-white rounded"
                onClick={() => setDeleteModalOpen(true)}
              >
                Delete
              </button>
              <button
                className="bg-blue-600 px-4 py-2 text-white rounded"
                onClick={() => setTransferModalOpen(true)}
              >
                Transfer
              </button>
            </div>
          )}
        </div>

        {/* Transfer Modal */}
        {transferModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-md w-80 space-y-2">
              <h2 className="text-lg font-semibold">Select Employee</h2>
              <select
                className="w-full p-2 border rounded"
                onChange={(e) =>
                  setSelectedEmployee(
                    employees.find((emp) => emp.epfNo === e.target.value)
                  )
                }
              >
                <option value="">Select...</option>
                {employees
                  .filter((emp) => emp.eName === "Library")
                  .map((emp) => (
                    <option key={emp.epfNo} value={emp.epfNo}>
                      {emp.eName} ({emp.epfNo})
                    </option>
                  ))}
                {employees
                  .filter((emp) => emp.eName !== "Library")
                  .sort((a, b) => a.eName.localeCompare(b.eName))
                  .map((emp) => (
                    <option key={emp.epfNo} value={emp.epfNo}>
                      {emp.eName} ({emp.epfNo})
                    </option>
                  ))}
              </select>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => setTransferModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={handleTransfer}
                >
                  Transfer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete the selected files?</p>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Files;

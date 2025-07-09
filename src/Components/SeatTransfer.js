// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import NavBar from "./NavBar";

// const SeatTransfer = ({ selectedFiles, onCancel, onTransferComplete }) => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [transferSuccess, setTransferSuccess] = useState(false);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [pendingTransfer, setPendingTransfer] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const token = localStorage.getItem("jwtToken");
//         const response = await fetch(
//           `${process.env.REACT_APP_API_URL}/UserAccounts/eligible-seat-transfer-users`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch eligible users");
//         }

//         const data = await response.json();
//         setEmployees(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const handleEmployeeSelect = (emp) => {
//     setPendingTransfer(emp);
//     setShowConfirmModal(true);
//   };

//   const handleLibrarySelect = () => {
//     setPendingTransfer({
//       epfNo: "Library",
//       eName: "Library",
//       contactNo: "N/A",
//     });
//     setShowConfirmModal(true);
//   };

//   const handleFileTransfer = async (emp) => {
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/RcodeFiles/update-multi-files`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             rcodes: selectedFiles.map((file) => file.rcode),
//             newEpfNo: emp.epfNo,
//             newEName: emp.eName,
//             newContactNo: emp.contactNo || "",
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update files");
//       }

//       setSelectedEmployee(emp);
//       setTransferSuccess(true);
//       onTransferComplete();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-primaryBg">
//       <NavBar />
//       <div className="relative flex flex-col w-full h-screen pt-16 sm:pt-0">
//         {/* Background with Darkened Image */}
//         <div
//           className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
//           style={{ backgroundImage: "url('/bg.jpg')" }}
//         ></div>

//         <div className="relative flex flex-col items-center w-full h-2/4 bg-[#eeeee4] bg-opacity-50 shadow-xl justify-center text-center">
//           <h1 className="text-2xl font-bold mb-6">Seat Transfer</h1>

//           <div className="w-full space-y-4">
//             {loading ? (
//               <p className="text-center text-gray-700">
//                 Loading eligible employees...
//               </p>
//             ) : error ? (
//               <p className="text-red-500 text-center">{error}</p>
//             ) : transferSuccess ? (
//               <p className="text-green-600 text-lg font-semibold">
//                 ✅ Files have been successfully transferred to{" "}
//                 <span className="font-bold">{selectedEmployee.eName}</span>.
//               </p>
//             ) : (
//               <>
//                 <button
//                   onClick={handleLibrarySelect}
//                   className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//                 >
//                   Transfer to Library
//                 </button>
//                 <div className="space-y-2">
//                   {employees.map((emp, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleEmployeeSelect(emp)}
//                       className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
//                     >
//                       {emp.eName} - {emp.epfNo}
//                     </button>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>

//           <div className="mt-6">
//             <button
//               onClick={onCancel}
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>

//         {/* Confirmation Modal */}
//         {showConfirmModal && pendingTransfer && (
//           <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 w-80 shadow-xl text-center">
//               <p className="text-lg font-semibold mb-4">
//                 Confirm transfer to{" "}
//                 <span className="font-bold">{pendingTransfer.eName}</span> (
//                 {pendingTransfer.epfNo})?
//               </p>
//               <div className="flex justify-center gap-4">
//                 <button
//                   onClick={async () => {
//                     await handleFileTransfer(pendingTransfer);
//                     setShowConfirmModal(false);
//                   }}
//                   className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
//                 >
//                   Confirm
//                 </button>
//                 <button
//                   onClick={() => setShowConfirmModal(false)}
//                   className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SeatTransfer;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const SeatTransfer = ({ selectedFiles, onCancel, onTransferComplete }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingTransfer, setPendingTransfer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/UserAccounts/eligible-seat-transfer-users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch eligible users");
        }

        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeSelect = (emp) => {
    setPendingTransfer(emp);
    setShowConfirmModal(true);
  };

  const handleFileTransfer = async (emp) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/RcodeFiles/update-multi-files`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rcodes: selectedFiles.map((file) => file.rcode),
          newEpfNo: emp.epfNo,
          newEName: emp.eName,
          newContactNo: emp.contactNo || "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update files");
      }

      setSelectedEmployee(emp);
      setTransferSuccess(true);
      onTransferComplete();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen bg-primaryBg">
      <NavBar />
      <div className="relative flex flex-col w-full h-screen pt-16 sm:pt-0">
        {/* Background with Darkened Image */}
        <div
          className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>

        <div className="relative flex flex-col items-center w-full h-2/4 bg-[#eeeee4] bg-opacity-50 shadow-xl justify-center text-center">
          <h1 className="text-2xl font-bold mb-6">Seat Transfer</h1>

          <div className="w-full space-y-4">
            {loading ? (
              <p className="text-center text-gray-700">
                Loading eligible employees...
              </p>
            ) : error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : transferSuccess ? (
              <p className="text-green-600 text-lg font-semibold">
                ✅ Files have been successfully transferred to{" "}
                <span className="font-bold">{selectedEmployee.eName}</span>.
              </p>
            ) : (
              <div className="space-y-2">
                {employees.map((emp, index) => (
                  <button
                    key={index}
                    onClick={() => handleEmployeeSelect(emp)}
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                  >
                    {emp.eName} - {emp.epfNo}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={onCancel}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && pendingTransfer && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-80 shadow-xl text-center">
              <p className="text-lg font-semibold mb-4">
                Confirm transfer to{" "}
                <span className="font-bold">{pendingTransfer.eName}</span> (
                {pendingTransfer.epfNo})?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={async () => {
                    await handleFileTransfer(pendingTransfer);
                    setShowConfirmModal(false);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatTransfer;

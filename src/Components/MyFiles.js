// import React, { useState, useEffect } from "react";
// import Navbar from "./NavBar";
// import { AiOutlineSearch } from "react-icons/ai";
// import axios from "axios";
// import QRTransfer from "./QRTransfer";
// import SeatTransfer from "./SeatTransfer";

// const MyFiles = () => {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const filesPerPage = 20;

//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);

//   const [showQRTransfer, setShowQRTransfer] = useState(false);
//   const [showSeatTransfer, setShowSeatTransfer] = useState(false);

//   const fetchFiles = async () => {
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const response = await axios.get(`/api/RcodeFiles/my-files`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setFiles(
//         response.data.sort((a, b) => new Date(b.getDate) - new Date(a.getDate))
//       );
//     } catch (err) {
//       setError("Failed to fetch files: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const filteredFiles = files.filter(
//     (file) =>
//       file.rcode.toLowerCase().includes(search.toLowerCase()) ||
//       file.eName.toLowerCase().includes(search.toLowerCase())
//   );

//   const indexOfLastFile = currentPage * filesPerPage;
//   const indexOfFirstFile = indexOfLastFile - filesPerPage;
//   const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const toggleSelectFile = (file) => {
//     if (selectedFiles.some((f) => f.rcode === file.rcode)) {
//       setSelectedFiles(selectedFiles.filter((f) => f.rcode !== file.rcode));
//     } else {
//       setSelectedFiles([...selectedFiles, file]);
//     }
//   };

//   const toggleSelectAll = () => {
//     if (selectAll) {
//       setSelectedFiles([]);
//     } else {
//       setSelectedFiles(currentFiles);
//     }
//     setSelectAll(!selectAll);
//   };

//   if (showQRTransfer) {
//     return (
//       <QRTransfer
//         selectedFileIds={selectedFiles.map((f) => f.rcode)}
//         onCancel={() => setShowQRTransfer(false)}
//       />
//     );
//   }

//   if (showSeatTransfer) {
//     return (
//       <SeatTransfer
//         selectedFiles={selectedFiles}
//         onCancel={() => setShowSeatTransfer(false)}
//         onTransferComplete={fetchFiles}
//       />
//     );
//   }

//   return (
//     <div className="flex h-screen bg-primaryBg">
//       <Navbar />
//       <div className="relative flex flex-col w-full h-screen">
//         <div
//           className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
//           style={{ backgroundImage: "url('/bg.jpg')" }}
//         ></div>

//         {/* Search Bar */}
//         <div className="relative flex items-center justify-start p-4 z-30">
//           <div className="flex items-center w-full max-w-md bg-white bg-opacity-90 rounded-full px-4 py-2 shadow-md">
//             <AiOutlineSearch className="text-gray-600 text-xl mr-2" />
//             <input
//               type="text"
//               placeholder="Search File"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500 font-semibold"
//             />
//           </div>
//         </div>

//         {/* File List */}
//         <div className="relative z-10 w-full h-full p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
//           {loading ? (
//             <p className="text-white text-center">Loading files...</p>
//           ) : error ? (
//             <p className="text-red-500 text-center">{error}</p>
//           ) : currentFiles.length === 0 ? (
//             <p className="text-gray-300 text-center">No files found.</p>
//           ) : (
//             <div className="flex flex-col items-center">
//               {/* Select All & Action Buttons */}
//               <div className="w-full max-w-3xl flex justify-between items-center mt-2">
//                 <label className="text-white flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     checked={selectAll}
//                     onChange={toggleSelectAll}
//                   />
//                   <span>Select All</span>
//                 </label>

//                 {selectedFiles.length > 0 && (
//                   <div className="space-x-2">
//                     <button
//                       onClick={() => setShowSeatTransfer(true)}
//                       className="bg-green-600 text-white px-4 py-2 rounded-md"
//                     >
//                       Seat Transfer
//                     </button>
//                     <button
//                       onClick={() => setShowQRTransfer(true)}
//                       className="bg-yellow-600 text-white px-4 py-2 rounded-md"
//                     >
//                       QR Transfer
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* File Rows */}
//               <div className="shadow-lg mt-4 p-4 w-full max-w-3xl bg-[#eeeee4] bg-opacity-20 rounded-lg space-y-3">
//                 {currentFiles.map((file, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between items-center bg-[#0b4b61] bg-opacity-80 text-white px-4 py-2 rounded-md shadow-md"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedFiles.some(
//                         (f) => f.rcode === file.rcode
//                       )}
//                       onChange={() => toggleSelectFile(file)}
//                       className="mr-2"
//                     />
//                     <div className="text-sm sm:text-base font-semibold text-center w-full">
//                       <span className="font-bold">Code: </span>
//                       {file.rcode}
//                     </div>
//                     <div className="text-sm sm:text-base font-semibold text-center w-full">
//                       <span className="font-bold">Date: </span>
//                       {new Date(file.updateDate).toLocaleString("en-LK", {
//                         timeZone: "Asia/Colombo",
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                         hour12: true,
//                       })}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Pagination */}
//               <div className="mt-4 flex justify-center space-x-2">
//                 {[...Array(Math.ceil(filteredFiles.length / filesPerPage))].map(
//                   (_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => paginate(index + 1)}
//                       className={`px-4 py-2 rounded-md ${
//                         currentPage === index + 1
//                           ? "bg-blue-700 text-white"
//                           : "bg-blue-500 text-white"
//                       }`}
//                     >
//                       {index + 1}
//                     </button>
//                   )
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyFiles;

import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import QRTransfer from "./QRTransfer";
import SeatTransfer from "./SeatTransfer";

const MyFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 20;

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [showQRTransfer, setShowQRTransfer] = useState(false);
  const [showSeatTransfer, setShowSeatTransfer] = useState(false);

  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(`/api/RcodeFiles/my-files`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFiles(
        response.data.sort((a, b) => new Date(b.getDate) - new Date(a.getDate))
      );
    } catch (err) {
      setError("Failed to fetch files: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const filteredFiles = files.filter(
    (file) =>
      file.rcode.toLowerCase().includes(search.toLowerCase()) ||
      file.eName.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleSelectFile = (file) => {
    if (selectedFiles.some((f) => f.rcode === file.rcode)) {
      setSelectedFiles(selectedFiles.filter((f) => f.rcode !== file.rcode));
    } else {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(currentFiles);
    }
    setSelectAll(!selectAll);
  };

  if (showQRTransfer) {
    return (
      <QRTransfer
        selectedFileIds={selectedFiles.map((f) => f.rcode)}
        onCancel={() => setShowQRTransfer(false)}
      />
    );
  }

  if (showSeatTransfer) {
    return (
      <SeatTransfer
        selectedFiles={selectedFiles}
        onCancel={() => setShowSeatTransfer(false)}
        onTransferComplete={fetchFiles}
      />
    );
  }

  return (
    <div className="flex h-screen bg-primaryBg">
      <Navbar />
      <div className="relative flex flex-col w-full h-screen">
        <div
          className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>

        {/* Sticky Search Bar (Always Visible) */}
        <div className="sticky top-0 z-30 p-4 bg-primaryBg bg-opacity-90 backdrop-blur-md">
          <div className="flex items-center w-full max-w-md mx-auto bg-white rounded-full px-4 py-2 shadow-md">
            <AiOutlineSearch className="text-gray-600 text-xl mr-2" />
            <input
              type="text"
              placeholder="Search File"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500 font-semibold"
            />
          </div>
        </div>

        {/* File List */}
        <div className="relative z-10 w-full h-full p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
          {loading ? (
            <p className="text-white text-center">Loading files...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : currentFiles.length === 0 ? (
            <p className="text-gray-300 text-center">No files found.</p>
          ) : (
            <div className="flex flex-col items-center">
              {/* Select All & Action Buttons */}
              <div className="w-full max-w-3xl flex justify-between items-center mt-2">
                <label className="text-white flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                  <span>Select All</span>
                </label>

                {selectedFiles.length > 0 && (
                  <div className="space-x-2">
                    <button
                      onClick={() => setShowSeatTransfer(true)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md"
                    >
                      Seat Transfer
                    </button>
                    <button
                      onClick={() => setShowQRTransfer(true)}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-md"
                    >
                      QR Transfer
                    </button>
                  </div>
                )}
              </div>

              {/* File Rows */}
              <div className="shadow-lg mt-4 p-4 w-full max-w-3xl bg-[#eeeee4] bg-opacity-20 rounded-lg space-y-3">
                {currentFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-[#0b4b61] bg-opacity-80 text-white px-4 py-2 rounded-md shadow-md"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFiles.some(
                        (f) => f.rcode === file.rcode
                      )}
                      onChange={() => toggleSelectFile(file)}
                      className="mr-2"
                    />
                    <div className="text-sm sm:text-base font-semibold text-center w-full">
                      <span className="font-bold">Code: </span>
                      {file.rcode}
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-center w-full">
                      <span className="font-bold">Date: </span>
                      {new Date(file.updateDate).toLocaleString("en-LK", {
                        timeZone: "Asia/Colombo",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-4 flex justify-center space-x-2">
                {[...Array(Math.ceil(filteredFiles.length / filesPerPage))].map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === index + 1
                          ? "bg-blue-700 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyFiles;

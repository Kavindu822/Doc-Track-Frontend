// import React, { useState } from "react";
// import { AiOutlineSearch } from "react-icons/ai";

// const DocTrack = () => {
//   const [searchCode, setSearchCode] = useState("");
//   const [documentList, setDocumentList] = useState([]);
//   const [history, setHistory] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showHistory, setShowHistory] = useState(false);
//   const [searchHistory, setSearchHistory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);

//   const formatDateTime = (dateString) => {
//     if (!dateString) return "Unknown Date";
//     const date = new Date(dateString);
//     return isNaN(date.getTime())
//       ? "Unknown Date"
//       : `${date.toLocaleDateString()} - ${date.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         })}`;
//   };

//   const handleSearch = async () => {
//     if (!searchCode.trim()) {
//       setError("Please enter a document code.");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setDocumentList([]);
//     setHistory(null);
//     setShowHistory(false);

//     try {
//       const response = await fetch(`/api/RcodeFiles/search/${searchCode}`);
//       if (!response.ok) {
//         throw new Error("Document not found or an error occurred.");
//       }
//       const data = await response.json();
//       console.log("Fetched documents:", data);
//       setDocumentList(Array.isArray(data) ? data : [data]); // ensure array
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleHistory = async (rcode) => {
//     if (!rcode.trim()) {
//       setError("Invalid Rcode.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`/api/RcodeFiles/search-history/${rcode}`);
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(
//           errorData.message || "Failed to fetch document history."
//         );
//       }

//       const historyData = await response.json();

//       if (!Array.isArray(historyData)) {
//         throw new Error("Invalid history data format.");
//       }

//       setHistory(historyData);
//       setShowHistory(true);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackToSearch = () => {
//     setShowHistory(false);
//     setHistory(null);
//   };

//   const handleSearchHistory = (e) => {
//     setSearchHistory(e.target.value);
//     setCurrentPage(1);
//   };

//   const filteredHistory = history
//     ? history.filter(
//         (entry) =>
//           entry.rcode.toLowerCase().includes(searchHistory.toLowerCase()) ||
//           entry.newEpfNo.toLowerCase().includes(searchHistory.toLowerCase()) ||
//           entry.newEName.toLowerCase().includes(searchHistory.toLowerCase())
//       )
//     : [];

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div
//       className="relative flex flex-col items-center justify-start w-full h-screen bg-center bg-cover"
//       style={{ backgroundImage: "url('/bg.jpg')" }}
//     >
//       <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>

//       {!showHistory ? (
//         <div className="relative flex flex-col items-center w-full h-full justify-center px-4 sm:px-6 lg:px-8">
//           <p className="text-xl sm:text-3xl font-semibold text-center text-white mt-60 mb-2">
//             Track your document here!
//           </p>

//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={5.5}
//             stroke="currentColor"
//             className="w-25 h-20 text-[#00a2cd] animate-bounce mb-2"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
//             />
//           </svg>

//           <div className="relative flex items-center w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mt-1">
//             <input
//               className="w-full p-3 pr-10 text-center border rounded-full text-secondaryText border-borderColor bg-white focus:ring-2 focus:ring-[#00a2cd] transition duration-200 truncate placeholder:text-sm placeholder:font-bold"
//               placeholder="Enter Document Code"
//               value={searchCode}
//               onChange={(e) => setSearchCode(e.target.value)}
//             />
//             <button
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00a2cd] hover:text-[#0080a0]"
//               onClick={handleSearch}
//             >
//               <AiOutlineSearch className="w-6 h-6" />
//             </button>
//           </div>

//           {loading && <p className="text-white mt-4">Loading...</p>}
//           {error && <p className="text-center text-red-500 mt-4">{error}</p>}

//           {documentList.length > 0 && (
//             <div className="mt-6 space-y-4 overflow-y-auto max-h-[300px] w-full sm:w-2/3 lg:w-1/2 pr-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
//               {documentList.map((doc, index) => (
//                 <div
//                   key={index}
//                   className={`p-4 text-white rounded-lg text-center shadow-lg ${
//                     doc.eName === "Library"
//                       ? "bg-[#296c74] bg-opacity-70"
//                       : "bg-red-800 bg-opacity-70"
//                   }`}
//                 >
//                   <p className="text-sm sm:text-lg mb-4">
//                     <strong>{doc.rcode} → </strong>
//                     <strong>{doc.epfNo}</strong> - <strong>{doc.eName}</strong>{" "}
//                     - <strong>{doc.contactNo}</strong> -{" "}
//                     <strong>{formatDateTime(doc.updateDate)}</strong>
//                   </p>
//                   <button
//                     onClick={() => handleHistory(doc.rcode)}
//                     className="px-6 py-2 mt-2 border rounded-full bg-[#00a2cd] text-white border-borderColor hover:opacity-90"
//                   >
//                     <strong>View Combined History</strong>
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="w-full flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
//           <div className="text-white bg-[#0b4b61] opacity-90 text-xl font-bold py-3 px-6 text-center rounded-lg shadow-lg w-full max-w-2xl">
//             File History Results
//           </div>

//           <div className="mt-4 mb-4 w-full max-w-2xl">
//             <input
//               className="w-full p-3 pr-10 text-center border rounded-full text-secondaryText border-borderColor bg-white opacity-90 focus:ring-2 focus:ring-[#00a2cd] transition duration-200 truncate placeholder:text-sm placeholder:font-bold"
//               placeholder="Search by Rcode, EPF No, or Name"
//               value={searchHistory}
//               onChange={handleSearchHistory}
//             />
//           </div>

//           <div className="shadow-lg mt-4 p-2 w-full max-w-2xl overflow-y-auto max-h-64 space-y-2">
//             {currentItems.map((entry, index) => (
//               <div
//                 key={index}
//                 className="py-2 px-4 rounded-md text-center text-base sm:text-lg font-semibold bg-[#0b4b61] opacity-80 text-white"
//               >
//                 {entry.rcode} → {entry.previousEpfNo} ({entry.previousEName}) ➝{" "}
//                 {entry.newEpfNo} ({entry.newEName}) |{" "}
//                 {formatDateTime(entry.transferDate)}
//               </div>
//             ))}
//           </div>

//           <div className="mt-4 flex space-x-2 items-center justify-center">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={`px-3 py-2 rounded-full ${
//                 currentPage === 1
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-[#00a2cd] opacity-80 text-white"
//               }`}
//             >
//               &lt;
//             </button>

//             {Array.from({ length: Math.min(4, totalPages) }, (_, i) => {
//               const windowStart = Math.min(
//                 Math.max(currentPage - 2, 0),
//                 Math.max(totalPages - 4, 0)
//               );
//               const page = windowStart + i + 1;

//               return (
//                 <button
//                   key={page}
//                   onClick={() => handlePageChange(page)}
//                   className={`px-4 py-2 rounded-full ${
//                     currentPage === page
//                       ? "bg-[#00a2cd] text-white"
//                       : "bg-[#00a2cd] opacity-80 text-white"
//                   }`}
//                 >
//                   {page}
//                 </button>
//               );
//             })}

//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className={`px-3 py-2 rounded-full ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-[#00a2cd] opacity-80 text-white"
//               }`}
//             >
//               &gt;
//             </button>
//           </div>

//           <button
//             onClick={handleBackToSearch}
//             className="px-6 py-2 mt-6 border rounded-full bg-[#00a2cd] text-white hover:opacity-90"
//           >
//             <strong>Back to Search</strong>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocTrack;

import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "../App.css";

const DocTrack = () => {
  const [searchCode, setSearchCode] = useState("");
  const [documentList, setDocumentList] = useState([]);
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const formatDateTime = (dateString) => {
    if (!dateString) return "Unknown Date";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Unknown Date"
      : `${date.toLocaleDateString()} - ${date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
  };

  const handleSearch = async () => {
    if (!searchCode.trim()) {
      setError("Please enter a document code.");
      return;
    }

    setLoading(true);
    setError(null);
    setDocumentList([]);
    setHistory(null);
    setShowHistory(false);

    try {
      const response = await fetch(`/api/RcodeFiles/search/${searchCode}`);
      if (!response.ok) {
        throw new Error("Document not found or an error occurred.");
      }
      const data = await response.json();
      setDocumentList(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHistory = async (rcode) => {
    if (!rcode.trim()) {
      setError("Invalid Rcode.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/RcodeFiles/search-history/${rcode}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to fetch document history."
        );
      }

      const historyData = await response.json();

      if (!Array.isArray(historyData)) {
        throw new Error("Invalid history data format.");
      }

      setHistory(historyData);
      setShowHistory(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSearch = () => {
    setShowHistory(false);
    setHistory(null);
  };

  const handleSearchHistory = (e) => {
    setSearchHistory(e.target.value);
    setCurrentPage(1);
  };

  const filteredHistory = history
    ? history.filter(
        (entry) =>
          entry.rcode.toLowerCase().includes(searchHistory.toLowerCase()) ||
          entry.newEpfNo.toLowerCase().includes(searchHistory.toLowerCase()) ||
          entry.newEName.toLowerCase().includes(searchHistory.toLowerCase())
      )
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-start w-full h-screen bg-center bg-cover"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>

      {!showHistory ? (
        <div className="relative flex flex-col items-center w-full h-full justify-center px-4 sm:px-6 lg:px-8">
          <p className="text-xl sm:text-3xl font-semibold text-center text-white mt-60 mb-2">
            Track your document here!
          </p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={5.5}
            stroke="currentColor"
            className="w-25 h-20 text-[#00a2cd] animate-bounce mb-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
            />
          </svg>

          <div className="relative flex items-center w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mt-1">
            <input
              className="w-full p-3 pr-10 text-center border rounded-full text-secondaryText border-borderColor bg-white focus:ring-2 focus:ring-[#00a2cd] transition duration-200 truncate placeholder:text-sm placeholder:font-bold"
              placeholder="Enter Document Code"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
            />
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00a2cd] hover:text-[#0080a0]"
              onClick={handleSearch}
            >
              <AiOutlineSearch className="w-6 h-6" />
            </button>
          </div>

          {loading && <p className="text-white mt-4">Loading...</p>}
          {error && <p className="text-center text-red-500 mt-4">{error}</p>}

          {documentList.length > 0 && (
            <div className="mt-6 space-y-4 overflow-y-auto max-h-[300px] w-full sm:w-2/3 lg:w-1/2 pr-2 custom-scrollbar">
              {documentList.map((doc, index) => (
                <div
                  key={index}
                  className={`p-4 text-white rounded-lg text-center shadow-lg ${
                    doc.eName === "Library"
                      ? "bg-[#296c74] bg-opacity-70"
                      : "bg-red-800 bg-opacity-70"
                  }`}
                >
                  <p className="text-sm sm:text-lg mb-4">
                    <strong>{doc.rcode} → </strong>
                    <strong>{doc.epfNo}</strong> - <strong>{doc.eName}</strong>{" "}
                    - <strong>{doc.contactNo}</strong> -{" "}
                    <strong>{formatDateTime(doc.updateDate)}</strong>
                  </p>
                  <button
                    onClick={() => handleHistory(doc.rcode)}
                    className="px-6 py-2 mt-2 border rounded-full bg-[#00a2cd] text-white border-borderColor hover:opacity-90"
                  >
                    <strong>View Combined History</strong>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="text-white bg-[#0b4b61] opacity-90 text-xl font-bold py-3 px-6 text-center rounded-lg shadow-lg w-full max-w-2xl">
            File History Results
          </div>

          <div className="mt-4 mb-4 w-full max-w-2xl">
            <input
              className="w-full p-3 pr-10 text-center border rounded-full text-secondaryText border-borderColor bg-white opacity-90 focus:ring-2 focus:ring-[#00a2cd] transition duration-200 truncate placeholder:text-sm placeholder:font-bold"
              placeholder="Search by Rcode, EPF No, or Name"
              value={searchHistory}
              onChange={handleSearchHistory}
            />
          </div>

          <div className="shadow-lg mt-4 p-2 w-full max-w-2xl overflow-y-auto max-h-64 space-y-2 custom-scrollbar">
            {currentItems.map((entry, index) => (
              <div
                key={index}
                className="py-2 px-4 rounded-md text-center text-base sm:text-lg font-semibold bg-[#0b4b61] opacity-80 text-white"
              >
                {entry.rcode} → {entry.previousEpfNo} ({entry.previousEName}) ➝{" "}
                {entry.newEpfNo} ({entry.newEName}) |{" "}
                {formatDateTime(entry.transferDate)}
              </div>
            ))}
          </div>

          <div className="mt-4 flex space-x-2 items-center justify-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-full ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#00a2cd] opacity-80 text-white"
              }`}
            >
              &lt;
            </button>

            {Array.from({ length: Math.min(4, totalPages) }, (_, i) => {
              const windowStart = Math.min(
                Math.max(currentPage - 2, 0),
                Math.max(totalPages - 4, 0)
              );
              const page = windowStart + i + 1;

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-full ${
                    currentPage === page
                      ? "bg-[#00a2cd] text-white"
                      : "bg-[#00a2cd] opacity-80 text-white"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-full ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#00a2cd] opacity-80 text-white"
              }`}
            >
              &gt;
            </button>
          </div>

          <button
            onClick={handleBackToSearch}
            className="px-6 py-2 mt-6 border rounded-full bg-[#00a2cd] text-white hover:opacity-90"
          >
            <strong>Back to Search</strong>
          </button>
        </div>
      )}
    </div>
  );
};

export default DocTrack;

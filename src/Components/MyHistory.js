// import React, { useState, useEffect } from "react";
// import Navbar from "./NavBar";
// import { AiOutlineSearch } from "react-icons/ai";
// import axios from "axios";

// const MyHistory = () => {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const historyPerPage = 20;

//   useEffect(() => {
//     fetchUserHistory();
//   }, []);

//   const fetchUserHistory = async () => {
//     try {
//       const token = localStorage.getItem("jwtToken");
//       if (!token) {
//         setError("User not authenticated.");
//         setLoading(false);
//         return;
//       }

//       const response = await axios.get(`/api/RcodeFiles/my-history`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setHistory(response.data);
//     } catch (err) {
//       setError("Failed to fetch history");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Safe filtering on rcode only
//   const filteredHistory = history
//     .filter((record) =>
//       (record.rcode || "").toLowerCase().includes(search.toLowerCase())
//     )
//     .sort((a, b) => new Date(b.transferDate) - new Date(a.transferDate));

//   const indexOfLastRecord = currentPage * historyPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - historyPerPage;
//   const currentHistory = filteredHistory.slice(
//     indexOfFirstRecord,
//     indexOfLastRecord
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="flex h-screen bg-primaryBg">
//       <Navbar />
//       <div className="relative flex flex-col w-full h-screen pt-16 sm:pt-0">
//         <div
//           className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
//           style={{ backgroundImage: "url('/bg.jpg')" }}
//         ></div>

//         {/* Search Bar */}
//         <div className="relative flex justify-center p-4 z-30">
//           <div className="flex items-center w-full max-w-md bg-white bg-opacity-90 rounded-full px-3 py-2 shadow-md mx-4 sm:mx-0">
//             <AiOutlineSearch className="text-gray-600 text-xl mr-2" />
//             <input
//               type="text"
//               placeholder="Search History"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500 font-semibold"
//             />
//           </div>
//         </div>

//         {/* History List */}
//         <div className="relative z-10 w-full h-full p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
//           {loading ? (
//             <p className="text-white text-center">Loading history...</p>
//           ) : error ? (
//             <p className="text-red-500 text-center">{error}</p>
//           ) : currentHistory.length === 0 ? (
//             <p className="text-gray-300 text-center">No history found.</p>
//           ) : (
//             <div className="flex flex-col items-center">
//               <div className="shadow-lg mt-4 p-4 w-full max-w-3xl bg-[#eeeee4] bg-opacity-20 rounded-lg space-y-3">
//                 {currentHistory.map((record, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between items-center bg-[#0b4b61] bg-opacity-80 text-white px-4 py-2 rounded-md shadow-md"
//                   >
//                     <div className="text-sm sm:text-base font-semibold text-center w-full">
//                       <span className="font-bold">Code: </span>
//                       {record.rcode}
//                     </div>
//                     <div className="text-sm sm:text-base font-semibold text-center w-full">
//                       <span className="font-bold">Date: </span>
//                       {record.transferDate
//                         ? new Date(record.transferDate).toLocaleString(
//                             "en-US",
//                             {
//                               year: "numeric",
//                               month: "short",
//                               day: "numeric",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                               hour12: true,
//                             }
//                           )
//                         : "N/A"}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Pagination */}
//               <div className="mt-4 flex justify-center space-x-2">
//                 {[
//                   ...Array(Math.ceil(filteredHistory.length / historyPerPage)),
//                 ].map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => paginate(index + 1)}
//                     className={`px-4 py-2 rounded-md ${
//                       currentPage === index + 1
//                         ? "bg-blue-700 text-white"
//                         : "bg-blue-500 text-white"
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
//     </div>
//   );
// };

// export default MyHistory;

import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

const MyHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const historyPerPage = 20;

  useEffect(() => {
    fetchUserHistory();
  }, []);

  const fetchUserHistory = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/RcodeFiles/my-history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHistory(response.data);
    } catch (err) {
      setError("Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history
    .filter((record) =>
      (record.rcode || "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.transferDate) - new Date(a.transferDate));

  const totalPages = Math.ceil(filteredHistory.length / historyPerPage);
  const indexOfLastRecord = currentPage * historyPerPage;
  const indexOfFirstRecord = indexOfLastRecord - historyPerPage;
  const currentHistory = filteredHistory.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex h-screen bg-primaryBg">
      <Navbar />
      <div className="relative flex flex-col w-full h-screen pt-16 sm:pt-0">
        <div
          className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>

        {/* Search Bar */}
        <div className="relative flex justify-center p-4 z-30">
          <div className="flex items-center w-full max-w-md bg-white bg-opacity-90 rounded-full px-3 py-2 shadow-md mx-4 sm:mx-0">
            <AiOutlineSearch className="text-gray-600 text-xl mr-2" />
            <input
              type="text"
              placeholder="Search History"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Reset to first page when search changes
              }}
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500 font-semibold"
            />
          </div>
        </div>

        {/* History List */}
        <div className="relative z-10 w-full h-full p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
          {loading ? (
            <p className="text-white text-center">Loading history...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : currentHistory.length === 0 ? (
            <p className="text-gray-300 text-center">No history found.</p>
          ) : (
            <div className="flex flex-col items-center">
              <div className="shadow-lg mt-4 p-4 w-full max-w-3xl bg-[#eeeee4] bg-opacity-20 rounded-lg space-y-3">
                {currentHistory.map((record, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-[#0b4b61] bg-opacity-80 text-white px-4 py-2 rounded-md shadow-md"
                  >
                    <div className="text-sm sm:text-base font-semibold text-center w-full">
                      <span className="font-bold">Code: </span>
                      {record.rcode}
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-center w-full">
                      <span className="font-bold">Date: </span>
                      {record.transferDate
                        ? new Date(record.transferDate).toLocaleString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )
                        : "N/A"}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex flex-wrap justify-center items-center space-x-2">
                {/* Previous Arrow */}
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-full ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-black hover:bg-blue-100"
                  }`}
                >
                  ←
                </button>

                {/* Page Numbers with Ellipsis */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 2 && page <= currentPage + 2)
                    );
                  })
                  .map((page, i, array) => {
                    const prevPage = array[i - 1];
                    const showEllipsis = prevPage && page - prevPage > 1;

                    return (
                      <React.Fragment key={page}>
                        {showEllipsis && (
                          <span className="px-2 text-gray-400 select-none">
                            ...
                          </span>
                        )}
                        <button
                          onClick={() => paginate(page)}
                          className={`px-4 py-2 rounded-full ${
                            currentPage === page
                              ? "bg-[#007d9c] text-white font-semibold"
                              : "bg-white text-black hover:bg-blue-100"
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  })}

                {/* Next Arrow */}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-full ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-black hover:bg-blue-100"
                  }`}
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyHistory;

import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { AiOutlineSearch, AiOutlineFilter } from "react-icons/ai";

const FileHistory = () => {
  const [files, setFiles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get("/api/RcodeFiles/history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setFiles(res.data);
        setFiltered(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load files.");
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    let filteredFiles = files;

    // Apply search filter
    if (search.trim() !== "") {
      const lower = search.toLowerCase();
      filteredFiles = filteredFiles.filter(
        (file) =>
          file.rcode.toLowerCase().includes(lower) ||
          file.previousEName.toLowerCase().includes(lower) ||
          file.newEName.toLowerCase().includes(lower)
      );
    }

    // Apply status filter
    if (status) {
      filteredFiles = filteredFiles.filter((file) =>
        status === "in" ? file.eName === "Library" : file.eName !== "Library"
      );
    }

    // Apply department filter
    if (department) {
      filteredFiles = filteredFiles.filter(
        (file) => file.department === department
      );
    }

    setFiltered(filteredFiles);
  }, [search, status, department, files]);

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
        {/* Search and Filters */}
        <div className="relative flex items-center justify-start p-4 z-30">
          <div className="flex items-center w-full max-w-md bg-white bg-opacity-90 rounded-full px-4 py-2 shadow-md">
            <AiOutlineSearch className="text-gray-600 text-xl mr-2" />
            <input
              type="text"
              placeholder="Search File"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500 font-semibold"
            />
            <AiOutlineFilter
              className="text-gray-600 text-xl ml-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute left-0 top-12 bg-white shadow-lg rounded-md z-40 w-full max-w-[220px] p-2 mt-1 border border-gray-300">
                <div className="max-h-64 overflow-y-auto">
                  <select
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                      setDropdownOpen(false);
                    }}
                    className="w-full p-2 bg-transparent text-gray-800 rounded-md focus:outline-none mb-2"
                  >
                    <option value="">Filter by Status</option>
                    <option value="in">In Library</option>
                    <option value="out">Out of Library</option>
                  </select>
                  <select
                    value={department}
                    onChange={(e) => {
                      setDepartment(e.target.value);
                      setDropdownOpen(false);
                    }}
                    className="w-full p-2 bg-transparent text-gray-800 rounded-md focus:outline-none"
                  >
                    <option value="">Filter by Department</option>
                    <option value="Quality">Quality-Lanka</option>
                    <option value="Dyeing">Dyeing-Lanka</option>
                    <option value="DyeingI">Dyeing-India</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* File List */}
        <div className="relative z-10 w-full h-full p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
          {loading ? (
            <p className="text-white text-center">Loading files...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-300 text-center">No files found.</p>
          ) : (
            <div className="flex flex-col items-center">
              <div className="shadow-lg mt-4 p-4 w-full max-w-3xl bg-[#eeeee4] bg-opacity-60 rounded-lg space-y-3">
                {currentItems.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-[#0b4b61] bg-opacity-80 text-white px-4 py-2 rounded-md shadow-md"
                  >
                    <div className="text-sm sm:text-base font-semibold text-center w-full">
                      {file.rcode} - {file.previousEName} → {file.newEName} -{" "}
                      {new Date(file.transferDate).toLocaleString("en-LK", {
                        timeZone: "Asia/Colombo",
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
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
    </div>
  );
};

export default FileHistory;

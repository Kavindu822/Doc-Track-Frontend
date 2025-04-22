import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { AiOutlineSearch, AiOutlineFilter } from "react-icons/ai";
import axios from "axios";

const Files = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 20;
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [confirmTransferOpen, setConfirmTransferOpen] = useState(false);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("/api/RcodeFiles");
      setFiles(response.data);
    } catch (err) {
      setError("Failed to fetch files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "/api/UserAccounts/approved-employees"
        );
        const simplifiedEmployees = response.data.map((emp) => ({
          epfNo: emp.epfNo,
          eName: emp.eName,
          contactNo: emp.contactNo,
        }));

        // 👇 Add Library as a manual option
        const libraryEntry = {
          epfNo: "Library",
          eName: "Library",
          contactNo: "N/A",
        };

        setEmployees([libraryEntry, ...simplifiedEmployees]);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
      }
    };

    fetchEmployees();
  }, []);

  const handleCheckboxChange = (file) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.includes(file)
        ? prevSelectedFiles.filter((selectedFile) => selectedFile !== file)
        : [...prevSelectedFiles, file]
    );
  };

  const handleDelete = async () => {
    if (selectedFiles.length > 0) {
      const rCodes = selectedFiles.map((file) => file.rcode);
      try {
        const response = await axios.delete("/api/RcodeFiles", {
          data: rCodes,
        });
        if (response.status === 200) {
          alert(response.data.message);
          setFiles((prevFiles) =>
            prevFiles.filter((file) => !rCodes.includes(file.rcode))
          );
          setSelectedFiles([]);
        } else {
          alert(
            "Error deleting files: " +
              (response.data.message || "Unknown error")
          );
        }
      } catch (error) {
        console.error("Error response:", error.response);
        alert(
          "Error deleting files: " +
            (error.response?.data?.message || "Unknown error")
        );
      }
    } else {
      alert("No files selected for deletion.");
    }
    setDeleteModalOpen(false);
  };

  const handleTransfer = async () => {
    if (selectedFiles.length > 0 && selectedEmployee) {
      const rCodes = selectedFiles.map((file) => file.rcode);
      const now = new Date().toISOString(); // ⏰ get current date and time

      const transferData = {
        rcodes: rCodes,
        newEpfNo: selectedEmployee.epfNo,
        newEName: selectedEmployee.eName,
        newContactNo: selectedEmployee.contactNo,
        transferredAt: now, // ✅ current date & time included here
      };

      try {
        const response = await axios.put(
          "/api/RcodeFiles/update-multi-files",
          transferData
        );
        alert(response.data.message);
        setTransferModalOpen(false);
        setConfirmTransferOpen(false);
        setSelectedFiles([]);
        fetchFiles();
      } catch (error) {
        console.error("Error during transfer:", error);
        alert("Failed to transfer files.");
      }
    } else {
      alert("No files selected or no employee selected.");
    }
  };

  const filteredFiles = files
    .filter(
      (file) =>
        (file.rcode.toLowerCase().includes(search.toLowerCase()) ||
          file.eName.toLowerCase().includes(search.toLowerCase())) &&
        (status === "" ||
          (status === "in" && file.eName === "Library") ||
          (status === "out" && file.eName !== "Library")) &&
        (department === "" || file.department === department)
    )
    .sort((a, b) => new Date(b.updateDate) - new Date(a.updateDate)); // Sort by updateDate descending

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                    <option value="Quality">Quality</option>
                    <option value="Dyeing">Dyeing</option>
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
          ) : currentFiles.length === 0 ? (
            <p className="text-gray-300 text-center">No files found.</p>
          ) : (
            <div className="flex flex-col items-center">
              <div className="shadow-lg mt-4 p-4 w-full max-w-3xl bg-[#4A4742] bg-opacity-80 rounded-lg space-y-3">
                {currentFiles.map((file, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center bg-opacity-80 text-white px-4 py-2 rounded-md shadow-md ${
                      file.eName === "Library" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    <div className="flex items-center w-full">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file)}
                        onChange={() => handleCheckboxChange(file)}
                        className="mr-2"
                      />
                      <div className="text-sm sm:text-base font-semibold text-center w-full">
                        {file.rcode} - {file.eName} - {file.epfNo || "N/A"} -{" "}
                        {file.contactNo || "N/A"} -{" "}
                        {new Date(file.updateDate).toLocaleString("en-LK", {
                          timeZone: "Asia/Colombo",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </div>
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
                      className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {selectedFiles.length > 0 && (
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => setDeleteModalOpen(true)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
              <button
                onClick={() => setTransferModalOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Transfer
              </button>
            </div>
          )}

          {/* Delete Modal */}
          {deleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded-lg w-96">
                <h3 className="text-xl mb-4">
                  Are you sure you want to delete the selected files?
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

          {/* Transfer Modal */}
          {transferModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded-lg w-96">
                <h3 className="text-xl mb-4">
                  Select Employee to Transfer Files
                </h3>
                <select
                  onChange={(e) => {
                    const selectedEmp = employees.find(
                      (emp) => emp.epfNo === e.target.value
                    );
                    setSelectedEmployee(selectedEmp);
                  }}
                  className="w-full p-2 mb-4 border rounded-md"
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.epfNo} value={emp.epfNo}>
                      {emp.eName} ({emp.epfNo}) -{" "}
                      {emp.contactNo || "No Contact"}
                    </option>
                  ))}
                </select>
                <div className="flex justify-between">
                  <button
                    onClick={() => setTransferModalOpen(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!selectedEmployee) {
                        alert("Please select an employee.");
                      } else {
                        setTransferModalOpen(false);
                        setConfirmTransferOpen(true);
                      }
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Transfer Confirmation Modal */}
          {confirmTransferOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded-lg w-96">
                <h3 className="text-xl mb-4">
                  Confirm transfer to {selectedEmployee.eName} (
                  {selectedEmployee.epfNo})?
                </h3>
                <div className="flex justify-between">
                  <button
                    onClick={() => setConfirmTransferOpen(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleTransfer}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Files;

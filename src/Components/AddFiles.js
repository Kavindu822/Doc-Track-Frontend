import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";

const AddFiles = () => {
  const [rcode, setRcode] = useState("");
  const [eName, setEName] = useState("Library");
  const [epfNo, setEpfNo] = useState("Library");
  const [contactNo, setContactNo] = useState("N/A");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Get current Sri Lanka time as ISO string
  const getSriLankaDateTimeISO = () => {
    return new Date()
      .toLocaleString("sv-SE", { timeZone: "Asia/Colombo" })
      .replace(" ", "T");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDateTime = getSriLankaDateTimeISO(); // Get current SL time

    const newFile = {
      rcode,
      eName,
      epfNo,
      contactNo,
      getDate: currentDateTime,
      updateDate: currentDateTime,
      department,
    };

    try {
      const response = await axios.post("/api/RcodeFiles", newFile);

      if (response.status === 200 || response.status === 201) {
        setSuccess("File added successfully!");
        setError(null);
      } else {
        setSuccess(null);
        setError("Failed to add file.");
      }

      setRcode("");
      setDepartment("");
    } catch (err) {
      setSuccess(null);
      setError("Failed to add file.");
      console.error("Error adding file:", err);
    }
  };

  const handleReset = () => {
    setRcode("");
    setEName("Library");
    setEpfNo("Library");
    setContactNo("N/A");
    setDepartment("");
    setSuccess(null);
    setError(null);
  };

  return (
    <div className="flex h-screen bg-primaryBg">
      <AdminNavbar />
      <div className="relative flex flex-col w-full h-screen">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>

        <div className="relative flex flex-col w-full items-center p-4 z-30">
          <div className="w-full max-w-4xl bg-[#948D82] bg-opacity-80 rounded-lg shadow-lg p-6">
            <div className="w-full lg:w-3/4 px-4 lg:px-8">
              {success ? (
                <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Success</h3>
                  <p>{success}</p>
                  <button
                    onClick={handleReset}
                    className="mt-4 px-5 py-2 bg-blue-500 text-white font-semibold rounded-md"
                  >
                    Add Another File
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label
                      htmlFor="rcode"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      File Code
                    </label>
                    <input
                      type="text"
                      id="rcode"
                      value={rcode}
                      onChange={(e) => setRcode(e.target.value)}
                      required
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="department"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Department
                    </label>
                    <select
                      id="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Department</option>
                      <option value="Deying">Deying</option>
                      <option value="Quality">Quality</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="eName"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Employee Name
                    </label>
                    <input
                      type="text"
                      id="eName"
                      value={eName}
                      onChange={(e) => setEName(e.target.value)}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="epfNo"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      EPF No
                    </label>
                    <input
                      type="text"
                      id="epfNo"
                      value={epfNo}
                      onChange={(e) => setEpfNo(e.target.value)}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="contactNo"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Contact No
                    </label>
                    <input
                      type="text"
                      id="contactNo"
                      value={contactNo}
                      onChange={(e) => setContactNo(e.target.value)}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md"
                    >
                      Add File
                    </button>
                  </div>
                </form>
              )}

              {error && (
                <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded shadow-md">
                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFiles;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const SeatTransfer = () => {
  const [employees, setEmployees] = useState([]); // Store employee data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Store selected employee
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employee data from backend
    const fetchEmployees = async () => {
      try {
        const response = await fetch("https://run.mocky.io/v3/3bf37652-c737-4eb0-acae-5477f7bafd92"); // Replace with actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }
        const data = await response.json();
        setEmployees(data); // Store employee data
      } catch (err) {
        setError(err.message); // Handle error
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchEmployees(); // Call fetchEmployees on component mount
  }, []);

  // Handle employee selection
  const handleEmployeeSelect = (emp) => {
    setSelectedEmployee(emp); // Set the selected employee
  };

  // Handle "Library" selection
  const handleLibrarySelect = () => {
    setSelectedEmployee({ EmployeeNo: "Library", EmployeeName: "Library" });
  };

  return (
    <div className="flex items-center h-screen bg-primaryBg">
      <NavBar onSeatTransferClick={() => navigate("/seat-transfer")} />
      <div className="relative flex flex-col items-center justify-end w-full h-screen">
        {/* Background */}
        <div
          className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>

        {/* Foreground Content */}
        <div className="relative h-4/5 z-10 p-5 rounded-lg w-1/3 shadow-lg text-center">
          {selectedEmployee ? (
            // If an employee or "Library" is selected, show success message
            <div className="text-white font-bold text-lg">
              <p>Assignment Successful to {selectedEmployee.EmployeeName}</p>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-4 text-white">Assign this file to whom?</h2>
              {loading ? (
                <p className="text-gray-600">Loading employees...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="p-4">
                  {/* First 7 static rows */}
                  <div className="mb-4">
                    {employees.slice(0, 7).map((emp) => (
                      <button
                        key={emp.RCode}
                        onClick={() => handleEmployeeSelect(emp)} // Set the selected employee
                        className="bg-[#00a2cd] text-white text-center py-2 px-4 m-2 rounded-full w-full hover:bg-blue-600"
                      >
                        {emp.EmployeeNo} - {emp.EmployeeName}
                      </button>
                    ))}
                  </div>

                  {/* Scrollable container for remaining employees */}
                  <div className="max-h-[280px] overflow-y-auto">
                    {employees.slice(7).map((emp) => (
                      <button
                        key={emp.RCode}
                        onClick={() => handleEmployeeSelect(emp)} // Set the selected employee
                        className="bg-[#00a2cd] text-white text-center py-2 px-4 m-2 rounded-full w-full hover:bg-blue-600"
                      >
                        {emp.EmployeeNo} - {emp.EmployeeName}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Default Library option */}
              <button
                onClick={handleLibrarySelect} // Set the selected employee to "Library"
                className="bg-[#00a2cd] text-white text-center py-2 px-4 m-2 rounded-full w-full hover:bg-blue-600"
              >
                Library
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatTransfer;

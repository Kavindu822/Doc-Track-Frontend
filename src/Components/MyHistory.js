import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";

const MyHistory = () => {
   const [files, setFiles] = useState([]); // Store fetched files
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
  // Error state

  useEffect(() => {
    // Fetch data from backend
    const fetchFiles = async () => {
      try {
        const response = await fetch("https://run.mocky.io/v3/8fd55c13-f5cb-4ec7-b0f3-3fdbafe886fc"); // Replace with your API URL
        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }
        const data = await response.json();
        setFiles(data); // Update state with fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);
  return (
    <div className="flex items-center h-screen bg-primaryBg">
      <NavBar />
    <div className="relative flex flex-col items-center justify-end w-full h-screen">
      {/* Background with Darkened Image */}
      <div 
        className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      ></div>

      {/* Foreground Content (Stays Bright) */}
      <div className="relative z-10 rounded-lg w-2/3 h-2/3">
        <div className="h-1/2 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700 m-3">
          {loading ? (
            <p className="text-white text-center">Loading files...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            files.map((file, index) => (
              <div
                key={index}
                className="bg-[#00a2cd] text-white text-center py-2 m-2 rounded-full"
              >
                {file.RCode} - {file.GetDate} -{file.EmployeeName} - {file.EmployeeNo} 

              </div>
            ))
          )}
        </div>
      </div>
    </div>
</div>
  );
};

export default  MyHistory ;

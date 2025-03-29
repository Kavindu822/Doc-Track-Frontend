import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { AiOutlineSearch } from "react-icons/ai";

const Deyin = () => {
    const [files, setFiles] = useState([]); // Store files
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // Dummy file data
        const dummyFiles = [
            { RCode: "R6784", Name: "Saman Kumara", EmpCode: "E200345", Contact: "0718723654", GetDate: "2025/03/20" },
            { RCode: "R200234", Name: "Saman Kumara", EmpCode: "E200345", Contact: "0774567321", GetDate: "2025/03/06" },
            { RCode: "R200234", Name: "Library", EmpCode: "", Contact: "", GetDate: "2025/03/06" },
            { RCode: "R200234", Name: "Library", EmpCode: "", Contact: "", GetDate: "2025/03/06" },
            { RCode: "R200234", Name: "Saman Kumara", EmpCode: "E200345", Contact: "0774567321", GetDate: "2025/03/06" },
        ];

        setFiles(dummyFiles);
        setLoading(false);
    }, []);

    return (
        <div className="flex h-screen bg-primaryBg">
            <AdminNavbar />
            <div className="relative flex flex-col w-full h-screen">
                {/* Search Bar */}
                <div className="flex items-center justify-center p-4 bg-gray-800 text-white shadow-md">
                    <AiOutlineSearch className="text-xl mr-2" />
                    <input 
                        type="text" 
                        placeholder="Search File" 
                        className="px-4 py-2 w-1/3 bg-gray-700 text-white rounded-lg focus:outline-none"
                    />
                </div>
                {/* Background with Darkened Image */}
                <div 
                    className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
                    style={{ backgroundImage: "url('/bg.jpg')" }}
                ></div>
                {/* File List Container */}
                <div className="relative z-10 w-full h-full p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
                    {loading ? (
                        <p className="text-white text-center">Loading files...</p>
                    ) : error ? (
                        <p className="text-red-500 text-center">{error}</p>
                    ) : (
                        files.map((file, index) => (
                            <div
                                key={index}
                                className={`text-white text-center py-2 px-4 m-2 rounded-full ${file.Name === "Library" ? "bg-blue-500" : "bg-red-500"}`}
                            >
                                {file.RCode} - {file.Name} {file.EmpCode && `- ${file.EmpCode}`} {file.Contact && `- ${file.Contact}`} - {file.GetDate}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Deyin;
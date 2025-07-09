// import React, { useState } from "react";
// import AdminNavbar from "./AdminNavbar";
// import axios from "axios";

// const AddFiles = () => {
//   const [rcode, setRcode] = useState("");
//   const [eName, setEName] = useState("Library");
//   const [epfNo, setEpfNo] = useState("Library");
//   const [contactNo, setContactNo] = useState("N/A");
//   const [department, setDepartment] = useState("");
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [qrCodeUrl, setQrCodeUrl] = useState(null);

//   const getSriLankaDateTimeISO = () => {
//     return new Date()
//       .toLocaleString("sv-SE", { timeZone: "Asia/Colombo" })
//       .replace(" ", "T");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const currentDateTime = getSriLankaDateTimeISO();

//     const newFile = {
//       rcode,
//       eName,
//       epfNo,
//       contactNo,
//       getDate: currentDateTime,
//       updateDate: currentDateTime,
//       department,
//     };

//     try {
//       const response = await axios.post(`/api/RcodeFiles`, newFile);

//       if (response.status === 200 || response.status === 201) {
//         setSuccess("File added successfully!");
//         setError(null);
//         setQrCodeUrl(`/api/QRCode/GenerateQRCode?QRCodeText=${rcode}`);
//       } else {
//         setSuccess(null);
//         setError("Failed to add file.");
//         setQrCodeUrl(null);
//       }
//     } catch (err) {
//       setSuccess(null);
//       setError("Failed to add file.");
//       setQrCodeUrl(null);
//       console.error("Error adding file:", err);
//     }
//   };

//   const handleReset = () => {
//     setRcode("");
//     setEName("Library");
//     setEpfNo("Library");
//     setContactNo("N/A");
//     setDepartment("");
//     setSuccess(null);
//     setError(null);
//     setQrCodeUrl(null);
//   };

//   const handleCanvasDownload = async () => {
//     const canvas = document.getElementById("qrCanvas");
//     const ctx = canvas.getContext("2d");

//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.src = qrCodeUrl;

//     img.onload = () => {
//       // Set canvas background to white
//       ctx.fillStyle = "#FFFFFF";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // Draw QR code
//       ctx.drawImage(img, 0, 0, 200, 200);

//       // Add label
//       ctx.fillStyle = "#000000";
//       ctx.font = "bold 16px Arial";
//       ctx.textAlign = "center";
//       ctx.fillText(rcode, 100, 230);

//       // Trigger download
//       const link = document.createElement("a");
//       link.download = `QRCode_${rcode}.png`;
//       link.href = canvas.toDataURL("image/png");
//       link.click();
//     };
//   };

//   return (
//     <div className="flex h-screen bg-primaryBg">
//       <AdminNavbar />
//       <div className="relative flex flex-col w-full h-screen pt-16 sm:pt-0">
//         <div
//           className="absolute inset-0 bg-center bg-cover bg-no-repeat"
//           style={{ backgroundImage: "url('/bg.jpg')" }}
//         ></div>

//         <div className="relative flex flex-col w-full items-center p-4 pt-24 z-30">
//           <div className="w-full max-w-4xl bg-[#948D82] bg-opacity-80 rounded-lg shadow-lg p-6">
//             <div className="w-full lg:w-3/4 px-4 lg:px-8">
//               {success ? (
//                 <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded shadow-md">
//                   <h3 className="text-lg font-semibold mb-2">Success</h3>
//                   <p>{success}</p>

//                   {qrCodeUrl && (
//                     <div className="mt-4 flex flex-col items-center">
//                       <canvas
//                         id="qrCanvas"
//                         width={200}
//                         height={250}
//                         className="border border-gray-300"
//                       ></canvas>
//                       <button
//                         onClick={handleCanvasDownload}
//                         className="mt-2 text-blue-700 underline"
//                       >
//                         Download QR Code with Label
//                       </button>
//                     </div>
//                   )}

//                   <button
//                     onClick={handleReset}
//                     className="mt-4 px-5 py-2 bg-blue-500 text-white font-semibold rounded-md"
//                   >
//                     Add Another File
//                   </button>
//                 </div>
//               ) : (
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-3">
//                     <label
//                       htmlFor="rcode"
//                       className="block text-sm font-semibold text-gray-700"
//                     >
//                       File Code
//                     </label>
//                     <input
//                       type="text"
//                       id="rcode"
//                       value={rcode}
//                       onChange={(e) => setRcode(e.target.value)}
//                       required
//                       className="w-full p-2 mt-1 border border-gray-300 rounded-md"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label
//                       htmlFor="department"
//                       className="block text-sm font-semibold text-gray-700"
//                     >
//                       Department
//                     </label>
//                     <select
//                       id="department"
//                       value={department}
//                       onChange={(e) => setDepartment(e.target.value)}
//                       required
//                       className="w-full p-2 mt-1 border border-gray-300 rounded-md"
//                     >
//                       <option value="">Select Department</option>
//                       <option value="Dyeing">Dyeing-Lanka</option>
//                       <option value="Quality">Quality-Lanka</option>
//                       <option value="DyeingI">Dyeing-India</option>
//                     </select>
//                   </div>

//                   <div className="mb-3">
//                     <label
//                       htmlFor="eName"
//                       className="block text-sm font-semibold text-gray-700"
//                     >
//                       Employee Name
//                     </label>
//                     <input
//                       type="text"
//                       id="eName"
//                       value={eName}
//                       onChange={(e) => setEName(e.target.value)}
//                       className="w-full p-2 mt-1 border border-gray-300 rounded-md"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label
//                       htmlFor="epfNo"
//                       className="block text-sm font-semibold text-gray-700"
//                     >
//                       EPF No
//                     </label>
//                     <input
//                       type="text"
//                       id="epfNo"
//                       value={epfNo}
//                       onChange={(e) => setEpfNo(e.target.value)}
//                       className="w-full p-2 mt-1 border border-gray-300 rounded-md"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label
//                       htmlFor="contactNo"
//                       className="block text-sm font-semibold text-gray-700"
//                     >
//                       Contact No
//                     </label>
//                     <input
//                       type="text"
//                       id="contactNo"
//                       value={contactNo}
//                       onChange={(e) => setContactNo(e.target.value)}
//                       className="w-full p-2 mt-1 border border-gray-300 rounded-md"
//                     />
//                   </div>

//                   <div className="mt-4">
//                     <button
//                       type="submit"
//                       className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md"
//                     >
//                       Add File
//                     </button>
//                   </div>
//                 </form>
//               )}

//               {error && (
//                 <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded shadow-md">
//                   <p>{error}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddFiles;

import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AddFiles = () => {
  const [rcode, setRcode] = useState("");
  const [eName, setEName] = useState("Library");
  const [epfNo, setEpfNo] = useState("Library");
  const [contactNo, setContactNo] = useState("N/A");
  const [department, setDepartment] = useState("");
  const [userDept, setUserDept] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get Sri Lanka time in ISO format
  const getSriLankaDateTimeISO = () => {
    return new Date()
      .toLocaleString("sv-SE", { timeZone: "Asia/Colombo" })
      .replace(" ", "T");
  };

  // Decode JWT from localStorage to get user department
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("No token found. Please login.");
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserDept(decoded.Department || "");
    } catch (err) {
      setError("Failed to decode token.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDateTime = getSriLankaDateTimeISO();

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
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/RcodeFiles`,
        newFile
      );

      if (response.status === 200 || response.status === 201) {
        setSuccess("File added successfully!");
        setError(null);
        setQrCodeUrl(
          `${process.env.REACT_APP_API_URL}/QRCode/GenerateQRCode?QRCodeText=${rcode}`
        );
      } else {
        setSuccess(null);
        setError("Failed to add file.");
        setQrCodeUrl(null);
      }
    } catch (err) {
      setSuccess(null);
      setError("Failed to add file.");
      setQrCodeUrl(null);
    }
  };

  // Reset form handler
  const handleReset = () => {
    setRcode("");
    setEName("Library");
    setEpfNo("Library");
    setContactNo("N/A");
    setDepartment("");
    setSuccess(null);
    setError(null);
    setQrCodeUrl(null);
  };

  // Download QR Code canvas as PNG
  const handleCanvasDownload = () => {
    const canvas = document.getElementById("qrCanvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = qrCodeUrl;

    img.onload = () => {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 200, 200);
      ctx.fillStyle = "#000000";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(rcode, 100, 230);
      const link = document.createElement("a");
      link.download = `QRCode_${rcode}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  };

  // Render department options based on userDept
  const getDepartmentOptions = () => {
    if (userDept === "Dyeing-India") {
      return [{ value: "Dyeing-India", label: "Dyeing-India" }];
    } else {
      return [
        { value: "Dyeing-Lanka", label: "Dyeing-Lanka" },
        { value: "Quality-Lanka", label: "Quality-Lanka" },
      ];
    }
  };

  return (
    <div className="flex h-screen bg-primaryBg">
      <AdminNavbar />
      <div className="relative flex flex-col w-full h-screen pt-16 sm:pt-0">
        <div
          className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>

        <div className="relative flex flex-col w-full items-center p-4 pt-24 z-30">
          <div className="w-full max-w-4xl bg-[#948D82] bg-opacity-80 rounded-lg shadow-lg p-6">
            <div className="w-full lg:w-3/4 px-4 lg:px-8">
              {loading ? (
                <div className="text-center py-6">
                  Loading department options...
                </div>
              ) : success ? (
                <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Success</h3>
                  <p>{success}</p>
                  {qrCodeUrl && (
                    <div className="mt-4 flex flex-col items-center">
                      <canvas
                        id="qrCanvas"
                        width={200}
                        height={250}
                        className="border border-gray-300"
                      ></canvas>
                      <button
                        onClick={handleCanvasDownload}
                        className="mt-2 text-blue-700 underline"
                      >
                        Download QR Code with Label
                      </button>
                    </div>
                  )}
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
                      {getDepartmentOptions().map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="eName"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Employee Name
                    </label>
                    <select
                      id="eName"
                      value={eName}
                      onChange={(e) => {
                        const selected = e.target.value;
                        setEName(selected);
                        if (selected === "Library") {
                          setEpfNo("Library");
                        } else {
                          setEpfNo("");
                        }
                      }}
                      required
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    >
                      <option value="Colour Lab">Colour Lab</option>
                      <option value="Library">Library</option>
                    </select>
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
                  {error}
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

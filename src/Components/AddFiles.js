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

//   // Get current Sri Lanka time as ISO string
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
//       const response = await axios.post("/api/RcodeFiles", newFile);

//       if (response.status === 200 || response.status === 201) {
//         setSuccess("File added successfully!");
//         setError(null);
//         // Set QR code URL to display image
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

//   // New function to download QR code as image file
//   const downloadQRCode = async () => {
//     try {
//       const response = await axios.get(
//         `/api/QRCode/GenerateQRCode?QRCodeText=${rcode}`,
//         { responseType: "blob" } // important: get response as blob
//       );

//       // Create a blob URL for the image
//       const url = window.URL.createObjectURL(new Blob([response.data]));

//       // Create a temporary link element and click it programmatically
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `QRCode_${rcode}.png`);

//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       // Release the blob URL
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error("Failed to download QR code:", err);
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

//   return (
//     <div className="flex h-screen bg-primaryBg">
//       <AdminNavbar />
//       <div className="relative flex flex-col w-full h-screen">
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
//                       <img
//                         src={qrCodeUrl}
//                         alt="QR Code"
//                         className="w-40 h-40 border border-gray-300"
//                       />
//                       <button
//                         onClick={downloadQRCode}
//                         className="mt-2 text-blue-700 underline"
//                       >
//                         Download QR Code
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
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  const getSriLankaDateTimeISO = () => {
    return new Date()
      .toLocaleString("sv-SE", { timeZone: "Asia/Colombo" })
      .replace(" ", "T");
  };

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
      const response = await axios.post("/api/RcodeFiles", newFile);

      if (response.status === 200 || response.status === 201) {
        setSuccess("File added successfully!");
        setError(null);
        setQrCodeUrl(`/api/QRCode/GenerateQRCode?QRCodeText=${rcode}`);
      } else {
        setSuccess(null);
        setError("Failed to add file.");
        setQrCodeUrl(null);
      }
    } catch (err) {
      setSuccess(null);
      setError("Failed to add file.");
      setQrCodeUrl(null);
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
    setQrCodeUrl(null);
  };

  const handleCanvasDownload = async () => {
    const canvas = document.getElementById("qrCanvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = qrCodeUrl;

    img.onload = () => {
      // Set canvas background to white
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw QR code
      ctx.drawImage(img, 0, 0, 200, 200);

      // Add label
      ctx.fillStyle = "#000000";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(rcode, 100, 230);

      // Trigger download
      const link = document.createElement("a");
      link.download = `QRCode_${rcode}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  };

  return (
    <div className="flex h-screen bg-primaryBg">
      <AdminNavbar />
      <div className="relative flex flex-col w-full h-screen">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>

        <div className="relative flex flex-col w-full items-center p-4 pt-24 z-30">
          <div className="w-full max-w-4xl bg-[#948D82] bg-opacity-80 rounded-lg shadow-lg p-6">
            <div className="w-full lg:w-3/4 px-4 lg:px-8">
              {success ? (
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
                      <option value="Dyeing">Dyeing-Lanka</option>
                      <option value="Quality">Quality-Lanka</option>
                      <option value="DyeingI">Dyeing-India</option>
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

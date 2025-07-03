// import React, { useState, useRef, useEffect } from "react";
// import NavBar from "./NavBar";
// import QRScanner from "./QRScanner";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const TakeFile = () => {
//   const [showScanner, setShowScanner] = useState(false);
//   const [decodedJson, setDecodedJson] = useState(null);
//   const [scannerStream, setScannerStream] = useState(null);
//   const scannerRef = useRef(null);

//   const stopMediaStream = (stream) => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//     }
//   };

//   const handleScannerClose = () => {
//     stopMediaStream(scannerStream);
//     setScannerStream(null);
//     setShowScanner(false);
//   };

//   const handleScanSuccess = (data) => {
//     try {
//       let rcodesOnly = [];

//       if (data.startsWith("{") && data.includes("rcodes")) {
//         const parsed = JSON.parse(data);

//         if (Array.isArray(parsed.rcodes)) {
//           if (
//             parsed.rcodes.length === 1 &&
//             typeof parsed.rcodes[0] === "string" &&
//             parsed.rcodes[0].startsWith("[")
//           ) {
//             rcodesOnly = JSON.parse(parsed.rcodes[0]);
//           } else {
//             rcodesOnly = parsed.rcodes.map((rcode) => String(rcode).trim());
//           }
//         }
//       } else {
//         rcodesOnly = data.split(",").map((code) => code.trim());
//       }

//       const token = localStorage.getItem("jwtToken");
//       if (!token) {
//         alert("⚠️ Please log in first.");
//         return;
//       }

//       const decoded = jwtDecode(token);
//       const newEpfNo = String(decoded.EpfNo || decoded.epfNo || "");
//       const newEName = String(
//         decoded.FullName || decoded.eName || decoded.EName || ""
//       );
//       const newContactNo = String(decoded.ContactNo || decoded.contactNo || "");

//       const payload = {
//         rcodes: rcodesOnly,
//         newEpfNo,
//         newEName,
//         newContactNo,
//       };

//       console.log("✅ Cleaned Payload:", payload);

//       setDecodedJson(payload);
//       setShowScanner(false);
//     } catch (error) {
//       console.error("❌ Error parsing QR data:", error);
//       alert("❌ Failed to scan QR code.");
//     }
//   };

//   const handleScanError = (error) => {
//     console.error("❌ QR Scan Error:", error);
//   };

//   const handleTakeFile = async () => {
//     const token = localStorage.getItem("jwtToken");
//     console.log("JWT Token:", token);
//     if (!token) {
//       alert("⚠️ Please log in first.");
//       return;
//     }

//     console.log("Sending payload to server:", decodedJson);

//     try {
//       const response = await axios.put(
//         `/api/RcodeFiles/transfer-files-to-employee-or-via-qr`,
//         decodedJson,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("✅ Files transferred successfully!");
//       setDecodedJson(null);
//     } catch (error) {
//       console.error("❌ File transfer failed:", error);
//       alert("❌ File transfer failed.");
//     }
//   };

//   useEffect(() => {
//     return () => {
//       stopMediaStream(scannerStream);
//     };
//   }, [scannerStream]);

//   return (
//     <div className="flex items-center h-screen bg-primaryBg">
//       <NavBar />
//       <div className="relative flex flex-col items-center justify-end w-full h-screen p-4">
//         <div
//           className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
//           style={{ backgroundImage: "url('/bg.jpg')" }}
//         ></div>

//         <div className="relative flex flex-col items-center w-full h-3/4 mt-4">
//           <p className="text-sm font-bold text-center text-white sm:text-xl lg:text-2xl mt-6">
//             Place QR code inside the file to scan. Please avoid shaking to get
//             results quickly.
//           </p>

//           {showScanner ? (
//             <div className="mt-4 flex flex-col items-center">
//               <QRScanner
//                 onScanSuccess={handleScanSuccess}
//                 onScanError={handleScanError}
//                 fps={10}
//                 qrbox={300}
//                 ref={scannerRef}
//                 onStreamReady={(stream) => setScannerStream(stream)}
//               />

//               <div className="mt-4">
//                 <button
//                   onClick={handleScannerClose}
//                   className="bg-red-600 text-white px-4 py-2 rounded"
//                 >
//                   ❌ Close Camera
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <button
//               onClick={() => setShowScanner(true)}
//               className="bg-[#00a2cd] text-white p-3 m-3 rounded-lg text-xl font-extrabold"
//             >
//               📷 Place Camera
//             </button>
//           )}

//           {decodedJson && (
//             <>
//               <p className="text-green-400 text-lg font-semibold mt-6">
//                 ✅ Received successfully!
//               </p>
//               <div className="text-white mt-4 w-full max-w-lg p-4 bg-black bg-opacity-60 rounded-lg shadow-lg">
//                 <h3 className="text-2xl font-semibold mb-4">Scanned Data:</h3>
//                 <div className="text-sm">
//                   <p>
//                     <strong>Employee EPF No:</strong> {decodedJson.newEpfNo}
//                   </p>
//                   <p>
//                     <strong>Employee Name:</strong> {decodedJson.newEName}
//                   </p>
//                   <p>
//                     <strong>Contact Number:</strong> {decodedJson.newContactNo}
//                   </p>
//                   <p>
//                     <strong>R Codes:</strong>
//                   </p>
//                   <ul className="list-disc pl-5">
//                     {decodedJson.rcodes?.map((rcode, index) => (
//                       <li key={index}>{rcode}</li>
//                     ))}
//                   </ul>
//                 </div>
//                 <button
//                   onClick={handleTakeFile}
//                   className="mt-4 px-4 py-2 bg-green-600 text-white font-bold rounded"
//                 >
//                   📨 Take File
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TakeFile;

import React, { useState, useRef, useEffect } from "react";
import NavBar from "./NavBar";
import QRScanner from "./QRScanner";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; // 👈 Add this

const TakeFile = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [decodedJson, setDecodedJson] = useState(null);
  const [scannerStream, setScannerStream] = useState(null);
  const scannerRef = useRef(null);
  const navigate = useNavigate(); // 👈 Add this

  const stopMediaStream = (stream) => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const handleScannerClose = () => {
    stopMediaStream(scannerStream);
    setScannerStream(null);
    setShowScanner(false);
  };

  const handleScanSuccess = (data) => {
    try {
      let rcodesOnly = [];

      if (data.startsWith("{") && data.includes("rcodes")) {
        const parsed = JSON.parse(data);

        if (Array.isArray(parsed.rcodes)) {
          if (
            parsed.rcodes.length === 1 &&
            typeof parsed.rcodes[0] === "string" &&
            parsed.rcodes[0].startsWith("[")
          ) {
            rcodesOnly = JSON.parse(parsed.rcodes[0]);
          } else {
            rcodesOnly = parsed.rcodes.map((rcode) => String(rcode).trim());
          }
        }
      } else {
        rcodesOnly = data.split(",").map((code) => code.trim());
      }

      const token = localStorage.getItem("jwtToken");
      if (!token) {
        alert("⚠️ Please log in first.");
        return;
      }

      const decoded = jwtDecode(token);
      const newEpfNo = String(decoded.EpfNo || decoded.epfNo || "");
      const newEName = String(
        decoded.FullName || decoded.eName || decoded.EName || ""
      );
      const newContactNo = String(decoded.ContactNo || decoded.contactNo || "");

      const payload = {
        rcodes: rcodesOnly,
        newEpfNo,
        newEName,
        newContactNo,
      };

      setDecodedJson(payload);
      setShowScanner(false);
    } catch (error) {
      console.error("❌ Error parsing QR data:", error);
      alert("❌ Failed to scan QR code.");
    }
  };

  const handleScanError = (error) => {
    console.error("❌ QR Scan Error:", error);
  };

  const handleTakeFile = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("⚠️ Please log in first.");
      return;
    }

    try {
      await axios.put(
        `/api/RcodeFiles/transfer-files-to-employee-or-via-qr`,
        decodedJson,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("✅ Files transferred successfully!");
      setDecodedJson(null);
      navigate("/my-files"); // 👈 Navigate after success
    } catch (error) {
      console.error("❌ File transfer failed:", error);
      alert("❌ File transfer failed.");
    }
  };

  useEffect(() => {
    return () => {
      stopMediaStream(scannerStream);
    };
  }, [scannerStream]);

  return (
    <div className="flex items-center h-screen bg-primaryBg">
      <NavBar />
      <div className="relative flex flex-col items-center justify-end w-full h-screen p-4">
        <div
          className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>

        <div className="relative flex flex-col items-center w-full h-3/4 mt-4">
          <p className="text-sm font-bold text-center text-white sm:text-xl lg:text-2xl mt-6">
            Place QR code inside the file to scan. Please avoid shaking to get
            results quickly.
          </p>

          {showScanner ? (
            <div className="mt-4 flex flex-col items-center">
              <QRScanner
                onScanSuccess={handleScanSuccess}
                onScanError={handleScanError}
                fps={10}
                qrbox={300}
                ref={scannerRef}
                onStreamReady={(stream) => setScannerStream(stream)}
              />

              <div className="mt-4">
                <button
                  onClick={handleScannerClose}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  ❌ Close Camera
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowScanner(true)}
              className="bg-[#00a2cd] text-white p-3 m-3 rounded-lg text-xl font-extrabold"
            >
              📷 Place Camera
            </button>
          )}

          {decodedJson && (
            <>
              <p className="text-green-400 text-lg font-semibold mt-6">
                ✅ Scanned successfully!
              </p>
              <div className="text-white mt-4 w-full max-w-lg p-4 bg-black bg-opacity-60 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Scanned Data:</h3>
                <div className="text-sm">
                  <p>
                    <strong>Employee EPF No:</strong> {decodedJson.newEpfNo}
                  </p>
                  <p>
                    <strong>Employee Name:</strong> {decodedJson.newEName}
                  </p>
                  <p>
                    <strong>Contact Number:</strong> {decodedJson.newContactNo}
                  </p>
                  <p>
                    <strong>R Codes:</strong>
                  </p>
                  <ul className="list-disc pl-5">
                    {decodedJson.rcodes?.map((rcode, index) => (
                      <li key={index}>{rcode}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={handleTakeFile}
                  className="mt-4 px-4 py-2 bg-green-600 text-white font-bold rounded"
                >
                  📨 Take File
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakeFile;

import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import NavBar from "./NavBar";

const QRTransfer = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("https://run.mocky.io/v3/8fd55c13-f5cb-4ec7-b0f3-3fdbafe886fc");
        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }
        const data = await response.json();
        setFiles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files.map((file) => file.RCode));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelection = (rcode) => {
    setSelectedFiles((prev) =>
      prev.includes(rcode) ? prev.filter((id) => id !== rcode) : [...prev, rcode]
    );
  };

  const generateQRCode = () => {
    if (selectedFiles.length > 0) {
      setQrCodeData(JSON.stringify(selectedFiles));
      setShowQR(true);
    }
  };

  return (
    <div className="flex items-center h-screen bg-primaryBg">
      <NavBar />
      <div className="relative flex flex-col items-center justify-end w-full h-screen">
        <div 
          className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>
        {showQR && qrCodeData ? (
          <div className="flex flex-col items-center justify-center w-full h-screen bg-primaryBg relative">
            <div 
              className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
              style={{ backgroundImage: "url('/bg.jpg')" }}
            ></div>
            <div className="z-10 flex flex-col items-center rounded-lg shadow-lg">
              <QRCodeCanvas value={qrCodeData} size={300} className="p-4 bg-white rounded-lg shadow-lg" />
              <p  className="bg-red-500 p-5 rounded-lg text-white font-extrabold w-2/3 text-2xl m-4 flex justify-center"
              >Scan Me</p>
            </div>
          </div>
        ) : (
          <div className="z-10 rounded-lg w-2/3 p-4">
            <div className="flex items-center justify-between p-2 m-5 text-white font-extrabold">
              <p>Select File</p>
              <p>Select All</p>
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={selectAll} 
                  onChange={toggleSelectAll} 
                  className="w-5 h-5"
                />
              </label>
            </div>
            <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700 m-3">
              {loading ? (
                <p className="text-white text-center">Loading files...</p>
              ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
              ) : (
                files.map((file, index) => (
                  <div
                    key={index}
                    className="bg-[#00a2cd] text-white flex justify-center items-center py-2 px-4 m-2 rounded-full"
                  >
                    <span className="text-center w-full">{file.RCode} - {file.GetDate}</span>
                    <input 
                      type="checkbox" 
                      checked={selectedFiles.includes(file.RCode)} 
                      onChange={() => toggleSelection(file.RCode)}
                      className="w-5 h-5 ml-4"
                    />
                  </div>
                ))
              )}
            </div>
            <div className="flex justify-center mt-4">
              <button 
                onClick={generateQRCode} 
                className="bg-red-500 p-5 rounded-lg text-white font-extrabold w-1/3 text-2xl"
              >
                Generate QR
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRTransfer;

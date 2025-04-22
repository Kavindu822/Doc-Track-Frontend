import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import NavBar from "./NavBar";

const QRTransfer = ({ selectedFileIds, onCancel }) => {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (selectedFileIds && selectedFileIds.length > 0) {
      setQrCodeData(JSON.stringify(selectedFileIds));
      setShowQR(true);
    }
  }, [selectedFileIds]);

  return (
    <div className="flex items-center h-screen bg-primaryBg">
      <NavBar />
      <div className="relative flex flex-col items-center justify-center w-full h-screen">
        <div
          className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>

        {showQR && qrCodeData ? (
          <div className="z-10 flex flex-col items-center rounded-lg shadow-lg">
            <QRCodeCanvas
              value={qrCodeData}
              size={300}
              className="p-4 bg-white rounded-lg shadow-lg"
            />
            <p className="bg-red-500 p-5 rounded-lg text-white font-extrabold w-2/3 text-2xl m-4 flex justify-center">
              Scan Me
            </p>
            <button
              onClick={onCancel}
              className="bg-gray-800 px-6 py-3 rounded-lg text-white font-bold mt-4"
            >
              Back
            </button>
          </div>
        ) : (
          <p className="text-white z-10 text-2xl font-bold">
            No files selected for QR generation.
          </p>
        )}
      </div>
    </div>
  );
};

export default QRTransfer;

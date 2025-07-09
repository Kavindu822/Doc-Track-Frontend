import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";

const GenerateQR = () => {
  const [rcode, setRcode] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!rcode.trim()) {
      setError("Please enter a file name.");
      setSuccess(null);
      setQrCodeUrl(null);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/RcodeFiles/${rcode}/qr`);
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Failed to fetch QR Code");
        setSuccess(null);
        setQrCodeUrl(null);
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setQrCodeUrl(url);
      setError(null);
      setSuccess("QR Code generated successfully!");
    } catch (err) {
      console.error(err);
      setError("Server error while generating QR Code");
      setSuccess(null);
      setQrCodeUrl(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCanvasDownload = () => {
    const canvas = document.getElementById("qrCanvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = qrCodeUrl;

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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

  const handleReset = () => {
    setRcode("");
    setQrCodeUrl(null);
    setSuccess(null);
    setError(null);
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
          <div className="w-full max-w-2xl bg-[#948D82] bg-opacity-80 rounded-lg shadow-lg p-6">
            <div className="w-full px-4">
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
                    Generate Another QR
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleGenerate();
                  }}
                >
                  <div className="mb-4">
                    <label
                      htmlFor="rcode"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      File Name (Rcode)
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
                  <button
                    type="submit"
                    className="w-full px-5 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800"
                  >
                    {loading ? "Generating..." : "Generate QR Code"}
                  </button>
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

export default GenerateQR;

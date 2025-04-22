// import { Html5Qrcode } from "html5-qrcode";
// import { useEffect, useState, useRef } from "react";

// function QRScanner({ onScanSuccess, onScanError, fps = 10, qrbox = 250 }) {
//   const scannerRef = useRef(null); // Store scanner instance
//   const [isScannerRunning, setIsScannerRunning] = useState(false); // Track if the scanner is running

//   useEffect(() => {
//     const scanner = new Html5Qrcode("reader");
//     scannerRef.current = scanner;

//     const startScanner = async () => {
//       try {
//         await scanner.start(
//           { facingMode: "environment" }, // Start with environment camera
//           { fps, qrbox }, // Set frame rate and QR box size
//           (decodedText, decodedResult) => {
//             console.log("QR Code detected:", decodedText);
//             if (onScanSuccess) onScanSuccess(decodedText);
//           },
//           (errorMessage) => {
//             console.warn("Scan error:", errorMessage);
//             if (onScanError) onScanError(errorMessage);
//           }
//         );
//         setIsScannerRunning(true); // Mark scanner as running
//       } catch (error) {
//         console.error("Failed to start scanner:", error);
//       }
//     };

//     startScanner();

//     // Cleanup function to stop and clear the scanner when the component unmounts
//     return () => {
//       if (scannerRef.current && isScannerRunning) {
//         // Stop and clear the scanner properly
//         scannerRef.current
//           .stop()
//           .then(() => {
//             setIsScannerRunning(false); // Mark scanner as stopped
//             scannerRef.current.clear(); // Clear resources used by the scanner
//           })
//           .catch((error) => {
//             console.error("Error stopping scanner:", error);
//           });
//       }
//     };
//   }, [fps, qrbox, onScanSuccess, onScanError, isScannerRunning]);

//   return (
//     <div>
//       <h2>QR Scanner</h2>
//       <div id="reader" style={{ width: "300px", height: "300px" }}></div>
//     </div>
//   );
// }

// export default QRScanner;
// QRScanner.js
// QRScanner.js
import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = ({
  onScanSuccess,
  onScanError,
  fps = 10,
  qrbox = 250,
  onStreamReady,
}) => {
  const qrRegionId = "qr-reader";
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    html5QrCodeRef.current = new Html5Qrcode(qrRegionId);

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const cameraId = devices[0].id;

          html5QrCodeRef.current
            .start(
              cameraId,
              { fps, qrbox },
              (decodedText) => {
                onScanSuccess(decodedText);
              },
              (errorMessage) => {
                if (errorMessage !== "No QR code found") {
                  onScanError && onScanError(errorMessage);
                }
              }
            )
            .then(() => {
              const videoElem = document.querySelector("#qr-reader video");
              if (videoElem && videoElem.srcObject) {
                onStreamReady && onStreamReady(videoElem.srcObject);
              }
            })
            .catch((err) => {
              console.error("🚫 Failed to start scanner:", err);
              onScanError && onScanError(err);
            });
        } else {
          alert("No cameras found.");
        }
      })
      .catch((err) => {
        console.error("🚫 Camera access error:", err);
        onScanError && onScanError(err);
      });

    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current._isScanning) {
        html5QrCodeRef.current
          .stop()
          .then(() => html5QrCodeRef.current.clear())
          .catch((err) => {
            console.warn(
              "⚠️ Tried to stop scanner, but it wasn't running.",
              err
            );
          });
      }
    };
  }, []);

  return <div id={qrRegionId} style={{ width: 300 }} />;
};

export default QRScanner;

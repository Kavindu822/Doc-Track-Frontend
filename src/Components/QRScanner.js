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
          // Try to find environment-facing (back) camera
          const environmentCamera = devices.find(
            (device) =>
              device.label.toLowerCase().includes("back") ||
              device.label.toLowerCase().includes("environment")
          );

          const cameraId = environmentCamera
            ? environmentCamera.id
            : devices[0].id;

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

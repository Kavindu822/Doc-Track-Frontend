import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { QRCodeCanvas } from "qrcode.react";
import NavBar from "./NavBar";
const TakeFile = () => {
  return (
    <div className="flex items-center h-screen bg-primaryBg">
      <NavBar />
      <div className="relative flex flex-col items-center justify-end w-full h-screen">
        {/* Background with Darkened Image */}
        <div 
          className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>
        <div className="relative flex flex-col items-center w-full h-3/4">
          <p className="text-3xl font-bold text-center text-white sm:text-5xl lg:text-6xl">
            Place QR code inside the file to scan please avoid shake to get results quickly
          </p>
          <p className="text-black text-3xl bg-white">Scan me</p>
          {/* QR Code below Scan me text */}
          <QRCodeCanvas value="https://your-link.com" size={300} className="m-5 bg-white p-10" />
          <p className="bg-[#00a2cd] text-white p-5 m-5 rounded-lg text-3xl font-extrabold">Place Camera</p>
        </div>
      </div>
    </div>
  );
};

export default TakeFile;

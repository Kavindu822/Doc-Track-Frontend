import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";


const DocTrack = () => {
    return (
            <div 
                className="relative flex flex-col items-center justify-end w-full h-screen  space-y-6 bg-center bg-cover "
                style={{ backgroundImage: "url('/bg.jpg')" }}
            >
                <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>
                <div className="relative flex flex-col items-center w-full h-1/2">
                    <p className="text-3xl font-bold text-center text-white sm:text-5xl lg:text-6xl">
                        Track your document here
                    </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-1/2 sm:w-1/3 lg:w-1/4 h-auto max-w-xs text-[#00a2cd] animate-bounce"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                        />
                    </svg>
                    
                    {/* Search Bar Below the Arrow */}
                    <div className="relative flex items-center w-2/3 mt-8 sm:w-1/3 m-10">
                        <input
                            className="w-full p-3 pr-10 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
                            placeholder="R10345"
                        />
                        <AiOutlineSearch className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
                    </div>
                </div>
            </div>

        
    );
};

export default DocTrack;

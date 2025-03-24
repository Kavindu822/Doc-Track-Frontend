import { AiOutlineSearch } from "react-icons/ai";
import React, { useState,useNavigate } from "react";

const SignUp = () => {
     const navigate = useNavigate();
    
    return (
        <div className="flex items-center h-screen bg-primaryBg">
            {/* Left Section - 2/5 of the screen */}
            <div 
                className="relative flex flex-col items-center justify-end w-2/5 h-screen space-y-6 bg-center bg-cover"
                style={{ backgroundImage: "url('/bg.jpg')" }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative flex flex-col items-center w-full h-1/4">
                <div className="flex items-center justify-center gap-2 text-white">
                        <p>Already have an account?</p>
                        <button className="text-[#00a2cd] hover:opacity-90" onClick={() => navigate("/login")}>
                            Login
                        </button>
                </div>
                </div>
            </div>

            {/* Right Section - 3/5 of the screen */}
            <div className="flex items-center justify-center h-screen w-3/5 p-10 rounded-lg shadow-lg">
                <form className="w-full space-y-4">
                <div className="flex gap-4">
    {/* Left Side */}
    <div className="w-1/2 space-y-4">
        <input
            className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
            placeholder="Employee Name"
            type="text"
        />
        <input
            className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
            placeholder="Contact Number"
            type="number"
        />
        <input
            className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
            placeholder="Role"
            type="text"
        />
        <input
            className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
            placeholder="Password"
            type="password"
        />
    </div>

    {/* Right Side */}
    <div className="w-1/2 space-y-4">
        <input
            className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
            placeholder="EPF Number"
            type="text"
        />
        <input
            className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
            placeholder="Department"
            type="text"
        />
        <input
            className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
            placeholder="Seat Number"
            type="text"
        />
        <input
            className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
            placeholder="Confirm Password"
            type="password"
        />
    </div>
</div>

                    {/* Login Button */}
                    <div className="flex justify-center">
                        <button className="w-full sm:w-1/3 md:w-1/2 lg:w-1/3 xl:w-1/4 py-2 border rounded-full bg-[#00a2cd] text-white border-borderColor hover:opacity-90" onClick={() => navigate("/home")}>
                            Sign Up
                        </button>
                    </div>

                   
                </form>
            </div>
        </div>
    );
};

export default SignUp;

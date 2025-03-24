import React, { useState,useNavigate } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import DocTrack from "./DocTrack";

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center h-screen  bg-primaryBg">
            {/* Left Section */}

          <DocTrack/>

            {/* Right Section */}
            <div className="flex items-center justify-center w-full h-screen p-10 rounded-lg shadow-lg sm:w-3/5">
                <form className="w-full space-y-4">
                    {/* Username Input */}
                    <div>
                        <input
                            className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
                            placeholder="User Name"
                            type="text"
                        />
                    </div>
                    {/* Password Input */}
                    <div>
                        <input
                            className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
                            placeholder="Password"
                            type="password"
                        />
                    </div>

                    {/* Forgot Password Button */}
                    <div className="text-center">
                        <button className="text-secondaryText hover:underline">
                            Forgot Password?
                        </button>
                    </div>

{/* Login Button */}
<div className="flex justify-center">
    <button className="w-full sm:w-1/3 md:w-1/2 lg:w-1/3 xl:w-1/4 py-2 border rounded-full bg-[#00a2cd] text-white border-borderColor hover:opacity-90" onClick={() => navigate("/home")}>
        Login
    </button>
</div>


                    {/* Sign Up Section */}
                    <div className="flex items-center justify-center gap-2 text-secondaryText">
                        <p>Don't have an account?</p>
                        <button className="bg-primaryBg text-[#00a2cd] hover:opacity-90" onClick={() => navigate("/signup")} >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

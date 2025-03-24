import React, { useState } from "react";
import DocTrack from "./DocTrack";
import NavBar from "./NavBar";
const Home = () => {
    return (
        <div className="flex items-center h-screen bg-primaryBg">
            {/* Left Section */}
            <NavBar/>
            <DocTrack />
        </div>
    );
};

export default Home;

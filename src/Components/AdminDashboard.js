import React, { useState } from "react";
import DocTrack from "./DocTrack";
import AdminNavbar from "./AdminNavbar"
const AdminDashboard = () => {
    return (
        <div className="flex items-center h-screen bg-primaryBg">
            {/* Left Section */}
            <AdminNavbar/>
            <DocTrack/>
        </div>
    );
};

export default AdminDashboard;

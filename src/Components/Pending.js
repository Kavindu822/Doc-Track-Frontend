import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Pending = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState("");

  const fetchNotApprovedUsers = async (dept) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/UserAccounts/not-approved-users-by-department/${dept}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingUsers(response.data);
    } catch (err) {
      console.error("Failed to fetch not-approved users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded = jwtDecode(token);
      const userDept = decoded?.Department || decoded?.department; // Support both cases
      setDepartment(userDept);
      fetchNotApprovedUsers(userDept);
    }
  }, []);

  const handleApprove = async (epfNo) => {
    if (!window.confirm("Are you sure you want to approve this user?")) return;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/UserAccounts/approve/${epfNo}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Approval failed");

      setPendingUsers((prev) => prev.filter((user) => user.epfNo !== epfNo));
    } catch (error) {
      console.error("Approve error:", error);
    }
  };

  const handleRemove = async (epfNo) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/UserAccounts/delete/${epfNo}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      if (!response.ok) throw new Error("Remove failed");

      setPendingUsers((prev) => prev.filter((user) => user.epfNo !== epfNo));
    } catch (error) {
      console.error("Remove error:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <AdminNavbar />
      <div className="relative flex flex-col w-full h-screen pt-16 sm:pt-0">
        {/* Main Content */}
        <div
          className="flex-1 bg-cover bg-center p-4 sm:p-6 md:p-8 overflow-auto"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        >
          <div className="bg-black bg-opacity-60 p-4 sm:p-6 rounded-lg text-white min-h-full">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
              Pending Approvals
            </h2>

            {loading ? (
              <div className="text-center text-sm sm:text-base">Loading...</div>
            ) : pendingUsers.length === 0 ? (
              <p className="text-center text-sm sm:text-base">
                No pending users found.
              </p>
            ) : (
              <div className="space-y-4">
                {pendingUsers.map((user) => (
                  <div
                    key={user.epfNo}
                    className="bg-gray-800 bg-opacity-90 rounded-lg p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-md"
                  >
                    <div className="text-sm sm:text-base">
                      <p>
                        <strong>Name:</strong> {user.eName}
                      </p>
                      <p>
                        <strong>EPF No:</strong> {user.epfNo}
                      </p>
                      <p>
                        <strong>Role:</strong> {user.role}
                      </p>
                      <p>
                        <strong>Phone:</strong> {user.contactNo}
                      </p>
                      <p>
                        <strong>Department:</strong> {user.department}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                      <button
                        onClick={() => handleApprove(user.epfNo)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRemove(user.epfNo)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pending;

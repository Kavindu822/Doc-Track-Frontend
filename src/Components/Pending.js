import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";

const Pending = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotApprovedUsers = async () => {
      try {
        const response = await fetch("/api/UserAccounts/not-approved-users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch not-approved users");
        }

        const data = await response.json();
        console.log("Fetched pending users:", data);
        setPendingUsers(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setLoading(false);
      }
    };

    fetchNotApprovedUsers();
  }, []);

  const handleApprove = async (epfNo) => {
    const confirm = window.confirm(
      "Are you sure you want to approve this user?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(`/api/UserAccounts/approve/${epfNo}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Approval failed");
      }

      setPendingUsers((prev) => prev.filter((user) => user.epfNo !== epfNo));
    } catch (error) {
      console.error("Approve error:", error);
    }
  };

  const handleRemove = async (epfNo) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this user?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(`/api/UserAccounts/delete/${epfNo}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Remove failed");
      }

      setPendingUsers((prev) => prev.filter((user) => user.epfNo !== epfNo));
    } catch (error) {
      console.error("Remove error:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <AdminNavbar />

      {/* Main Content with background */}
      <div
        className="flex-1 bg-cover bg-center p-6 overflow-auto"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <div className="bg-black bg-opacity-60 p-6 rounded-lg text-white min-h-full">
          <h2 className="text-2xl font-bold mb-4">Pending Approvals</h2>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : pendingUsers.length === 0 ? (
            <p>No pending users found.</p>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((user) => (
                <div
                  key={user.epfNo}
                  className="flex items-center justify-between bg-gray-800 opacity-90 p-4 rounded-lg shadow-md"
                >
                  <div>
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
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApprove(user.epfNo)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRemove(user.epfNo)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
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
  );
};

export default Pending;

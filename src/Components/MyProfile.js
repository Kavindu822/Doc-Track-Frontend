import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("jwtToken"); // token from login

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/UserAccounts/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen bg-primaryBg">
        <p className="text-white">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-primaryBg">
      <Navbar />
      <div className="relative flex flex-col w-full h-screen pt-16 sm:pt-0">
        <div
          className="absolute inset-0 bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>
        <div className="relative z-10 p-8 text-white">
          <h1 className="text-2xl font-bold mb-4">My Profile</h1>
          <p>
            <strong>EPF No:</strong> {profile.epfNo}
          </p>
          <p>
            <strong>Name:</strong> {profile.eName}
          </p>
          <p>
            <strong>Contact No:</strong> {profile.contactNo}
          </p>
          <p>
            <strong>Department:</strong> {profile.department}
          </p>
          <p>
            <strong>Role:</strong> {profile.role}
          </p>
          <p>
            <strong>Seat No:</strong> {profile.seatNo}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {profile.isApproved ? "Approved" : "Pending"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

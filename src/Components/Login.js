import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DocTrack from "./DocTrack";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showMobileDocTrack, setShowMobileDocTrack] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("/api/UserAccounts/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ epfNo: username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid credentials");
      }

      const data = await response.json();
      if (!data.userAccount) throw new Error("Invalid response format");

      localStorage.setItem("jwtToken", data.token);
      navigate(
        data.userAccount.role === "Admin" ? "/admin-dashboard" : "/home"
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen bg-primaryBg relative overflow-hidden">
      {/* Desktop View: Show DocTrack always */}
      <div className="hidden sm:block w-1/2 border-r border-gray-300">
        <DocTrack />
      </div>

      {/* Mobile View: Slide-in DocTrack */}
      <div
        className={`fixed top-0 left-0 z-30 h-full w-full sm:hidden transition-transform duration-500 bg-[#102d3b] ${
          showMobileDocTrack ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo at the top - Mobile Only */}
        <div className="flex justify-center p-2">
          <img
            src="/logo1.jpg" // Prefer PNG with transparent background
            alt="Logo"
            className="h-24 w-auto"
          />
        </div>

        <DocTrack />

        <button
          onClick={() => setShowMobileDocTrack(false)}
          className="absolute top-2 right-2 text-white text-xl bg-red-600 rounded-full px-3 py-1 hover:bg-red-700"
        >
          ✕
        </button>
      </div>

      {/* Login Form (Always visible) */}
      <div className="flex items-center justify-center w-full sm:w-1/2 h-screen px-4">
        <form className="w-full max-w-md space-y-4" onSubmit={handleLogin}>
          <div className="flex justify-center">
            <img
              src="/logo1.jpg"
              alt="Logo"
              className="w-100 h-auto -mt-6 mb-20"
            />
          </div>

          <input
            className="w-full p-3 text-center border rounded-full bg-primaryBg text-secondaryText border-borderColor focus:ring-2 focus:ring-[#00a2cd]"
            placeholder="EPF Number"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            className="w-full p-3 text-center border rounded-full bg-primaryBg text-secondaryText border-borderColor focus:ring-2 focus:ring-[#00a2cd]"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="text-center">
            <button
              type="button"
              className="text-secondaryText hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 border rounded-full bg-[#00a2cd] text-white border-borderColor hover:opacity-90"
            >
              <strong>Login</strong>
            </button>
          </div>

          <div className="flex justify-center gap-2 text-secondaryText">
            <p>Don't have an account?</p>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-[#00a2cd] hover:underline"
            >
              <strong>Sign Up</strong>
            </button>
          </div>

          {/* Mobile-only Bottom Arrow Image Button */}
          <div className="sm:hidden fixed -left-16 z-60">
            <button
              type="button"
              onClick={() => setShowMobileDocTrack(true)}
              title="Track your document"
            >
              <img
                src="/arrow.jpg"
                alt="Track Arrow"
                className="w-40 object-contain"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

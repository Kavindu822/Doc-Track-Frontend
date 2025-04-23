// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DocTrack from "./DocTrack";

// const Login = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const response = await fetch("/api/UserAccounts/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ epfNo: username, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Invalid credentials");
//       }

//       const data = await response.json();
//       console.log("API Response:", data);

//       if (!data.userAccount) {
//         throw new Error("Invalid response format: Missing userAccount");
//       }

//       localStorage.setItem("jwtToken", data.token);
//       navigate(
//         data.userAccount.role === "Admin" ? "/admin-dashboard" : "/home"
//       );
//     } catch (err) {
//       console.error("Login Error:", err.message);
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="flex items-center h-screen bg-primaryBg">
//       <DocTrack />
//       <div className="flex items-center justify-center w-full h-screen p-2 rounded-lg shadow-lg sm:w-3/5">
//         <form className="w-full space-y-2" onSubmit={handleLogin}>
//           {/* Logo Image */}
//           <div className="flex justify-center">
//             <img
//               src="/logo1.jpg"
//               alt="Logo"
//               className="w-80 h-auto mt-4 mb-0" // Adjust mt-4 if you need it further down
//             />
//           </div>

//           <div>
//             <input
//               className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
//               placeholder="EPF Number"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <input
//               className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
//               placeholder="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {error && <p className="text-red-500 text-center">{error}</p>}

//           <div className="text-center">
//             <button
//               type="button"
//               className="text-secondaryText hover:underline"
//             >
//               Forgot Password?
//             </button>
//           </div>

//           <div className="flex justify-center">
//             <button
//               className="w-full sm:w-1/3 md:w-1/2 lg:w-1/3 xl:w-1/4 py-2 border rounded-full bg-[#00a2cd] text-white border-borderColor hover:opacity-90"
//               type="submit"
//             >
//               <strong>Login</strong>
//             </button>
//           </div>

//           <div className="flex items-center justify-center gap-2 text-secondaryText">
//             <p>Don't have an account?</p>
//             <button
//               className="bg-primaryBg text-[#00a2cd] hover:opacity-90"
//               type="button"
//               onClick={() => navigate("/signup")}
//             >
//               <strong>Sign Up</strong>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DocTrack from "./DocTrack";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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
      console.log("API Response:", data);

      if (!data.userAccount) {
        throw new Error("Invalid response format: Missing userAccount");
      }

      localStorage.setItem("jwtToken", data.token);
      navigate(
        data.userAccount.role === "Admin" ? "/admin-dashboard" : "/home"
      );
    } catch (err) {
      console.error("Login Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center h-screen bg-primaryBg">
      <DocTrack />
      <div className="flex items-center justify-center w-full h-screen p-2 rounded-lg shadow-lg sm:w-3/5">
        <form className="w-full space-y-2" onSubmit={handleLogin}>
          {/* Logo Image */}
          <div className="flex justify-center">
            <img
              src="/logo1.jpg"
              alt="Logo"
              className="w-80 h-auto mt-4 mb-0" // Adjust mt-4 if you need it further down
            />
          </div>

          <div>
            <input
              className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
              placeholder="EPF Number"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

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
              className="w-full sm:w-1/3 md:w-1/2 lg:w-1/3 xl:w-1/4 py-2 border rounded-full bg-[#00a2cd] text-white border-borderColor hover:opacity-90"
              type="submit"
            >
              <strong>Login</strong>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-secondaryText">
            <p>Don't have an account?</p>
            <button
              className="bg-primaryBg text-[#00a2cd] hover:opacity-90"
              type="button"
              onClick={() => navigate("/signup")}
            >
              <strong>Sign Up</strong>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

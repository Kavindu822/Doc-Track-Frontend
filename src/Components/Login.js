// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DocTrack from "./DocTrack";

// const Login = () => {
//     const navigate = useNavigate();
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null);

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError(null);

//         try {
//             const response = await fetch("https://your-backend-api.com/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ username, password }),
//             });

//             if (!response.ok) {
//                 throw new Error("Invalid credentials");
//             }

//             const data = await response.json();
//             localStorage.setItem("token", data.token);

//             const userRole = data.role; // Assume backend sends role as 'admin' or 'user'
//             if (userRole === "admin") {
//                 navigate("/admin-dashboard");
//             } else {
//                 navigate("/home");
//             }
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     return (
//         <div className="flex items-center h-screen bg-primaryBg">
//             {/* Left Section */}
//             <DocTrack />

//             {/* Right Section */}
//             <div className="flex items-center justify-center w-full h-screen p-10 rounded-lg shadow-lg sm:w-3/5">
//                 <form className="w-full space-y-4" onSubmit={handleLogin}>
//                     {/* Username Input */}
//                     <div>
//                         <input
//                             className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
//                             placeholder="User Name"
//                             type="text"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             required
//                         />
//                     </div>
//                     {/* Password Input */}
//                     <div>
//                         <input
//                             className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
//                             placeholder="Password"
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
                    
//                     {error && <p className="text-red-500 text-center">{error}</p>}

//                     {/* Forgot Password Button */}
//                     <div className="text-center">
//                         <button type="button" className="text-secondaryText hover:underline">
//                             Forgot Password?
//                         </button>
//                     </div>

//                     {/* Login Button */}
//                     <div className="flex justify-center">
//                         <button 
//                             className="w-full sm:w-1/3 md:w-1/2 lg:w-1/3 xl:w-1/4 py-2 border rounded-full bg-[#00a2cd] text-white border-borderColor hover:opacity-90"
//                             type="submit">
//                             Login
//                         </button>
//                     </div>

//                     {/* Sign Up Section */}
//                     <div className="flex items-center justify-center gap-2 text-secondaryText">
//                         <p>Don't have an account?</p>
//                         <button 
//                             className="bg-primaryBg text-[#00a2cd] hover:opacity-90" 
//                             type="button"
//                             onClick={() => navigate("/signup")}>Sign Up</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
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

    const handleLogin = (e) => {
        e.preventDefault();
        setError(null);

        // Dummy user data
        const dummyUsers = [
            { username: "admin", password: "admin123", role: "admin" },
            { username: "user", password: "user123", role: "user" }
        ];

        const foundUser = dummyUsers.find(
            (user) => user.username === username && user.password === password
        );

        if (foundUser) {
            localStorage.setItem("token", "dummy-jwt-token");
            if (foundUser.role === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/home");
            }
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="flex items-center h-screen bg-primaryBg">
            {/* Left Section */}
            <DocTrack />

            {/* Right Section */}
            <div className="flex items-center justify-center w-full h-screen p-10 rounded-lg shadow-lg sm:w-3/5">
                <form className="w-full space-y-4" onSubmit={handleLogin}>
                    {/* Username Input */}
                    <div>
                        <input
                            className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
                            placeholder="User Name"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    {/* Password Input */}
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

                    {/* Forgot Password Button */}
                    <div className="text-center">
                        <button type="button" className="text-secondaryText hover:underline">
                            Forgot Password?
                        </button>
                    </div>

                    {/* Login Button */}
                    <div className="flex justify-center">
                        <button 
                            className="w-full sm:w-1/3 md:w-1/2 lg:w-1/3 xl:w-1/4 py-2 border rounded-full bg-[#00a2cd] text-white border-borderColor hover:opacity-90"
                            type="submit">
                            Login
                        </button>
                    </div>

                    {/* Sign Up Section */}
                    <div className="flex items-center justify-center gap-2 text-secondaryText">
                        <p>Don't have an account?</p>
                        <button 
                            className="bg-primaryBg text-[#00a2cd] hover:opacity-90" 
                            type="button"
                            onClick={() => navigate("/signup")}>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

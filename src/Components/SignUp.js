// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import React, { useState } from "react";
// import { FaAngleDown } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     employeeName: "",
//     contactNumber: "",
//     role: "",
//     password: "",
//     epfNumber: "",
//     department: "",
//     seatNumber: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Phone number regex (basic validation for a 10-digit number)
//   const phoneNumberRegex = /^[0-9]{10}$/;

//   // Function to handle form input changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Function to handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form fields
//     if (
//       !formData.employeeName ||
//       !formData.contactNumber ||
//       !formData.role ||
//       !formData.password ||
//       !formData.confirmPassword
//     ) {
//       setError("Please fill all fields.");
//       return;
//     }

//     // Validate phone number format
//     if (!phoneNumberRegex.test(formData.contactNumber)) {
//       setError("Please enter a valid 10-digit phone number.");
//       return;
//     }

//     // Validate password match
//     if (formData.password !== formData.confirmPassword) {
//       setError("Password and Confirm Password do not match.");
//       return;
//     }

//     try {
//       const response = await fetch("/api/UserAccounts/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           epfNo: formData.epfNumber,
//           eName: formData.employeeName,
//           contactNo: formData.contactNumber, // ✅ FIXED
//           department: formData.department,
//           seatNo: formData.seatNumber,
//           password: formData.password,
//           role: formData.role,
//         }),
//       });

//       const data = await response.json();
//       console.log("API Response:", data);

//       if (response.ok) {
//         navigate("/"); // Redirect to login on success
//       } else {
//         setError(data?.message || "Signup failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//       setError("An error occurred. Please try again later.");
//     }
//   };

//   return (
//     <div className="flex items-center h-screen bg-primaryBg">
//       {/* Left Section */}
//       <div
//         className="relative flex flex-col items-center justify-end w-2/5 h-screen space-y-6 bg-center bg-cover"
//         style={{ backgroundImage: "url('/bg.jpg')" }}
//       >
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="relative flex flex-col items-center w-full h-1/4">
//           <div className="flex items-center justify-center gap-2 text-white">
//             {/* Bold the text and button */}
//             <p className="font-bold">Already have an account?</p>
//             <button
//               className="text-[#00a2cd] hover:opacity-90 font-bold"
//               onClick={() => navigate("/")}
//             >
//               Login
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center justify-center h-screen w-3/5 p-5 rounded-lg shadow-lg">
//         <form className="w-full space-y-4" onSubmit={handleSubmit}>
//           <div className="flex justify-center mt-0 mb-2">
//             <img src="/logo1.jpg" alt="Logo" className="w-80 h-auto" />
//           </div>
//           <div className="flex gap-4">
//             {/* Left Side */}
//             <div className="w-1/2 space-y-4">
//               <input
//                 className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
//                 placeholder="Employee Name"
//                 type="text"
//                 name="employeeName"
//                 value={formData.employeeName}
//                 onChange={handleChange}
//               />
//               <input
//                 className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
//                 placeholder="Contact Number"
//                 type="number"
//                 name="contactNumber"
//                 value={formData.contactNumber}
//                 onChange={handleChange}
//               />
//               <div className="relative">
//                 <select
//                   className="appearance-none w-full pl-4 pr-10 py-3 border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                 >
//                   <option value="" disabled hidden>
//                     Select Role
//                   </option>
//                   <option value="Admin">Admin</option>
//                   <option value="Employee">Employee</option>
//                 </select>
//                 <FaAngleDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
//               </div>
//               {/* Password Field with toggle */}
//               <div className="relative">
//                 <input
//                   className="w-full p-3 pr-10 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
//                   placeholder="Password"
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
//                 >
//                   {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//                 </button>
//               </div>
//             </div>

//             {/* Right Side */}
//             <div className="w-1/2 space-y-4">
//               <input
//                 className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
//                 placeholder="EPF Number"
//                 type="text"
//                 name="epfNumber"
//                 value={formData.epfNumber}
//                 onChange={handleChange}
//               />
//               <div className="relative">
//                 <select
//                   className="appearance-none w-full pl-4 pr-10 py-3 border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
//                   name="department"
//                   value={formData.department}
//                   onChange={handleChange}
//                 >
//                   <option value="" disabled hidden>
//                     Select Department
//                   </option>
//                   <option value="Deying">Dyeing</option>
//                   <option value="Quality">Quality</option>
//                 </select>
//                 <FaAngleDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
//               </div>
//               <input
//                 className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
//                 placeholder="Seat Number"
//                 type="text"
//                 name="seatNumber"
//                 value={formData.seatNumber}
//                 onChange={handleChange}
//               />
//               {/* Confirm Password Field with toggle */}
//               <div className="relative">
//                 <input
//                   className="w-full p-3 pr-10 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
//                   placeholder="Confirm Password"
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
//                 >
//                   {showConfirmPassword ? (
//                     <AiOutlineEyeInvisible />
//                   ) : (
//                     <AiOutlineEye />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {error && (
//             <div className="text-red-500 text-center">
//               <p>{error}</p>
//             </div>
//           )}

//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="w-full sm:w-1/3 md:w-1/2 lg:w-1/3 xl:w-1/4 py-2 border rounded-full bg-[#00a2cd] text-white border-borderColor hover:opacity-90"
//             >
//               <strong>Sign Up</strong>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeName: "",
    contactNumber: "",
    role: "",
    password: "",
    epfNumber: "",
    department: "",
    seatNumber: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // New states for mobile toggle
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showLeftPanel, setShowLeftPanel] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Optional: hide left panel when resizing to desktop
      if (window.innerWidth >= 768) {
        setShowLeftPanel(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Phone number regex (basic validation for a 10-digit number)
  const phoneNumberRegex = /^[0-9]{10}$/;

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (
      !formData.employeeName ||
      !formData.contactNumber ||
      !formData.role ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }

    // Validate phone number format
    if (!phoneNumberRegex.test(formData.contactNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    try {
      const response = await fetch("/api/UserAccounts/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          epfNo: formData.epfNumber,
          eName: formData.employeeName,
          contactNo: formData.contactNumber,
          department: formData.department,
          seatNo: formData.seatNumber,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        navigate("/"); // Redirect to login on success
      } else {
        setError(data?.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-primaryBg relative">
      {/* Arrow toggle button on mobile */}
      {isMobile && (
        <button
          onClick={() => setShowLeftPanel(!showLeftPanel)}
          className="absolute top-4 right-4 z-50 p-3 text-white bg-[#00a2cd] rounded-full md:hidden shadow-lg"
          aria-label="Toggle Left Panel"
          title="Toggle Left Panel"
        >
          <FaAngleDown
            className={`transform transition-transform duration-300 ${
              showLeftPanel ? "rotate-180" : "rotate-0"
            }`}
            size={24}
          />
        </button>
      )}

      {/* Left Section */}
      {(!isMobile || showLeftPanel) && (
        <div
          className={`relative flex flex-col items-center justify-center md:justify-end w-full md:w-2/5 h-60 md:h-full space-y-6 bg-center bg-cover transition-all duration-500`}
          style={{ backgroundImage: "url('/bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative flex flex-col items-center w-full h-full justify-center md:justify-end md:h-1/4 px-4 text-center">
            <p className="font-bold text-white mb-4 text-lg md:text-xl">
              Already have an account?
            </p>
            <button
              className="text-[#00a2cd] hover:opacity-90 font-bold text-lg"
              onClick={() => navigate("/")}
            >
              Login
            </button>
          </div>
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center justify-center w-full md:w-3/5 h-full p-5">
        <form className="w-full space-y-4 max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex justify-center mt-0 mb-2">
            <img src="/logo1.jpg" alt="Logo" className="w-80 h-auto" />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left Side Inputs */}
            <div className="flex-1 space-y-4">
              <input
                className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
                placeholder="Employee Name"
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
              />
              <input
                className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
                placeholder="Contact Number"
                type="number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
              <div className="relative">
                <select
                  className="appearance-none w-full pl-4 pr-10 py-3 border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    Select Role
                  </option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </select>
                <FaAngleDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              {/* Password Field with toggle */}
              <div className="relative">
                <input
                  className="w-full p-3 pr-10 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
                  tabIndex={-1}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>

            {/* Right Side Inputs */}
            <div className="flex-1 space-y-4">
              <input
                className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
                placeholder="EPF Number"
                type="text"
                name="epfNumber"
                value={formData.epfNumber}
                onChange={handleChange}
              />
              <div className="relative">
                <select
                  className="appearance-none w-full pl-4 pr-10 py-3 border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    Select Department
                  </option>
                  <option value="Deying">Dyeing</option>
                  <option value="Quality">Quality</option>
                </select>
                <FaAngleDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              <input
                className="w-full p-3 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
                placeholder="Seat Number"
                type="text"
                name="seatNumber"
                value={formData.seatNumber}
                onChange={handleChange}
              />
              {/* Confirm Password Field with toggle */}
              <div className="relative">
                <input
                  className="w-full p-3 pr-10 text-center border rounded-full text-secondaryText border-borderColor bg-primaryBg focus:ring-2 focus:ring-[#00a2cd] transition duration-200"
                  placeholder="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-center text-red-600 font-semibold">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#00a2cd] hover:bg-[#008bb1] text-white font-bold transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

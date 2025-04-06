import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import React, { useState } from "react";
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.employeeName ||
      !formData.contactNumber ||
      !formData.role ||
      !formData.password ||
      formData.password !== formData.confirmPassword
    ) {
      setError("Please fill all fields correctly!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5208/api/UserAccounts/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            epfNo: formData.epfNumber,
            name: formData.employeeName,
            phone: formData.contactNumber,
            department: formData.department,
            seatNo: formData.seatNumber,
            password: formData.password,
            role: formData.role,
          }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data); // For debugging

      if (response.ok) {
        navigate("/"); // ✅ Redirect to login on success
      } else {
        setError(data?.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center h-screen bg-primaryBg">
      {/* Left Section */}
      <div
        className="relative flex flex-col items-center justify-end w-2/5 h-screen space-y-6 bg-center bg-cover"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex flex-col items-center w-full h-1/4">
          <div className="flex items-center justify-center gap-2 text-white">
            <p>Already have an account?</p>
            <button
              className="text-[#00a2cd] hover:opacity-90"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center h-screen w-3/5 p-10 rounded-lg shadow-lg">
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            {/* Left Side */}
            <div className="w-1/2 space-y-4">
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
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="w-1/2 space-y-4">
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
                  <option value="Deying">Deying</option>
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
            <div className="text-red-500 text-center">
              <p>{error}</p>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-1/3 md:w-1/2 lg:w-1/3 xl:w-1/4 py-2 border rounded-full bg-[#00a2cd] text-white border-borderColor hover:opacity-90"
            >
              <strong>Sign Up</strong>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

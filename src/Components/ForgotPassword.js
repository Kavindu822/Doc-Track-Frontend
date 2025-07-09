import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [epfNo, setEpfNo] = useState("");
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/UserAccounts/set-new-password-after-temp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            epfNo,
            temporaryPassword,
            newPassword,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      setMessage(data.message);
      setTimeout(() => navigate("/"), 3000); // Redirect to login after success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-primaryBg">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleReset}
      >
        <h2 className="text-xl font-semibold text-center text-[#00a2cd] mb-4">
          Reset Password
        </h2>

        <input
          type="text"
          placeholder="EPF Number"
          value={epfNo}
          onChange={(e) => setEpfNo(e.target.value)}
          required
          className="w-full p-3 mb-3 border border-borderColor rounded-full"
        />

        <input
          type="password"
          placeholder="Temporary Password"
          value={temporaryPassword}
          onChange={(e) => setTemporaryPassword(e.target.value)}
          required
          className="w-full p-3 mb-3 border border-borderColor rounded-full"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full p-3 mb-3 border border-borderColor rounded-full"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-borderColor rounded-full"
        />

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {message && (
          <p className="text-green-500 text-center mb-2">{message}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-[#00a2cd] text-white rounded-full hover:opacity-90"
        >
          <strong>Reset Password</strong>
        </button>

        <div className="text-center mt-4">
          <button
            type="button"
            className="text-[#00a2cd] hover:underline"
            onClick={() => navigate("/")}
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;

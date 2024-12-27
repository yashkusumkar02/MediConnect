import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // To get token from path
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ClientResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility
    const { token: urlToken } = useParams(); // Use useParams to get the token from the URL path
  
    // Effect to set token from the URL
    useEffect(() => {
      if (urlToken) {
        setToken(urlToken); // Set the token from the URL
        console.log(urlToken);
      } else {
        toast.error("No reset token found!");
      }
    }, [urlToken]);
  
    // Handle password reset
    const handlePasswordReset = async () => {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords don't match!");
        return;
      }
  
      try {
        const response = await axios.post(
          // `http://localhost:3000/api/auth/client-reset-password/${token}`
          `${import.meta.env.VITE_API_BASE_URL_AUTH}/${token}`

          ,
          { password: newPassword }
        );
        toast.success(response.data.message || "Password reset successfully!");
      } catch (error) {
        toast.error(error.response?.data?.error || "Error resetting password.");
      }
    };
  
    // Toggle password visibility
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible); // Toggle the password visibility state
    };
  
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Reset Password</h2>
  
          {/* New Password Input */}
          <div className="relative mb-4">
            <input
              type={isPasswordVisible ? "text" : "password"} // Toggle input type based on visibility state
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Show/Hide Password Icon */}
            <i
              className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-xl ${isPasswordVisible ? "fa fa-eye-slash" : "fa fa-eye"}`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
  
          {/* Confirm Password Input */}
          <div className="relative mb-6">
            <input
              type={isPasswordVisible ? "text" : "password"} // Same for confirm password input
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i
              className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-xl ${isPasswordVisible ? "fa fa-eye-slash" : "fa fa-eye"}`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
  
          <div className="text-center">
            <button
              onClick={handlePasswordReset}
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reset Password
            </button>
          </div>
  
          <ToastContainer />
        </div>
      </div>
    );
  };
  

export default ClientResetPassword
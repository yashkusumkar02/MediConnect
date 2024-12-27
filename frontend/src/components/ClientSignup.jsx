// import React from 'react';
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS

const ClientSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const navigate = useNavigate();

  // State to toggle password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const validateForm = () => {
    const {
      name,
      email,
      password,
      phone,
      address,
      city,
      state,
      zipCode,
      dateOfBirth,
    } = formData;

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !zipCode ||
      !dateOfBirth
    ) {
      toast.error("All fields are required.");
      return false;
    }

    if (!/^\d+$/.test(zipCode)) {
      toast.error("Zip Code must be a number.");
      return false;
    }
    return true;
  };

  const formChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        // "http://localhost:3000/api/clients"
        `${import.meta.env.VITE_API_BASE_URL_CLIENT}`

        ,
        formData
      );
      if (response.status === 200) {
        toast.success(response.data.message); // Show success message

        // Add a timeout before navigating to the home page
        setTimeout(() => {
          navigate("/main"); // Redirect to home page after 3 seconds
        }, 3000); // 3000 milliseconds = 3 seconds
      } else {
        toast.error(response.data.message); // Show error message
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full overflow-y-auto">
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-6 text-center">Client Signup</h2>

        {/* Form */}
        <form onSubmit={handleFormSubmit} autoComplete="on">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div className="col-span-1">
              <label className="block">Full Name:</label>
              <input
                name="name"
                value={formData.name}
                onChange={formChange}
                type="text"
                className="w-full px-3 py-2 border rounded-md mt-1"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="block">Email:</label>
              <input
                name="email"
                value={formData.email}
                onChange={formChange}
                type="email"
                className="w-full px-3 py-2 border rounded-md mt-1"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="block">
                Password:
                <div className="relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={formChange}
                    className="w-full px-3 py-2 border rounded-md mt-1"
                    autoComplete="current-password"
                    placeholder="EG. Example@123"
                    required
                  />
                  <i
                    className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-xl ${
                      isPasswordVisible ? "fa fa-eye-slash" : "fa fa-eye"
                    }`}
                    onClick={togglePasswordVisibility}
                  ></i>
                </div>
              </label>
            </div>

            <div className="col-span-1">
              <label className="block">Phone Number:</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={formChange}
                type="tel"
                className="w-full px-3 py-2 border rounded-md mt-1"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="block">Date of Birth:</label>
              <input
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={formChange}
                type="date"
                className="w-full px-3 py-2 border rounded-md mt-1"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="block">Address:</label>
              <input
                name="address"
                value={formData.address}
                onChange={formChange}
                type="text"
                className="w-full px-3 py-2 border rounded-md mt-1"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="block">City:</label>
              <input
                name="city"
                value={formData.city}
                onChange={formChange}
                type="text"
                className="w-full px-3 py-2 border rounded-md mt-1"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="block">State:</label>
              <input
                name="state"
                value={formData.state}
                onChange={formChange}
                type="text"
                className="w-full px-3 py-2 border rounded-md mt-1"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="block">Zip Code:</label>
              <input
                name="zipCode"
                value={formData.zipCode}
                onChange={formChange}
                type="text"
                className="w-full px-3 py-2 border rounded-md mt-1"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Signup
            </button>
          </div>

          {/* Login Link */}
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ClientSignup;

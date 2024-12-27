import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import hospitalImage from "../assets/images/hospital.avif";
import Navbar from "./Navbar";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "font-awesome/css/font-awesome.min.css"; // Import Font Awesome CSS
import { Link } from "react-router-dom";

const HospitalDashboard = () => {
  const { hospitalInfo, setHospitalInfo, clearHospitalInfo } =
    useContext(UserContext);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [password, setPassword] = useState("");
  const [isUpdatePending, setIsUpdatePending] = useState(false);
  const navigate = useNavigate();

  // State to toggle password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  useEffect(() => {
const type = localStorage.getItem("type");
if ( type==="client") {
  console.log("Client logged in");
  window.location.href = "/main";
}

    if (hospitalInfo) {
      setFormData(hospitalInfo);
    }
  }, [hospitalInfo]);

  if (!hospitalInfo) {
    return <div>Loading...</div>;
  }

  const handleOpenUpdateModal = () => setUpdateModalOpen(true);
  const handleCloseUpdateModal = () => setUpdateModalOpen(false);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleNextStep = () => setCurrentStep(2);
  const handlePrevStep = () => setCurrentStep(1);
  const handleOpenDeleteModal = () => setDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        facilities: {
          ...prev.facilities,
          [name]: checked,
        },
      }));
    } else if (name.startsWith("openingHours")) {
      const [, day] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        openingHours: {
          ...prev.openingHours,
          [day]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const confirmCredentials = async () => {
    if (!hospitalInfo.id) {
      console.error("Error: hospital ID is missing", hospitalInfo.id);
      return;
    }

    try {
      const response = await axios.post(
        // "http://localhost:3000/api/hospitals/verify"
        `${import.meta.env.VITE_API_BASE_URL_HOSPITAL}/verify`

        ,
        {
          id: hospitalInfo.id,
          password,
        }
      );

      if (response.status === 200) {
        setEditModalOpen(true);
        setUpdateModalOpen(false);
        toast.success("Credentials verified successfully.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error verifying credentials:", error);
      toast.error(
        error.response?.data?.message || "Error verifying credentials"
      );
    }
  };

  const validateForm = () => {
    const {
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      specDrName,
      numberOfDoctors,
      numberOfNurses,
      aboutHospital,
      website,
      languagesSpoken,
      insuranceAccepted,
      emergencyContact,
      degree,
      experience,
      openingHours,
      closingHours,
    } = formData;

    let errors = [];

    // Email validation (required and valid format)
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.");
    }

    // Phone validation (required and valid format)
    if (!phone || !/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
    }

    // Address validation (required)
    if (!address) {
      toast.error("Address is required.");
    }

    // City validation (required)
    if (!city) {
      toast.error("City is required.");
    }

    // State validation (required)
    if (!state) {
      toast.error("State is required.");
    }

    // Zip Code validation (required and valid format)
    if (!zipCode || !/^\d{6}$/.test(zipCode)) {
      toast.error("Please enter a valid 6-digit zip code.");
    }

    // Specialty Doctor Name validation (required)
    if (!specDrName) {
      toast.error("Specialty Doctor Name is required.");
    }

    // Number of Doctors validation (required and numeric)
    if (!numberOfDoctors || isNaN(numberOfDoctors) || numberOfDoctors <= 0) {
      toast.error("Please enter a valid number for the number of doctors.");
    }

    // Number of Nurses validation (required and numeric)
    if (!numberOfNurses || isNaN(numberOfNurses) || numberOfNurses <= 0) {
      toast.error("Please enter a valid number for the number of nurses.");
    }

    // About Hospital validation (required)
    if (!aboutHospital) {
      toast.error("About Hospital is required.");
    }

    // Website validation (optional but valid URL format)
    if (website && !/^https?:\/\/[^\s]+$/.test(website)) {
      toast.error("Please enter a valid website URL.");
    }

    // Languages Spoken validation (optional)
    if (!languagesSpoken) {
      toast.error("Languages Spoken is required.");
    }

    // Insurance Accepted validation (optional)
    if (!insuranceAccepted) {
      toast.error("Insurance Accepted is required.");
    }

    // Emergency Contact validation (required)
    if (!emergencyContact) {
      toast.error("Emergency Contact is required.");
    }

    // Degree validation (optional)
    if (!degree) {
      toast.error("Degree is required.");
    }

    // Experience validation (optional)
    if (!experience) {
      toast.error("Experience is required.");
    }

    // Opening and Closing Hours validation (required)
    // if (!openingHours || !closingHours.end) {
    //   toast.error("Opening and Closing Hours are required.");
    // }

    // If there are any errors, show them using toast
    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.error(error); // Display each error as a toast
      });
      return false;
    }

    return true; // Form is valid if no errors
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/api/hospitals/update"
        // `${import.meta.env.VITE_API_BASE_URL_HOSPITAL}/update`

        ,
        {
          ...formData,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 202) {
        // Handle pending approval status
        setIsUpdatePending(true);
        toast.info(response.data.message);
        handleCloseEditModal();
        // Do not update context since the update is pending approval
      } else if (response.status === 200) {
        // Update was successful
        toast.success(response.data.message);
        handleCloseEditModal();
        setHospitalInfo(formData); // Update context with the new data
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Error updating profile");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const response = await axios.delete(
        // "http://localhost:3000/api/hospitals/delete"
        `${import.meta.env.VITE_API_BASE_URL_HOSPITAL}/delete`
        
        ,
        {
          data: {
            id: hospitalInfo.id,
            password,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile deleted successfully.");
        clearHospitalInfo(); // Clear hospital info from context and localStorage
        localStorage.removeItem("token");
        navigate("/admin-details");
        handleCloseDeleteModal();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error(error.response?.data?.message || "Error deleting profile");
    }
  };

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const facilities = hospitalInfo?.facilities || {};
  const availableFacilities = Object.entries(facilities).filter(
    ([, available]) => available
  );
  // const languages = Array.isArray(hospitalInfo?.languagesSpoken)
  //   ? hospitalInfo.languagesSpoken.join(', ')
  //   : 'Languages not available';

  console.log("formdata : ", formData);

  // Show a message once the update is pending
  const showPendingUpdateMessage = () => {
    if (isUpdatePending) {
      return (
        <div className="pending-update-message">
          <p className="text-yellow-800 bg-yellow-200 border-l-4 border-yellow-500 p-2 mt-4">
            Your update request is pending approval. When you got the mail from
            the MediConnect Then Please sign out and sign in to view the changes
            once approved.
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Navbar />
      <div className="max-w-8xl w-full mt-4 bg-white shadow-lg rounded-lg p-6 md:p-8">
        <ToastContainer />
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-start mb-6">
          <img
            src={hospitalImage}
            alt="Hospital Profile"
            className="rounded-full w-32 h-32 border-4 border-blue-400 shadow-lg mb-4 md:mb-0 md:mr-6 transition-transform duration-300 hover:scale-105 mx-auto md:mx-0"
          />

          <div className="flex flex-col justify-start md:flex-grow">
            {/* Pending update message */}
            {showPendingUpdateMessage()}
            <h2 className="text-3xl font-bold text-blue-800">
              {hospitalInfo?.name || "Hospital Name"}
            </h2>
            <p className="text-lg text-gray-700 mt-1">
              {hospitalInfo?.aboutHospital || "About the hospital"}
            </p>
            <div className="text-gray-600 mt-2">
              <p>Email: {hospitalInfo?.email || "N/A"}</p>
              <p>Contact: {hospitalInfo?.phone || "N/A"}</p>
              <p>
                Address: {hospitalInfo?.address || "N/A"},{" "}
                {hospitalInfo?.city || "City"},{hospitalInfo?.state || "State"},{" "}
                {hospitalInfo?.zipCode || "Zip Code"}
              </p>
              <p>
                Website:{" "}
                <a
                  href={hospitalInfo?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {hospitalInfo?.website || "N/A"}
                </a>
              </p>
              <p>Languages Spoken: {hospitalInfo?.languagesSpoken || "N/A"}</p>
              <p>
                Insurance Accepted: {hospitalInfo?.insuranceAccepted || "N/A"}
              </p>
              <p>
                Emergency Contact: {hospitalInfo?.emergencyContact || "N/A"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center md:justify-end mt-4 md:mt-0 md:ml-4 space-x-4">
            <button
              onClick={handleOpenUpdateModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors duration-300"
            >
              Edit Profile
            </button>
            <button
              onClick={handleOpenDeleteModal}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-colors duration-300"
            >
              Delete Hospital
            </button>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Facilities Info */}
          <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2 text-green-800">
              Available Facilities
            </h3>
            <ul className="list-disc list-inside">
              {availableFacilities.length > 0 ? (
                availableFacilities.map(([facility], index) => (
                  <li key={index} className="text-green-700">
                    {facility}
                  </li>
                ))
              ) : (
                <li className="text-red-600">
                  No facilities available at the moment.
                </li>
              )}
            </ul>
          </div>

          {/* Staff Details */}
          <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2 text-yellow-800">
              Staff Details
            </h3>
            <p>
              Specialty Doctor Name:{" "}
              <span className="font-bold">
                {hospitalInfo?.specDrName || "N/A"}
              </span>
            </p>
            <p>
              Specialist:{" "}
              <span className="font-bold">
                {hospitalInfo?.specialist || "N/A"}
              </span>
            </p>
            <p>
              Degree:{" "}
              <span className="font-bold">{hospitalInfo?.degree || "N/A"}</span>
            </p>
            <p>
              Number of Doctors:{" "}
              <span className="font-bold">
                {hospitalInfo?.numberOfDoctors || "N/A"}
              </span>
            </p>
            <p>
              Number of Nurses:{" "}
              <span className="font-bold">
                {hospitalInfo?.numberOfNurses || "N/A"}
              </span>
            </p>
          </div>
        </div>

        {/* Hospital Overview Section */}
        <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 mb-6">
          <h3 className="text-lg font-semibold mb-2 text-purple-800">
            Hospital Overview
          </h3>
          <p>{hospitalInfo?.aboutHospital || "No overview available."}</p>
        </div>

        {/* Operational Hours and Experience Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Opening Hours Section */}
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2 text-blue-800">
              Opening Hours
            </h3>
            <p>Start: {hospitalInfo?.openingHours?.start || "N/A"}</p>
            <p>End: {hospitalInfo?.openingHours?.end || "N/A"}</p>
          </div>

          {/* Languages Spoken Section */}
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2 text-blue-800">
              Languages Spoken
            </h3>
            <p>Languages Spoken: {hospitalInfo?.languagesSpoken || "N/A"}</p>
          </div>

          {/* Check MediConnect Link */}
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <Link
              to="/admin-details"
              className="text-base text-blue-500 font-semibold hover:text-blue-700 transition duration-300"
            >
              Check MediConnect Admin Guidelines
            </Link>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
            <input
              type="text"
              name="id"
              placeholder="Hospital Id"
              value={formData.id}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />

            <div className="relative mb-2">
              <input
                type={isPasswordVisible ? "text" : "password"} // Toggle between text and password
                name="hospitalPassword"
                onChange={handlePasswordChange}
                value={formData.password}
                className="w-full px-3 py-2 border rounded-md "
                placeholder="Password"
                required
              />
              {/* Font Awesome Icon for Show/Hide Password */}
              <i
                className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-xl ${
                  isPasswordVisible ? "fa fa-eye-slash" : "fa fa-eye"
                }`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseUpdateModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmCredentials}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Confirm Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Profile Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Delete Profile</h2>
            <p>Enter password to confirm deletion:</p>

            <div className="relative my-4">
              <input
                type={isPasswordVisible ? "text" : "password"} // Toggle between text and password
                onChange={handlePasswordChange}
                value={password}
                className="w-full px-3 py-2 border rounded-md "
                placeholder="Password"
                required
              />
              {/* Font Awesome Icon for Show/Hide Password */}
              <i
                className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-xl ${
                  isPasswordVisible ? "fa fa-eye-slash" : "fa fa-eye"
                }`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseDeleteModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProfile}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Email */}
                <div className="flex flex-col mb-4">
                  <label className="mb-1 text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col mb-4">
                  <label className="mb-1 text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col mb-4">
                  <label className="mb-1 text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* City */}
                <div className="flex flex-col mb-4">
                  <label className="mb-1 text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* State */}
                <div className="flex flex-col mb-4">
                  <label className="mb-1 text-gray-700">State</label>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Zip Code */}
                <div className="flex flex-col mb-4">
                  <label className="mb-1 text-gray-700">Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Specialty Doctor Name */}
                <div className="flex flex-col mb-4">
                  <label className="mb-1 text-gray-700">
                    Specialty Doctor Name
                  </label>
                  <input
                    type="text"
                    name="specDrName"
                    placeholder="Specialty Doctor Name"
                    value={formData.specDrName}
                    onChange={handleInputChange}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Number of Doctors */}
                <div className="flex flex-col mb-4">
                  <label className="mb-1 text-gray-700">
                    Number of Doctors
                  </label>
                  <input
                    type="number"
                    name="numberOfDoctors"
                    placeholder="Number of Doctors"
                    value={formData.numberOfDoctors}
                    onChange={handleInputChange}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Number of Nurses */}
                <div className="flex flex-col mb-4">
                  <label className="mb-1 text-gray-700">Number of Nurses</label>
                  <input
                    type="number"
                    name="numberOfNurses"
                    placeholder="Number of Nurses"
                    value={formData.numberOfNurses}
                    onChange={handleInputChange}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* Specialist */}
                <div className="flex flex-col mb-4">
                  <label className="mb-1 text-gray-700">Specialist</label>
                  <input
                    type="text"
                    name="specialist"
                    placeholder="Specialist"
                    value={formData.specialist}
                    onChange={handleInputChange}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* Opening Hours */}
                <div className="flex flex-col mb-4">
                  <label style={{ display: "flex", alignItems: "center" }}>
                    Opening Hours:
                    <input
                      type="time"
                      name="openingHours.start"
                      value={formData.openingHours.start}
                      onChange={handleInputChange}
                      required
                      style={{
                        border: "0.5px solid gray",
                        borderRadius: "4px",
                        padding: "4px",
                        marginLeft: "10px",
                        marginRight: "5px",
                      }}
                    />
                  </label>
                </div>

                {/* Closing Hours */}
                <div className="flex flex-col mb-4">
                  <label style={{ display: "flex", alignItems: "center" }}>
                    Closing Hours:
                    <input
                      type="time"
                      name="openingHours.end"
                      value={formData.openingHours.end}
                      onChange={handleInputChange}
                      required
                      style={{
                        border: "0.5px solid gray",
                        borderRadius: "4px",
                        padding: "4px",
                        marginLeft: "10px",
                        marginRight: "5px",
                      }}
                    />
                  </label>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {/* About Hospital */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <label className="text-gray-800 font-semibold mb-1 block">
                      About Hospital
                    </label>
                    <textarea
                      name="aboutHospital"
                      placeholder="About Hospital"
                      value={formData.aboutHospital}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-3 rounded-md w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Website */}
                  <div className="col-span-1">
                    <label className="text-gray-800 font-semibold mb-1 block">
                      Website
                    </label>
                    <input
                      type="text"
                      name="website"
                      placeholder="Website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Languages Spoken */}
                  <div className="col-span-1">
                    <label className="text-gray-800 font-semibold mb-1 block">
                      Languages Spoken
                    </label>
                    <input
                      type="text"
                      name="languagesSpoken"
                      placeholder="Languages Spoken"
                      value={formData.languagesSpoken}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Insurance Accepted */}
                  <div className="col-span-1">
                    <label className="text-gray-800 font-semibold mb-1 block">
                      Insurance Accepted
                    </label>
                    <input
                      type="text"
                      name="insuranceAccepted"
                      placeholder="Insurance Accepted"
                      value={formData.insuranceAccepted}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Emergency Contact */}
                  <div className="col-span-1">
                    <label className="text-gray-800 font-semibold mb-1 block">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      placeholder="Emergency Contact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Degree */}
                  <div className="col-span-1">
                    <label className="text-gray-800 font-semibold mb-1 block">
                      Degree
                    </label>
                    <input
                      type="text"
                      name="degree"
                      placeholder="Degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Experience */}
                  <div className="col-span-1">
                    <label className="text-gray-800 font-semibold mb-1 block">
                      Experience
                    </label>
                    <input
                      type="text"
                      name="experience"
                      placeholder="Experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Facilities Section */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-6">
                  <label className="text-gray-800 font-semibold mb-1 block">
                    Facilities Available
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {Object.entries(formData.facilities).map(
                      ([facility, isAvailable]) => (
                        <div
                          key={facility}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            name={facility}
                            checked={isAvailable}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          />
                          <label
                            htmlFor={facility}
                            className="text-gray-700 text-sm font-medium capitalize"
                          >
                            {facility}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
              {currentStep === 2 && (
                <button onClick={handlePrevStep} className="text-gray-500">
                  <ArrowLeftIcon className="h-5 w-5 inline mr-1" /> Back
                </button>
              )}
              {currentStep === 1 && (
                <button onClick={handleNextStep} className="text-blue-500">
                  Next <ArrowRightIcon className="h-5 w-5 inline ml-1" />
                </button>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleUpdateProfile}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 mx-2"
            >
              Save Changes
            </button>
            <button
              onClick={handleCloseEditModal}
              className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HospitalDashboard;

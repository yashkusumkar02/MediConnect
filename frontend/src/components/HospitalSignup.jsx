import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS
import Footer from "./Footer";

const HospitalSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    id: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    specDrName: "",
    numberOfDoctors: "",
    numberOfNurses: "",
    aboutHospital: "",
    website: "",
    openingHours: { start: "", end: "" },
    experience: "",
    specialist: "",
    languagesSpoken: "",
    insuranceAccepted: "",
    emergencyContact: "",
    degree: "",
    facilities: {
      Emergency: false,
      ICU: false,
      Pharmacy: false,
      Laboratory: false,
      Radiology: false,
      Surgery: false,
      Rehabilitation: false,
      Outpatient: false,
      BloodBank: false,
      Maternity: false,
      Pediatrics: false,
      Cardiology: false,
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        facilities: {
          ...prevFormData.facilities,
          [name]: checked,
        },
      }));
    } else if (name.includes("openingHours")) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        openingHours: {
          ...prevFormData.openingHours,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

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
      id,
      password,
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
      experience,
      specialist,
      languagesSpoken,
      insuranceAccepted,
      emergencyContact,
      degree,
      openingHours,
    } = formData;

    if (
      !name ||
      !email ||
      !id ||
      !password ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !zipCode ||
      !specDrName ||
      !numberOfDoctors ||
      !numberOfNurses ||
      !aboutHospital ||
      !website ||
      !experience ||
      !specialist ||
      !languagesSpoken ||
      !insuranceAccepted ||
      !emergencyContact ||
      !degree
    ) {
      toast.error("All fields are required.");
      return false;
    }

    // Hospital name must contain "hospital" (case insensitive)
    if (!/hospital/i.test(name)) {
      toast.error("Hospital name must contain the word 'hospital'.");
      return false;
    }

    // City must be a single word
    if (/\s/.test(city)) {
      toast.error("City name should be a single word.");
      return false;
    }

    // Number of doctors should be greater than the number of nurses
    if (parseInt(numberOfDoctors) >= parseInt(numberOfNurses)) {
      toast.error(
        "Number of doctors must be smaller than the number of nurses."
      );
      return false;
    }

    // Validate Zip Code (must be a number)
    if (!/^\d+$/.test(zipCode)) {
      toast.error("Zip Code must be a number.");
      return false;
    }

    // Validate Number of Doctors and Nurses (must be numbers)
    if (!/^\d+$/.test(numberOfDoctors) || !/^\d+$/.test(numberOfNurses)) {
      toast.error("Number of Doctors and Nurses must be numbers.");
      return false;
    }

    // Validate Emergency Contact (must be a valid 10-digit number)
    if (!/^\d{10}$/.test(emergencyContact)) {
      toast.error("Emergency contact number must be a valid 10-digit number.");
      return false;
    }

    // Opening hours validation
    if (
      openingHours.start &&
      openingHours.end &&
      openingHours.start >= openingHours.end
    ) {
      toast.error("Opening hours should be earlier than closing hours.");
      return false;
    }

    return true;
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const requestBody = {
      ...formData,
      facilities: formData.facilities,
      numberOfDoctors: Number(formData.numberOfDoctors),
      numberOfNurses: Number(formData.numberOfNurses),
    };

    console.log("Request Body:", requestBody);

    try {
      const response = await axios.post(
        // "http://localhost:3000/api/hospitals"
        `${import.meta.env.VITE_API_BASE_URL_HOSPITAL}`

        ,
        requestBody
      );

      if (response.status === 200) {
        toast.success(response.data.message);

        setTimeout(() => {
          navigate("/main");
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  return (
    <>
      <div className="warning-message">
        Please enter all data neatly. Make sure to read and follow the form
        filling rules below for accurate entry.
      </div>

      <div className="flex items-center flex-row justify-center h-screen bg-gray-100">
        <ToastContainer />
        <div
          className="bg-white p-4 rounded-lg shadow-lg max-w-5xl w-full"
          style={{ maxHeight: "70vh", overflowY: "auto" }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Hospital Registration
          </h2>
          <form onSubmit={formSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <label>
                Hospital Name:
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="EG. Shri Sai Hospital"
                  required
                />
              </label>
              <label>
                Email:
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="EG. example@gmail.com"
                  required
                />
              </label>
              <label>
                Hospital Id:
                <input
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="EG. Sai123"
                  required
                />
              </label>
              {/* Password Field with Show/Hide Feature */}
        <label className="block">
          Password:
          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md mt-1"
              autoComplete="current-password"
              placeholder="EG. Example@123"
              required
            />
            <i
              className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-xl ${
                isPasswordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'
              }`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
        </label>
              <label>
                Contact Number:
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="EG. 9370387851"
                  required
                />
              </label>
              <label>
                Address:
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="EG. Old Cloth Lane, Near XYZ Road"
                  required
                />
              </label>
              <label>
                City:
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="EG. Latur"
                  required
                />
              </label>
              <label>
                State:
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="EG. Maharashtra"
                  required
                />
              </label>
              <label>
                Zip Code:
                <input
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  type="text" // Changed to text to allow for input of leading zeros
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="EG. 413512"
                  required
                />
              </label>
              <label>
                Specialist Doctor Name:
                <input
                  name="specDrName"
                  value={formData.specDrName}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="EG. Kusumkar Deepak"
                  required
                />
              </label>
              <label>
                Number of Doctors:
                <input
                  name="numberOfDoctors"
                  value={formData.numberOfDoctors}
                  onChange={handleChange}
                  type="number"
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="EG. 12"
                  required
                />
              </label>
              <label>
                Number of Nurses:
                <input
                  name="numberOfNurses"
                  value={formData.numberOfNurses}
                  onChange={handleChange}
                  type="number"
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="EG. 50"
                  required
                />
              </label>
              <label>
                Specialist:
                <input
                  name="specialist"
                  value={formData.specialist}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="EG. Cardiologist, Neurologist"
                  required
                />
              </label>
              <label>
                Experience (in years):
                <input
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  type="number"
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="EG. 5"
                  required
                />
              </label>
              <label>
                Languages Spoken:
                <input
                  name="languagesSpoken"
                  value={formData.languagesSpoken}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="EG. English, Hindi"
                  required
                />
              </label>
              <label>
                Insurance Accepted:
                <input
                  name="insuranceAccepted"
                  value={formData.insuranceAccepted}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="EG. XYZ Insurance, ABC Health Plan"
                />
              </label>
              <label>
                Emergency Contact Number:
                <input
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  type="tel"
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="EG. 9876543210"
                  required
                />
              </label>
              <label>
                Hospital Website:
                <input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  type="url"
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="EG. https://www.examplehospital.com"
                />
              </label>
              <label>
                Degree:
                <input
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-3 py-2 border rounded-md mt-1"
                  placeholder="EG. MBBS, MD (Med), DNB, MNAMS, Dip CARD"
                />
              </label>

              <label style={{ display: "flex", alignItems: "center" }}>
                Opening Hours:
                <input
                  type="time"
                  name="openingHours.start"
                  value={formData.openingHours.start}
                  onChange={handleChange}
                  required
                  style={{
                    border: "0.5px solid gray",
                    borderRadius: "4px",
                    padding: "4px",
                    marginLeft: "10px", // Adds space between label and input
                    marginRight: "5px",
                  }}
                />
              </label>

              <label style={{ display: "flex", alignItems: "center" }}>
                Closing Hours:
                <input
                  type="time"
                  name="openingHours.end"
                  value={formData.openingHours.end}
                  onChange={handleChange}
                  required
                  style={{
                    border: "0.5px solid gray",
                    borderRadius: "4px",
                    padding: "4px",
                    marginLeft: "10px", // Adds space between label and input
                    marginRight: "5px",
                  }}
                />
              </label>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Facilities Available:</label>
              <div className="flex flex-wrap gap-4">
                {Object.keys(formData.facilities).map((facility) => (
                  <label key={facility} className="flex items-center">
                    <input
                      type="checkbox"
                      name={facility}
                      checked={formData.facilities[facility]}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {facility}
                  </label>
                ))}
              </div>
            </div>

            <label className="block mb-4">
              About Hospital:
              <textarea
                name="aboutHospital"
                value={formData.aboutHospital}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md mt-1"
                rows="4"
                placeholder="EG. ABC Hospital is a multi-specialty institution located in the heart of the city. We pride ourselves on our patient-centered approach, offering personalized care tailored to meet individual needs. Our hospital features modern diagnostic tools, operating theaters, and patient wards, providing a comprehensive range of healthcare services. We believe in educating our patients about their health and wellness to empower them in making informed decisions.
"
                required
              />
            </label>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Signup
              </button>
            </div>
            <p className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/main" className="text-blue-500 hover:underline">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>

      <div className="form-rules bg-gray-50 border border-gray-200 rounded-lg p-12 max-w-2xl mx-auto shadow-lg mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Form Filling Rules:
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>Hospital Name:</strong> Must include the word hospital
            (e.g., City Hospital).
          </li>
          <li>
            <strong>Email:</strong> Enter a valid email address.
          </li>
          <li>
            <strong>Hospital ID:</strong> A unique identifier for the hospital.
          </li>
          <li>
            <strong>Password:</strong> Choose a secure password.
          </li>
          <li>
            <strong>Phone Number:</strong> Enter a valid phone number.
          </li>
          <li>
            <strong>Address:</strong> Enter the full address of the hospital.
          </li>
          <li>
            <strong>City:</strong> Enter only one word (e.g., Mumbai or Delhi).
          </li>
          <li>
            <strong>State:</strong> Enter the state name.
          </li>
          <li>
            <strong>Zip Code:</strong> Must be a numeric value.
          </li>
          <li>
            <strong>Special Doctors Name:</strong> Enter the name of a
            specialized doctor.
          </li>
          <li>
            <strong>Number of Doctors:</strong> Must be a number and greater
            than the number of nurses.
          </li>
          <li>
            <strong>Number of Nurses:</strong> Must be a numeric value.
          </li>
          <li>
            <strong>About Hospital:</strong> Provide a brief description of the
            hospital.
          </li>
          <li>
            <strong>Website:</strong> Enter the hospitals website URL (if any).
          </li>
          <li>
            <strong>Opening Hours:</strong> Start time should be earlier than
            the end time.
          </li>
          <li>
            <strong>Experience:</strong> Describe the hospitals experience
            (e.g., years in operation).
          </li>
          <li>
            <strong>Specialist:</strong> Mention the hospitals area(s) of
            specialization.
          </li>
          <li>
            <strong>Languages Spoken:</strong> List languages spoken at the
            hospital.
          </li>
          <li>
            <strong>Insurance Accepted:</strong> Mention accepted insurance
            providers (if any).
          </li>
          <li>
            <strong>Emergency Contact:</strong> Must be a valid 10-digit number.
          </li>
          <li>
            <strong>Degree:</strong> Enter the qualifications/degrees of
            specialized doctors.
          </li>
          <li>
            <strong>Facilities:</strong> Check the boxes for available
            facilities at the hospital (e.g., ICU, Pharmacy).
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default HospitalSignup;

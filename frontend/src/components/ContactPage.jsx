import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Navbar from "./Navbar";

const ContactPage = () => {
  const { hospitalInfo } = useContext(UserContext); // Access hospital info from context

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const type = localStorage.getItem("type");
if ( type==="client") {
  console.log("Client logged in");
  window.location.href = "/main";
}

// console.log("Client logged in");


    // Prefill name and email from hospitalInfo if available
    if (hospitalInfo) {
      setFormData((prevData) => ({
        ...prevData,
        name: hospitalInfo.name || "",
        email: hospitalInfo.email || "",
      }));
    }
  }, [hospitalInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the backend
      const response = await axios.post(
        // "http://localhost:3000/api/hospitals/contact"
        `${import.meta.env.VITE_API_BASE_URL_HOSPITAL}/contact`

        
        , formData);

      // Handle successful submission
      if (response.status === 200) {
        toast.success("Your inquiry has been successfully submitted. Our support team will get back to you shortly.");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        }); // Clear form after submission
      }
    } catch (error) {
      // Handle error
      console.error("There was an error submitting the form:", error);
      toast.error("Failed to submit your request. Please try again later."); // Show error toast
    }
  };

  return (
    <>
    <Navbar />
    <div className="max-w-lg mx-auto p-8 mt-10 bg-white shadow-md rounded">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
            readOnly // Makes the field read-only if it's prefilled
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Email"
            readOnly // Makes the field read-only if it's prefilled
          />
        </div>

        {/* Subject Field */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Subject"
          />
        </div>

        {/* Message Field */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            placeholder="Describe the issue or conflict"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default ContactPage;

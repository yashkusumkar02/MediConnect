import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const HospitalData = ({ hospital, isLoggedIn, clientInfo }) => {
  const [showReview, setShowReview] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  // Function to handle appointment booking
  const handleBookAppointment = () => {
    const dataToSend = {
      hospital,
      clientInfo,
    };
    navigate("/doctor-details", { state: dataToSend });
  };

  // Function to get a random feature message from the hospital's facilities
  const getRandomFeature = () => {
    const features = hospital.facilities || {};
    if (Object.keys(features).length === 0) {
      return "No specific features available.";
    }
    const availableFeatures = Object.keys(features).filter(
      (key) => features[key]
    );
    if (availableFeatures.length === 0) {
      return "No specific features available.";
    }
    const randomFeature =
      availableFeatures[Math.floor(Math.random() * availableFeatures.length)];
    return `The hospital offers ${randomFeature}.`;
  };
  console.log("cleintInfo:", clientInfo);

  // Toggle the review section
  const toggleReviewSection = () => {
    setShowReview((prev) => !prev);
  };

  const submitReview = async () => {
    try {
      const response = await axios.post(
        // `http://localhost:3000/api/hospitals/${hospital.id}/review`
        `${import.meta.env.VITE_API_BASE_URL_HOSPITAL}/${hospital.id}/review`

        ,
        {
          text: reviewText, // Changed to `text` as per server expectation
          star: rating, // Changed to `star` as per server expectation
          reviewerName: clientInfo.name, // Replace with actual name if available
        }
      );
      if (response.status === 201) {
        toast.success("Review submitted successfully!");
        setReviewText("");
        setRating(0);
        setShowReview(false);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-full sm:max-w-4xl p-4 sm:px-12 lg:px-8 bg-white rounded-lg shadow-md border border-gray-200">
      <ToastContainer />
      <div className="w-full lg:w-1/4 flex flex-col items-center p-4 border-b lg:border-r lg:border-gray-300">
        <img
          src={
            hospital.doctorImage ||
            "https://media.istockphoto.com/id/1344779917/vector/medical-center-hospital-building-vector-design.jpg?s=612x612&w=0&k=20&c=_sZByueZhEZbK2WjQz1jqXy1_Rr5jYkgiVBj-2ls44s="
          }
          alt={hospital.specDrName || "Doctor"}
          className="w-32 h-32 rounded-full object-cover mb-2"
        />
        <h3 className="text-lg font-semibold text-black">
          {hospital.specDrName ? `Dr. ${hospital.specDrName}` : "Doctor's Name"}
        </h3>
      </div>

      <div className="w-full lg:w-3/4 p-4 text-black">
        <h3 className="text-2xl font-bold">
          {hospital.name || "Hospital Name"}
        </h3>
        <p className="text-md mt-1">
          {hospital.specialist || "Specialization not available"} |{" "}
          {hospital.experience
            ? `${hospital.experience} years experience`
            : "Experience not available"}
        </p>
        <hr className="my-4 border-gray-300" />
        <p className="text-md">
          <strong>Address:</strong>{" "}
          {hospital.address || "Address not available"},
          {hospital.city ? ` ${hospital.city}` : " City not available"},
          {hospital.state ? ` ${hospital.state}` : " State not available"},
          {hospital.zipCode
            ? ` ${hospital.zipCode}`
            : " Zip-code not available"}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-8 text-md">
          <p>
            <strong>Degree:</strong> {hospital.degree || "Degree not available"}
          </p>
          <p>
            <strong>Languages:</strong>{" "}
            {hospital.languagesSpoken || "Languages not available"}
          </p>
        </div>
        {isLoggedIn ? (
          <p className="mt-4 text-md text-green-600">{getRandomFeature()} 🥳</p>
        ) : null}
        <hr className="my-4 border-gray-300" />

        {isLoggedIn ? (
          <button
            type="button"
            onClick={handleBookAppointment}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Book Appointment
          </button>
        ) : (
          <p className="mt-4 text-red-600 font-semibold">
            Please log in to book an appointment.
          </p>
        )}
        <br />

        {isLoggedIn ? (
          <button
            onClick={toggleReviewSection}
            className="mt-4 text-sm text-blue-500 underline self-start"
          >
            {showReview ? "Close Review Section" : "Add a Review"}
          </button>
        ) : null}

        {/* Review Section */}
        {showReview && (
          <div className="mt-4 p-4 border border-gray-300 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">Leave a Review</h4>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              className="w-full p-2 border rounded-md mb-4"
            />

            {/* Rating Section */}
            <div className="flex flex-wrap items-center mb-4">
              <span className="mr-2 text-sm font-medium">Rating:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`w-6 h-6 sm:w-8 sm:h-8 mx-0.5 sm:mx-1 text-2xl sm:text-3xl ${
                      star <= rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Review Button */}
            <button
              onClick={submitReview}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
            >
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

HospitalData.propTypes = {
  hospital: PropTypes.shape({
    id: PropTypes.string.isRequired, // assuming each hospital has a unique ID
    name: PropTypes.string,
    doctorImage: PropTypes.string,
    specDrName: PropTypes.string,
    specialist: PropTypes.string,
    experience: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
    degree: PropTypes.string,
    languagesSpoken: PropTypes.string,
    facilities: PropTypes.object,
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  clientInfo: PropTypes.object.isRequired,
};

export default HospitalData;

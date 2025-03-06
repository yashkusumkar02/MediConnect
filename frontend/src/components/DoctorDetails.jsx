import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorDetails = () => {

  const location = useLocation();
  const { hospital, clientInfo } = location.state || {};
  const [ratings, setRatings] = useState(0);
  const [reviews, setReviews] = useState([]);

  console.log("Selected hospital:", hospital);

  const defaultImage =
    "https://media.istockphoto.com/id/1344779917/vector/medical-center-hospital-building-vector-design.jpg?s=612x612&w=0&k=20&c=_sZByueZhEZbK2WjQz1jqXy1_Rr5jYkgiVBj-2ls44s=";

  const facilities = hospital.facilities
    ? Object.entries(hospital.facilities)
        .filter(([, value]) => value)
        .map(([key]) => key)
        .join(", ")
    : "No facilities listed.";

  const [formData, setFormData] = useState({
    name: clientInfo?.name || "",
    email: clientInfo?.email || "",
    phone: clientInfo?.phone || "",
    preferredDate: "",
    preferredTime: "",
  });

  // Format today’s date as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = new Date();
  // const formattedToday = today.toISOString().split("T")[0];
  const formatToday = formatDate(today);

  // Date 3 months from today
  const threeMonthsFromToday = new Date(today);
  threeMonthsFromToday.setMonth(today.getMonth() + 3);
  const formattedMaxDate = formatDate(threeMonthsFromToday);

  // State to store dynamic time slots
  const [timeSlots, setTimeSlots] = useState([]);

  // Update time slots whenever the hospital data changes
  useEffect(() => {
    console.log("Updating time slots for hospital:", hospital?.id);

    if (hospital && hospital.openingHours) {
      const openingStartTime = hospital.openingHours.start || "10:00";
      const openingEndTime = hospital.openingHours.end || "17:00";

      const [startHour, startMinute] = openingStartTime.split(":").map(Number);
      const [endHour, endMinute] = openingEndTime.split(":").map(Number);

      const slots = [];
      let currentHour = startHour;
      let currentMinute = startMinute;

      while (
        currentHour < endHour ||
        (currentHour === endHour && currentMinute <= endMinute)
      ) {
        slots.push(
          `${currentHour.toString().padStart(2, "0")}:${currentMinute
            .toString()
            .padStart(2, "0")}`
        );
        currentMinute += 30;
        if (currentMinute >= 60) {
          currentMinute = 0;
          currentHour += 1;
        }
      }

      setTimeSlots(slots);
      console.log("Generated time slots:", slots);
    } else {
      setTimeSlots([]);
      console.log("No opening hours provided, cleared time slots.");
    }
  }, [hospital?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch ratings and reviews for the hospital
  useEffect(() => {
    if (hospital?.id) {
      const fetchRatingsAndReviews = async () => {
        try {
          const response = await axios.get(
            // `http://localhost:3000/api/hospitals/${hospital.id}/reviews`
            `${import.meta.env.VITE_API_BASE_URL_HOSPITAL}/${hospital.id}/reviews`

          );
          setRatings(response.data.averageRating);
          setReviews(response.data.reviews);
        } catch (error) {
          console.error("Error fetching ratings and reviews:", error);
          toast.error("Failed to load ratings and reviews.");
        }
      };

      fetchRatingsAndReviews();
    }
  }, [hospital?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(
        // "http://localhost:3000/api/appointments/book-appointment"
        `${import.meta.env.VITE_API_BASE_URL_APPOINTMENT}/book-appointment`

        ,
        {
          hospitalId: hospital.id, // Replace with actual ID
          hospitalEmail: hospital.email,
          clientData: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            preferredDate: formData.preferredDate,
            preferredTime: formData.preferredTime,
          },
        }
      );
      console.log("Appointment booked:", response.data);

      // Show success toast
      toast.success(
        "Appointment booked successfully! Please check your email."
      );
    } catch (error) {
      console.error("Error booking appointment:", error);

      // Show error toast with the error message from the response
      if (error.response && error.response.data) {
        if (
          error.response.data.message ===
          "You already have an appointment booked for today with this email."
        ) {
          toast.error(
            "You already have an appointment booked for today. Please choose another date."
          );
        } else {
          toast.error(
            error.response.data.message ||
              "Error booking appointment. Please try again."
          );
        }
      } else {
        toast.error("Error booking appointment. Please try again.");
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col overflow-x-hidden">
      <ToastContainer />
      <Navbar />

      <div className="flex flex-col lg:flex-row w-full mt-4 lg:mt-6 px-2 lg:px-0">
        {/* Doctor Details Section */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 max-h-[calc(100vh-64px-24px-20px)] lg:w-[60%]">
          <h1 className="text-3xl font-bold mb-6">{hospital.name || "N/A"}</h1>

          {/* Doctor Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-2">Doctor Information</h2>
            <div className="flex flex-col md:flex-row mb-4">
              <img
                src={hospital.doctorImage || defaultImage}
                alt={hospital.specDrName || "Doctor"}
                className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-4"
              />
              <div>
                <p>
                  <strong>Name:</strong>{" "}
                  {hospital.specDrName ? `Dr. ${hospital.specDrName}` : "N/A"}
                </p>
                <p>
                  <strong>Specialization:</strong>{" "}
                  {hospital.specialist || "N/A"}
                </p>
                <p>
                  <strong>Experience:</strong> {hospital.experience || "N/A"}
                </p>
                <p>
                  <strong>Degree:</strong> {hospital.degree || "N/A"}
                </p>
                <p>
                  <strong>Languages Spoken:</strong>{" "}
                  {hospital.languagesSpoken || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Hospital Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-2">Hospital Information</h2>
            <p className="text-sm sm:text-base md:text-lg">
              <strong>Website:</strong>{" "}
              <a
                href={hospital.website || "#"}
                className="text-blue-600 hover:underline break-words"
              >
                {hospital.website || "No website available."}
              </a>
            </p>

            <p>
              <strong>Opening Hours:</strong>{" "}
              {hospital.openingHours
                ? `${hospital.openingHours.start} - ${hospital.openingHours.end}`
                : "No opening hours available."}
            </p>
          </div>

          {/* About the Doctor */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-2">About the Doctor</h2>
            <p>{hospital.aboutHospital || "No information available."}</p>
          </div>

          {/* Facilities */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-2">Facilities</h2>
            <p>{facilities || "No facilities available."}</p>
          </div>
        </div>

        {/* Empty space for the gap */}
        <div className="hidden lg:block lg:w-[10%]"></div>

        {/* Appointment Booking Form */}
        <div className="bg-white p-6 my-6 rounded-lg shadow-md lg:w-[35%] w-full lg:h-[calc(100vh-94px-64px)] overflow-y-auto mx-auto max-w-full">
          <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
          <form
            className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
            onSubmit={handleSubmit}
          >
            {/* Full Name */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-200 border-2 border-gray-300 rounded p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-200 border-2 border-gray-300 rounded p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-semibold mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-200 border-2 border-gray-300 rounded p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Preferred Date */}
            <div className="mb-6">
              <label
                htmlFor="preferredDate"
                className="block text-gray-700 font-semibold mb-2"
              >
                Preferred Date
              </label>
              <input
                type="date"
                name="preferredDate"
                id="preferredDate"
                min={formatToday}
                max={formattedMaxDate}
                value={formData.preferredDate}
                onChange={handleChange}
                className="w-full bg-gray-200 border-2 border-gray-300 rounded p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Preferred Time */}
            <div className="mb-6">
              <label
                htmlFor="preferredTime"
                className="block text-gray-700 font-semibold mb-2"
              >
                Preferred Time
              </label>
              <select
                name="preferredTime"
                id="preferredTime"
                onChange={handleChange}
                className="w-full bg-gray-200 border-2 border-gray-300 rounded p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a time</option>
                {timeSlots.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Ratings and Reviews Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-6">
        {/* Average Rating */}
        <div className="flex items-center space-x-2 mb-6">
          <strong className="text-lg text-gray-700">Average Rating:</strong>
          <div className="flex items-center">
            {/* Render stars based on average rating */}
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                fill={index < ratings ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 text-yellow-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 17l-5 3 1-6-4-4 6-1 2-5 2 5 6 1-4 4 1 6-5-3z"
                />
              </svg>
            ))}
            <span className="text-2xl font-bold text-yellow-500 ml-2">
              {ratings.toFixed(1)} / 5
            </span>
          </div>
        </div>

        <hr className="border-gray-300 mb-6" />

        {/* Reviews Section */}
        <div className="space-y-6">
          <strong className="text-lg text-gray-700 mb-4 block">Reviews:</strong>

          {/* Reviews Grid (2 reviews per row) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reviews.length > 0 ? (
              reviews.slice(0, 4).map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    {/* Reviewer Image */}
                    <img
                      src={
                        review.reviewerImage || "https://img.freepik.com/premium-vector/black-silhouette-default-profile-avatar_664995-354.jpg"
                      }
                      alt="Reviewer"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {review.reviewerName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.text}</p>

                  {/* Rating Stars */}
                  <div className="flex items-center mt-2">
                    {/* Render stars */}
                    {Array.from({ length: 5 }, (_, index) => {
                      if (review.star >= index + 1) {
                        // Full star
                        return (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5 text-yellow-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 17l-5 3 1-6-4-4 6-1 2-5 2 5 6 1-4 4 1 6-5-3z"
                            />
                          </svg>
                        );
                      } else if (
                        review.star > index &&
                        review.star < index + 1
                      ) {
                        // Half star
                        return (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5 text-yellow-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 17l-5 3 1-6-4-4 6-1 2-5 2 5 6 1-4 4 1 6-5-3z"
                            />
                            <path
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 17l-5 3 1-6-4-4 6-1 2-5 2 5 6 1-4 4 1 6-5-3z"
                            />
                          </svg>
                        );
                      } else {
                        // Empty star
                        return (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5 text-yellow-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 17l-5 3 1-6-4-4 6-1 2-5 2 5 6 1-4 4 1 6-5-3z"
                            />
                          </svg>
                        );
                      }
                    })}
                    {/* Display the number after the stars */}
                    <span className="ml-2 text-gray-700 font-bold">
                      {review.star}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;

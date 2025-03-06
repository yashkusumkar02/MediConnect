import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const ClientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const appointmentsPerPage = 10;
  console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL_APPOINTMENT);

  useEffect(() => {
    const clientEmail = localStorage.getItem("clientEmail");

    if (clientEmail) {
      axios
        .post(
          `${
            import.meta.env.VITE_API_BASE_URL_APPOINTMENT
          }/client-appointments`,
          { email: clientEmail }
        )
        .then((response) => {
          if (response.data.length === 0) {
            setError("No appointments found.");
          } else {
            const sortedAppointments = response.data.sort(
              (a, b) => new Date(b.preferredDate) - new Date(a.preferredDate)
            );
            setAppointments(sortedAppointments);
          }
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
          setError("Error fetching appointments. Please try again later.");
        });
    } else {
      setError("No email found. Please log in again.");
    }
  }, []);

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return `${formattedDate.getDate()}-${
      formattedDate.getMonth() + 1
    }-${formattedDate.getFullYear()}`;
  };
  const formatTime = (time) =>
    new Date(`1970-01-01T${time}:00Z`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const getStatusMessage = (appointment) => {
    const today = new Date();
    const appointmentDate = new Date(appointment.preferredDate);

    if (appointment.visited) {
      return { message: "Visited", color: "text-green-600" };
    } else if (appointmentDate >= today) {
      return { message: "Upcoming", color: "text-blue-600" };
    } else {
      return { message: "Not Visited", color: "text-red-600" };
    }
  };

  // Pagination logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <hr />
      <h1 className="text-2xl mt-4 font-semibold mb-6">
        {appointments.length > 0
          ? `${appointments[0].name}'s Appointments`
          : "Client Appointments"}
      </h1>

      {error && <p className="text-red-600">{error}</p>}

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found for this client.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border border-gray-300">Sr. No</th>
                <th className="p-2 border border-gray-300">Client Name</th>
                <th className="p-2 border border-gray-300">Email</th>
                <th className="p-2 border border-gray-300">Date</th>
                <th className="p-2 border border-gray-300">Time</th>
                <th className="p-2 border border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentAppointments.map((appointment, index) => {
                const { message, color } = getStatusMessage(appointment);

                return (
                  <tr key={appointment._id} className="hover:bg-gray-50">
                    <td className="p-2 border border-gray-300 text-center">
                      {indexOfFirstAppointment + index + 1}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {appointment.name}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {appointment.email}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {formatDate(appointment.preferredDate)}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {formatTime(appointment.preferredTime)}
                    </td>
                    <td
                      className={`p-2 border border-gray-300 text-center font-semibold ${color}`}
                    >
                      {message}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from(
              { length: Math.ceil(appointments.length / appointmentsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientAppointments;

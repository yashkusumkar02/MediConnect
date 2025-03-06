import Navbar from "./Navbar";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AppointmentList = () => {
  const { hospitalInfo } = useContext(UserContext);
  const { hospitalId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 10;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const type = localStorage.getItem("type");
    console.log(type);

    // Check if already on the correct page before redirecting
    if (type === "client" && location.pathname !== "/main") {
      console.log("Client logged in");
      navigate("/main");
    } else if (type === "hospital" && hospitalId && location.pathname !== `/check-clients/${hospitalId}`) {
      navigate(`/check-clients/${hospitalId}`);
    }
  }, [hospitalId, navigate, location.pathname]); // Added dependencies to avoid re-execution

  console.log('hosID', hospitalId)
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL_APPOINTMENT}/${hospitalId}`);

        // Filter and sort appointments
        const today = new Date().setHours(0, 0, 0, 0);
        const filteredAppointments = response.data
          .filter((appt) => new Date(appt.preferredDate).getTime() >= today)
          .sort((a, b) => new Date(a.preferredDate) - new Date(b.preferredDate))
          .map((appt) => ({
            ...appt,
            visited: appt.visited === undefined ? null : appt.visited,
          }));

        setAppointments(filteredAppointments || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (hospitalId) {
      fetchAppointments();
    }
  }, [hospitalId]);

  const updateVisitStatus = async (appointmentId, status) => {
    try {
      await axios.put(
        // `http://localhost:3000/api/appointments/update`
        `${import.meta.env.VITE_API_BASE_URL_APPOINTMENT}/update`,

        {
          hospitalId,
          appointmentId,
          visited: status,
        }
      );

      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt._id === appointmentId ? { ...appt, visited: status } : appt
        )
      );
    } catch (error) {
      console.error("Error updating visit status:", error);
    }
  };

  const handleEmojiClick = (appt, status) => {
    updateVisitStatus(appt._id, status);
  };

  // Pagination handlers
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Appointments for{" "}
          <span className="text-blue-600">{hospitalInfo?.name}</span>
        </h2>
        <div className="mb-4 p-4 bg-gray-100 rounded shadow-md">
          <h3 className="text-lg font-semibold">Hospital Admin Guidelines</h3>
          <ul className="list-none pl-6 space-y-2">
            <li>
              Verify patient details carefully before confirming their
              appointment status.
            </li>
            <li>
              Mark appointments as <b>Visited</b> or <b>Not Visited</b> only
              after consultation completion.
            </li>
            <li>
              Ensure all data is accurate and regularly updated to maintain
              patient confidentiality.
            </li>
          </ul>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border text-xs sm:text-base">Sr. No.</th>
                <th className="p-2 border text-xs sm:text-base">Name</th>
                <th className="p-2 border text-xs sm:text-base">Email</th>
                <th className="p-2 border text-xs sm:text-base">Phone</th>
                <th className="p-2 border text-xs sm:text-base">
                  Preferred Date
                </th>
                <th className="p-2 border text-xs sm:text-base">
                  Preferred Time
                </th>
                <th className="p-2 border text-xs sm:text-base">Visited</th>
              </tr>
            </thead>
            <tbody>
              {currentAppointments.length > 0 ? (
                currentAppointments.map((appt, index) => (
                  <tr
                    key={appt._id}
                    className="text-center border-b hover:bg-gray-100"
                  >
                    <td className="p-2 border text-sm sm:text-base">
                      {indexOfFirstAppointment + index + 1}
                    </td>
                    <td className="p-2 border text-sm sm:text-base">
                      {appt.name}
                    </td>
                    <td className="p-2 border text-sm sm:text-base">
                      {appt.email}
                    </td>
                    <td className="p-2 border text-sm sm:text-base">
                      {appt.phone}
                    </td>
                    <td className="p-2 border text-sm sm:text-base">
                      {new Date(appt.preferredDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="p-2 border text-sm sm:text-base">
                      {appt.preferredTime}
                    </td>
                    <td className="p-2 border text-sm sm:text-base">
                      {appt.visited === null ? (
                        <>
                          <span
                            onClick={() => handleEmojiClick(appt, true)}
                            className="cursor-pointer text-green-500 mx-1"
                          >
                            ✅
                          </span>
                          <span
                            onClick={() => handleEmojiClick(appt, false)}
                            className="cursor-pointer text-red-500 mx-1"
                          >
                            ❌
                          </span>
                        </>
                      ) : appt.visited ? (
                        <span className="text-green-500">Visited</span>
                      ) : (
                        <span className="text-red-500">Not Visited</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    No appointments available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(appointments.length / appointmentsPerPage) },
            (_, i) => i + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`px-3 py-1 mx-1 ${
                page === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
              } rounded-full`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppointmentList;

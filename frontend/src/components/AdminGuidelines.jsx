// import React from 'react';
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const AdminGuidelines = () => {
  return (
    <>
    <Navbar />
    <hr />
    <div className="min-h-screen bg-white text-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">MediConnect Admin Guidelines</h1>
        
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-gray-900">Welcome to MediConnect Admin Panel</h2>
          <p className="text-lg mt-4">
            Welcome, Admin! MediConnect offers a seamless platform to manage hospital data, appointments, doctors, and patient interactions. Follow these guidelines to make the most of your administrative tools.
          </p>
        </div>

        {/* Main Container for Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {/* Section 1: Hospital Profile Management */}
          <div className="p-6 bg-white border-2 border-gray-200 shadow-lg rounded-lg hover:shadow-xl transition-all">
            <h3 className="text-2xl font-semibold text-gray-800">1. Hospital Profile Management</h3>
            <p className="text-lg mt-2">
              As an admin, you can update the hospital’s profile. Go to the <strong>Hospital Profile</strong> section and click <strong>Edit</strong> to modify details like hospital name, address, contact info, and services offered.
            </p>
          </div>

          {/* Section 2: Appointment Management */}
          <div className="p-6 bg-white border-2 border-gray-200 shadow-lg rounded-lg hover:shadow-xl transition-all">
            <h3 className="text-2xl font-semibold text-gray-800">2. Appointment Management</h3>
            <p className="text-lg mt-2">
              Manage your hospital’s appointments by confirming or rescheduling them. Mark appointments as <strong>Visited</strong> once completed. This helps in tracking patient visits and ensures smooth scheduling.
            </p>
          </div>

          {/* Section 3: Adding New Doctors */}
          <div className="p-6 bg-white border-2 border-gray-200 shadow-lg rounded-lg hover:shadow-xl transition-all">
            <h3 className="text-2xl font-semibold text-gray-800">3. Adding New Doctors</h3>
            <p className="text-lg mt-2">
              To add a new doctor to the hospital, click on <strong>Add Doctor</strong> in the <strong>Doctors</strong> section. Fill in their details such as specialty, contact info, and upload their photo.
            </p>
          </div>

          {/* Section 4: Managing "Ask the Doctor" Feature */}
          <div className="p-6 bg-white border-2 border-gray-200 shadow-lg rounded-lg hover:shadow-xl transition-all">
            <h3 className="text-2xl font-semibold text-gray-800">4. Managing Ask the Doctor</h3>
            <p className="text-lg mt-2">
              Patients can ask questions to the doctor. As an admin, you can manage incoming questions, ensuring they are answered or marked as reviewed.
            </p>
          </div>

          {/* Section 5: Notifications and Alerts */}
          <div className="p-6 bg-white border-2 border-gray-200 shadow-lg rounded-lg hover:shadow-xl transition-all">
            <h3 className="text-2xl font-semibold text-gray-800">5. Notifications & Alerts</h3>
            <p className="text-lg mt-2">
              Stay updated with hospital notifications and alerts, including new registrations, urgent inquiries, and upcoming appointments. Check these regularly from your dashboard.
            </p>
          </div>

          {/* Section 6: Admin Settings */}
          <div className="p-6 bg-white border-2 border-gray-200 shadow-lg rounded-lg hover:shadow-xl transition-all">
            <h3 className="text-2xl font-semibold text-gray-800">6. Admin Settings</h3>
            <p className="text-lg mt-2">
              You can manage your admin account, change your password, and adjust notification preferences under the <strong>Admin Settings</strong> section.
            </p>
          </div>

          {/* Section 7: Advanced Features */}
          <div className="p-6 bg-white border-2 border-gray-200 shadow-lg rounded-lg mx-auto max-w-md mt-8 mb-8 hover:shadow-xl transition-all">
            <h3 className="text-2xl font-semibold text-gray-800 text-center">7. Advanced Features & Future Updates</h3>
            <p className="text-lg mt-4">
              MediConnect is always evolving. In the future, expect AI-powered chatbots, advanced analytics, and video consultations. Stay tuned for updates!
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-600">
            We hope these guidelines help you get started with MediConnect. If you have any questions or need support, feel free to contact our support team. We are here to assist you! <Link
          to="/"
          className="text-base text-blue-500 font-semibold hover:text-blue-700 transition duration-300"
        >
          Check MediConnect
        </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminGuidelines;
import { Link } from "react-router-dom";

export const MediConnect = () => {
  return (
    <div className="h-screen w-full bg-white flex flex-col justify-between font-sans">
      {/* Header Section */}
      <header className="flex justify-center items-center py-6 bg-green-100 shadow-lg">
        <h1 className="text-4xl text-green-600 font-semibold">MediConnect</h1>
      </header>

      {/* Main Content Section */}
      <div className="flex flex-col items-center justify-start flex-grow px-6 py-10">
        <section id="overview" className="max-w-5xl w-full text-center mb-12">
          <h2 className="text-3xl text-green-500 mb-4">
            Overview of MediConnect 🌟
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            MediConnect is a platform designed to simplify the process of
            connecting patients with healthcare providers. With the rise of
            digital health, MediConnect aims to bridge the gap between patients
            and doctors, making healthcare services more accessible and
            efficient. Whether you’re looking for a nearby hospital, booking an
            appointment, or seeking an online consultation, MediConnect is here
            to serve you.
          </p>
          {/* Horizontal line */}
          <hr className="my-6 border-t-2 border-gray-300 lg:border-green-500" />
          {/* Message for larger screens */}
          <p className="text-sm text-gray-500 text-center lg:text-lg font-medium mt-4">
            For the best experience, we recommend using MediConnect on larger
            screens, such as laptops or desktop PCs.
          </p>
          <Link
            to="/main"
            className="text-lg text-green-500 hover:text-pink-400 underline"
          >
            Find Nearby Hospitals
          </Link>
        </section>

        <section id="features" className="max-w-5xl w-full mb-12">
          <h2 className="text-3xl text-green-500 text-center mb-6">
            Features of MediConnect 🚀
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-700">
            <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl text-green-500 mb-4">
                1. Hospital Search
              </h3>
              <p className="text-center">
                Easily search and find hospitals or clinics near you based on
                location, specialties, or ratings.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl text-green-500 mb-4">
                2. Appointment Booking
              </h3>
              <p className="text-center">
                Book appointments with healthcare professionals instantly, with
                a choice of available time slots.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl text-green-500 mb-4">
                3. Online Consultations
              </h3>
              <p className="text-center">
                Access online consultations with doctors via video or chat for
                non-emergency health issues.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl text-green-500 mb-4">4. Health Tips</h3>
              <p className="text-center">
                Get personalized health tips and recommendations based on your
                health data and preferences.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl text-green-500 mb-4">
                5. Patient Reviews
              </h3>
              <p className="text-center">
                Read reviews and ratings of hospitals, doctors, and other
                healthcare providers to make informed decisions.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl text-green-500 mb-4">
                6. Prescription Management
              </h3>
              <p className="text-center">
                Keep track of your prescriptions and appointments directly
                within the app, and get reminders for follow-ups.
              </p>
            </div>
          </div>
        </section>

        <section
          id="routes-learning"
          className="max-w-5xl mx-auto mt-16 my-8 px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-4xl text-green-600 font-bold text-center mb-8">
            Client & Hospital Functionalities 🔍
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Client Functionalities */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-green-600 mb-4">
                Client
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Register and create an account.</li>
                <li>Login to access the platform.</li>
                <li>Search for hospitals or clinics nearby.</li>
                <li>Book appointments with available doctors.</li>
                <li>Manage scheduled and past appointments.</li>
                <li>Access personalized health tips and recommendations.</li>
                <li>View and download prescriptions.</li>
                <li>Provide feedback and rate healthcare services.</li>
                <li>Reset password via email verification.</li>
              </ul>
            </div>

            {/* Hospital Functionalities */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-green-600 mb-4">
                Hospital
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Register and set up a hospital profile.</li>
                <li>Login to the hospital management dashboard.</li>
                <li>
                  List available doctors with specialization and availability.
                </li>
                <li>Manage appointments with clients.</li>
                <li>Approve or cancel client appointments.</li>
                <li>Send notifications to clients for updates or changes.</li>
                <li>Access patient feedback and reviews.</li>
                <li>Manage prescriptions and patient history.</li>
                <li>Logout securely from the platform.</li>
              </ul>
            </div>
          </div>

          <h2 className="text-4xl text-green-600 font-bold text-center mt-16 mb-8">
            What I Learned 📚
          </h2>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <ul className="list-none list-inside text-gray-700 space-y-2">
              <li>
                ✅ Implementing role-based JWT authentication and authorization.
              </li>
              <li>
                ✅ Managing secure user registrations and logins with encrypted
                passwords.
              </li>
              <li>
                ✅ Developing a robust appointment booking system with React and
                Node.js.
              </li>
              <li>
                ✅ Integrating MongoDB for dynamic data storage and retrieval.
              </li>
              <li>
                ✅ Building RESTful APIs for CRUD operations on appointments and
                users.
              </li>
              <li>
                ✅ Implementing email verification for user authentication and
                password resets.
              </li>
              <li>
                ✅ Managing secure sessions and token-based authentication.
              </li>
              <li>
                ✅ Handling client-side routing with React Router for smooth
                navigation.
              </li>
              <li>
                ✅ Using Tailwind CSS for responsive and modern UI designs.
              </li>
            </ul>

            {/* Additional GitHub Information */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-green-600 mb-4">
                Access the Project Code
              </h3>
              <p className="text-gray-700">
                You can access the full project code on GitHub. This project
                showcases the complete functionality of a hospital-client
                appointment booking system, built using the MERN stack (MongoDB,
                Express, React, Node.js).
              </p>
              <p className="mt-4 text-blue-600">
                <a
                  href="https://github.com/Kusumkar-Deeepak/MediConnect-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  View Project Code on GitHub
                </a>
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                <li>
                  ✅ Clone the repository using:{" "}
                  <code>
                    git clone https://github.com/Kusumkar-Deeepak/MediConnect-
                  </code>
                </li>
                <li>
                  ✅ Install dependencies with: <code>npm install</code>
                </li>
                <li>
                  ✅ Run the development server using: <code>npm start</code>
                </li>
                <li>
                  ✅ For backend, navigate to the backend folder and run{" "}
                  <code>npm run dev</code> for server start.
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-green-600 mt-6 mb-4">
                Contribute to the Project
              </h3>
              <p className="text-gray-700">
                Feel free to contribute to this project! Contributions, bug
                reports, and feature requests are welcome. Follow the steps
                below to get started:
              </p>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 mt-4">
                <li>Fork the repository.</li>
                <li>Clone your forked repository to your local machine.</li>
                <li>Create a new branch for your feature or bug fix.</li>
                <li>
                  Make your changes and commit them with descriptive messages.
                </li>
                <li>Push your changes to your forked repository.</li>
                <li>Open a pull request to the main repository.</li>
              </ol>

              <h3 className="text-2xl font-semibold text-green-600 mt-6 mb-4">
                Additional Notes
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  🔧 This project is continuously updated, so make sure to check
                  for updates regularly.
                </li>
                <li>
                  🔍 Feel free to explore the codebase, report issues, or
                  suggest improvements!
                </li>
                <li>
                  📝 For detailed documentation, refer to the{" "}
                  <code>README.md</code> file in the GitHub repository.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="flex flex-col lg:flex-row items-center justify-center gap-8 px-6 py-12">
          {/* Hospital Signup Link */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 w-full lg:w-1/2">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Hospital Signup
            </h3>
            <p className="text-lg text-gray-700 mb-6 text-center">
              Sign up to list your hospital or clinic on MediConnect. Provide
              essential details such as hospital name, location, services, and
              contact information. Reach a wider audience and grow your patient
              base with ease.
            </p>
            <Link
              to="/HospitalSignup"
              className="w-full py-3 mt-4 bg-green-600 text-white font-semibold rounded-lg text-center hover:bg-green-700 transition duration-200"
            >
              Go to Hospital Signup
            </Link>
          </div>

          {/* Client Signup Link */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 w-full lg:w-1/2">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Client Signup
            </h3>
            <p className="text-lg text-gray-700 mb-6 text-center">
              Sign up to access healthcare services, book appointments with
              doctors, and receive personalized health recommendations. Create a
              profile to manage your health records and connect with healthcare
              providers.
            </p>
            <Link
              to="/ClientSignup"
              className="w-full py-3 mt-4 bg-green-600 text-white font-semibold rounded-lg text-center hover:bg-green-700 transition duration-200"
            >
              Go to Client Signup
            </Link>
          </div>
        </section>

        <section id="owner-info" className="max-w-5xl w-full text-center mb-12">
          <h2 className="text-3xl text-green-500 mb-4">
            About the Developer 🚀
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Hello! I’m Deepak Prakash Kusumkar, the developer behind
            MediConnect. I’m a passionate web developer with a keen interest in
            creating innovative solutions to improve healthcare. MediConnect is
            a product of my dedication to using technology for the betterment of
            the healthcare system. Through this platform, I aim to make
            healthcare more accessible, efficient, and user-friendly for
            everyone.
          </p>
          <h3 className="text-xl text-green-500 mb-4">Connect with Me</h3>
          <ul className="text-lg text-gray-700">
            <li className="mb-2">
              <a
                href="https://github.com/DeepakKusumkar"
                className="hover:text-pink-400"
              >
                GitHub: Deepak Kusumkar
              </a>
            </li>
            <li className="mb-2">
              <a
                href="https://www.linkedin.com/in/deepak-kusumkar/"
                className="hover:text-pink-400"
              >
                LinkedIn: Deepak Kusumkar
              </a>
            </li>
          </ul>
        </section>

        <section id="contact" className="max-w-5xl w-full text-center">
          <h2 className="text-3xl text-green-500 mb-4">
            Contact Information 📞
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            For any inquiries or feedback, feel free to reach out. Im always
            open to suggestions and collaboration opportunities.
          </p>
          <ul className="text-lg text-gray-700">
            <li className="mb-2">
              <span className="font-semibold">Email:</span>{" "}
              deeepak.kusumkar@gmail.com
            </li>
            <li className="mb-2">
              <span className="font-semibold">Phone:</span> +91 9370387851
            </li>
          </ul>
        </section>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-100 py-4 text-center">
        <p className="text-sm text-gray-600">
          © 2024 MediConnect. All rights reserved. Built with 💻 by Deepak
          Prakash Kusumkar.
        </p>
      </footer>
    </div>
  );
};

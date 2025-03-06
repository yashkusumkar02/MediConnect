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

        <section id="features" className="max-w-5xl w-full mb-12 px-4">
          <h2 className="text-3xl md:text-4xl text-green-500 text-center mb-6">
            Features of MediConnect 🚀
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
            {[
              {
                title: "Hospital Search",
                text: "Easily search and find hospitals or clinics near you based on location, specialties, or ratings.",
              },
              {
                title: "Appointment Booking",
                text: "Book appointments with healthcare professionals instantly, with a choice of available time slots.",
              },
              {
                title: "Online Consultations",
                text: "Access online consultations with doctors via video or chat for non-emergency health issues.",
              },
              {
                title: "Health Tips",
                text: "Get personalized health tips and recommendations based on your health data and preferences.",
              },
              {
                title: "Patient Reviews",
                text: "Read reviews and ratings of hospitals, doctors, and other healthcare providers to make informed decisions.",
              },
              {
                title: "Prescription Management",
                text: "Keep track of your prescriptions and appointments within the app, and get reminders for follow-ups.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md text-center"
              >
                <h3 className="text-lg sm:text-xl text-green-500 mb-3">
                  {index + 1}. {feature.title}
                </h3>
                <p className="text-sm sm:text-base">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="routes-learning"
          className="max-w-5xl mx-auto mt-12 px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl sm:text-4xl text-green-600 font-bold text-center mb-6 sm:mb-8">
            Client & Hospital Functionalities 🔍
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Client Functionalities */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl sm:text-2xl font-semibold text-green-600 mb-3 sm:mb-4">
                Client
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm sm:text-base">
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
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl sm:text-2xl font-semibold text-green-600 mb-3 sm:mb-4">
                Hospital
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm sm:text-base">
                <li>Register and set up a hospital profile.</li>
                <li>Login to the hospital management dashboard.</li>
                <li>List available doctors with specialization and availability.</li>
                <li>Manage appointments with clients.</li>
                <li>Approve or cancel client appointments.</li>
                <li>Send notifications to clients for updates or changes.</li>
                <li>Access patient feedback and reviews.</li>
                <li>Manage prescriptions and patient history.</li>
                <li>Logout securely from the platform.</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl text-green-600 font-bold text-center mt-12 sm:mt-16 mb-6 sm:mb-8">
            What I Learned 📚
          </h2>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition">
            <ul className="list-none text-gray-700 space-y-2 text-sm sm:text-base">
              <li>✅ Implementing role-based JWT authentication and authorization.</li>
              <li>✅ Managing secure user registrations and logins with encrypted passwords.</li>
              <li>✅ Developing a robust appointment booking system with React and Node.js.</li>
              <li>✅ Integrating MongoDB for dynamic data storage and retrieval.</li>
              <li>✅ Building RESTful APIs for CRUD operations on appointments and users.</li>
              <li>✅ Implementing email verification for user authentication and password resets.</li>
              <li>✅ Managing secure sessions and token-based authentication.</li>
              <li>✅ Handling client-side routing with React Router for smooth navigation.</li>
              <li>✅ Using Tailwind CSS for responsive and modern UI designs.</li>
            </ul>
          </div>

          <div className="mt-8 bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl sm:text-2xl font-semibold text-green-600 mb-3 sm:mb-4">
              Access the Project Code
            </h3>
            <p className="text-gray-700 text-sm sm:text-base">
              You can access the full project code on GitHub. This project showcases the complete
              functionality of a hospital-client appointment booking system, built using the MERN stack.
            </p>
            <p className="mt-3 text-blue-600 text-sm sm:text-base">
              <a
                href="https://github.com/yashkusumkar02"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                View Project Code on GitHub
              </a>
            </p>
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
            Hello! I’m Suyash Prakash Kusumkar, the developer behind
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
                href="https://github.com/yashkusumkar02"
                className="hover:text-pink-400"
              >
                GitHub: Suyash Kusumkar
              </a>
            </li>
            <li className="mb-2">
              <a
                href="https://www.linkedin.com/in/suyash-kusumkar/"
                className="hover:text-pink-400"
              >
                LinkedIn: Suyash Kusumkar
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
              kusumkarsuyash1234@gmail.com
            </li>
            <li className="mb-2">
              <span className="font-semibold">Phone:</span> +91 8329744862
            </li>
          </ul>
        </section>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-100 py-4 text-center">
        <p className="text-sm text-gray-600">
          © 2024 MediConnect. All rights reserved. Built with 💻 by Suyash
          Prakash Kusumkar.
        </p>
      </footer>
    </div>
  );
};

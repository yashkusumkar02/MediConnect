import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-100 to-gray-100 text-gray-800 px-4">
      {/* 404 Icon & Heading */}
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-red-600 mb-6 animate-bounce">404</h1>
        <h2 className="text-4xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300"
        >
          Back to Main Page
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-white shadow-md">
        <div className="w-32 h-32 bg-green-200 rounded-full absolute -top-16 left-4 blur-lg"></div>
        <div className="w-24 h-24 bg-pink-200 rounded-full absolute -top-12 right-4 blur-lg"></div>
      </div>
    </div>
  );
};

export default NotFound;

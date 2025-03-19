import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs text-center">
        {/* Logo/Icon */}
        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl font-bold">B</span>
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-800 mb-4">
          Welcome To The Blog!!!
        </h1>

        {/* Buttons */}
        <div className="flex flex-col space-y-3">
          <Link to="/login">
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
              Log In
            </button>
          </Link>
          <Link to="/register">
            <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

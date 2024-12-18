import React, { useState, useContext, useEffect } from "react";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { sendJSONRequest } from "../../utility/sendJson";
import { AuthContext } from "../../utility/AuthContext";
import { SuccessPopup, ErrorPopup } from "../../utility/Popups";  // Assuming these are in the same directory or adjusted path

function GetStarted() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [generalError, setGeneralError] = useState(""); // For general login errors
  const [isLoading, setIsLoading] = useState(false); // For loading spinner
  const [popupMessage, setPopupMessage] = useState(""); // To control the popup message
  const [showPopup, setShowPopup] = useState(false); // To control visibility of the popup

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Email validation regex
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Password validation regex
  function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  }

  // Handle form submission
  async function handleForm(e) {
    e.preventDefault();
    const newError = { email: "", password: "" };
    setGeneralError(""); // Clear previous general error
    setIsLoading(true); // Start loading spinner

    // Validate email and password
    if (!email) newError.email = "Email is required.";
    else if (!validateEmail(email)) newError.email = "Enter a valid email address.";

    if (!password) newError.password = "Password is required.";
    else if (!validatePassword(password)) {
      newError.password =
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.";
    }

    setError(newError);

    // If no validation errors, proceed with the login
    if (!newError.email && !newError.password) {
      try {
        const response = await sendJSONRequest(
          `${process.env.REACT_APP_BACKEND_URL}/portal/login`,
          { email, password }
        );

        const roles = response.data.role[0];
        login(response.data);
        // Navigate based on user type (Admin, Teacher, etc.)
        if (roles.includes("Admin")) {
          navigate("/admin");
        } else if (roles.includes("Teacher")) {
          navigate("/teachers");
        } else if (roles.includes("Principal")) {
          navigate("/headmaster");
        } else {
          navigate("/unauthorized");
        }

        // Show success popup if login is successful
        setPopupMessage("Login Successful!");
        setShowPopup(true); // Trigger success popup
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        setGeneralError("Invalid credentials or server error. Please try again.");

        // Show error popup if login fails
        setPopupMessage("Login failed. Please check your credentials.");
        setShowPopup(true); // Trigger error popup
      } finally {
        setIsLoading(false); // Stop loading spinner once the process is done
      }
    } else {
      setIsLoading(false); // Stop loading spinner if there's an error
    }
  }

  // Handle email change
  function handleEmail(e) {
    setEmail(e.target.value);
    if (error.email) {
      setError((prevError) => ({ ...prevError, email: "" }));
    }
  }

  // Handle password change
  function handlePassword(e) {
    setPassword(e.target.value);
    if (error.password) {
      setError((prevError) => ({ ...prevError, password: "" }));
    }
  }

  // Automatically hide popup after 3 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setPopupMessage("");
        setShowPopup(false);
      }, 3000); // Hide popup after 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [showPopup]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="School Logo" className="h-16 w-16 object-contain" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800 text-center mb-4">Welcome</h1>
        <p className="text-sm text-gray-600 text-center mb-6">Please log in to continue</p>

        {generalError && <div className="text-red-600 text-center mb-4">{generalError}</div>}

        <form onSubmit={handleForm} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={handleEmail}
              id="email"
              placeholder="Enter your email"
              className={`mt-1 block w-full px-4 py-2 border ${error.email ? "border-red-500" : "border-gray-300"} rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {error.email && <p className="text-red-700 mt-1 text-sm">{error.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePassword}
              id="password"
              placeholder="Enter your password"
              className={`mt-1 block w-full px-4 py-2 border ${error.password ? "border-red-500" : "border-gray-300"} rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {error.password && <p className="text-red-700 mt-1 text-sm">{error.password}</p>}
          </div>

          <div>
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium shadow-md ${!email || !password || isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"} focus:ring-2 focus:ring-blue-500`}
              disabled={!email || !password || isLoading || !!error.email || !!error.password}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full border-4 border-t-4 border-blue-300 h-6 w-6"></div>
                  <span className="ml-2">Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Show the popup only if there's a message */}
      {showPopup && (
        popupMessage.includes("Successful") ? (
          <SuccessPopup message={popupMessage} />
        ) : (
          <ErrorPopup message={popupMessage} />
        )
      )}
    </div>
  );
}

export default GetStarted;

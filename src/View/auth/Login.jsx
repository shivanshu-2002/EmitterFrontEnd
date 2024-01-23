import React, { useContext, useState } from 'react';
import quiz from '../../assets/quiz.webp';
import { apiCall } from '../../utils/ApiCall';
import { DataContext } from '../../utils/Context';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Components/Spinner.jsx/Spinner'

import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(DataContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // State to manage form validation
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  // Function to validate email format
  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  // Function to handle login button click
  const handleLoginClick = async () => {
    // Validate email
    const isValidEmailValue = validateEmail(email);
    setIsValidEmail(isValidEmailValue);
  
    // Validate password
    const isValidPasswordValue = password.length >= 6;
    setIsValidPassword(isValidPasswordValue);
  
    // If email and password are valid, perform login logic
    if (isValidEmailValue && isValidPasswordValue) {
      try {
        toast.info("Logging In. Please wait...", { autoClose: false, hideProgressBar: true });
        const data = {
          email: email,
          password: password
        };
  
        const loginResp = await apiCall('/auth/login', data);
  
        if (loginResp.success) {
          toast.dismiss(); // Dismiss the loading toast
          toast.success("Successfully Logged In");
          setIsLoggedIn(true);
          setUser(loginResp.user);
  
          // Save to Local Storage also
          localStorage.setItem("token", JSON.stringify(loginResp.token));
          localStorage.setItem("user", JSON.stringify(loginResp.user));
          navigate('/');
        } else {
          toast.dismiss(); // Dismiss the loading toast
          toast.error("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.dismiss(); // Dismiss the loading toast
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className='w-[100%] h-[80vh] flex'>
      <div className='w-[50%] h-full flex justify-center items-end '>
        <img src={quiz} alt='quiz' className='w-[100%] h-full object-cover' />
      </div>
      <div className='w-[50%] h-full '>
        {
          isLoading ? <Spinner /> :
            <div className="flex justify-center items-center h-full bg-gray-900">
              <div className="bg-white p-8 flex flex-col rounded-md min-w-[50%] min-h-[250px]">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Login</h2>

                {/* Email input */}
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-[100%] p-2 mb-4 border ${isValidEmail ? 'border-gray-400' : 'border-red-500'} rounded-md focus:outline-none focus:border-blue-500`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isValidEmail && <p className="text-red-500 text-sm mb-4">Invalid email format</p>}

                {/* Password input */}
                <input
                  type="password"
                  placeholder="Enter your password"
                  className={`w-[100%] p-2 mb-4 border ${isValidPassword ? 'border-gray-400' : 'border-red-500'} rounded-md focus:outline-none focus:border-blue-500`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isValidPassword && <p className="text-red-500 text-sm mb-4">Password must be at least 6 characters</p>}

                {/* Login button */}
                <button
                  className="bg-gray-800 px-6 text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
              </div>
            </div>
        }

      </div>
    </div>
  );
};

export default Login;

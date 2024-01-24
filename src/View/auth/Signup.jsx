import React, { useState } from 'react';
import quiz from '../../assets/quiz.webp';
import { apiCall } from '../../utils/ApiCall'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = ({ givenemail }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState(givenemail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');

  // States to manage form validation
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidFirstName, setIsValidFirstName] = useState(true);
  const [isValidLastName, setIsValidLastName] = useState(true);
  const [isValidDateOfBirth, setIsValidDateOfBirth] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const [isValidOtp, setIsValidOtp] = useState(true);

  // Function to validate email format
  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  // Function to handle signup button click
  const handleSignupClick = async () => {
    setIsValidUsername(username.trim() !== '');
    setIsValidFirstName(firstName.trim() !== '');
    setIsValidLastName(lastName.trim() !== '');
    setIsValidDateOfBirth(dateOfBirth.trim() !== '');
    setIsValidEmail(validateEmail(email));
    setIsValidPassword(password.trim() !== '');
    setIsValidConfirmPassword(confirmPassword.trim() === password.trim());
    setIsValidOtp(otp.trim() !== '');
    if (
      username.trim() !== '' &&
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      dateOfBirth.trim() !== '' &&
      validateEmail(email) &&
      password.trim() !== '' &&
      confirmPassword.trim() === password.trim() &&
      otp.trim() !== ''
    ) {
      try {
        toast.info("Signing Up. Please wait...", { autoClose: false, hideProgressBar: true });
        const data = {
          username: username,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
          password: password,
          email: email,
          confirmPassword: confirmPassword,
          otp: otp,
        };
        const response = await apiCall('/auth/signup', data);
        if (response.success) {
          toast.dismiss();
          toast.success("Successfully signed up. Redirecting to login.");
          navigate('/login');
        } else {
          toast.dismiss();
          toast.error("Signup failed. Please check your information and try again.");
        }
      } catch (error) {
        console.error("Error during signup:", error);
        toast.dismiss();
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };


  return (
    <div className='w-[100%] h-[80vh] flex'>
      <div className='w-[50%] h-full flex justify-center items-end '>
        <img src={quiz} alt='quiz' className='w-[100%] h-full object-cover' />
      </div>
      <div className='w-[50%] h-full bg-gray-900'>
        <div className="flex bg-white flex-col justify-center items-center h-full ">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-black p-2">Sign Up</h2>
          <div className=" p-8 rounded-md flex flex-row flex-wrap gap-3 min-w-[60%] min-h-[250px]">
            <input
              type="text"
              placeholder="Enter your username"
              className={`w-[45%] p-2 mb-4 border ${isValidUsername ? 'border-gray-400' : 'border-red-500'} rounded-md focus:outline-none focus:border-blue-500`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {!isValidUsername && <p className="text-red-500 text-sm mb-4">Username is required</p>}

            {/* First Name input */}
            <input
              type="text"
              placeholder="Enter your first name"
              className={`w-[45%] p-2 mb-4 border ${isValidFirstName ? 'border-gray-400' : 'border-red-500'} rounded-md focus:outline-none focus:border-blue-500`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {!isValidFirstName && <p className="text-red-500 text-sm mb-4">First name is required</p>}

            {/* Last Name input */}
            <input
              type="text"
              placeholder="Enter your last name"
              className={`w-[45%] p-2 mb-4 border ${isValidLastName ? 'border-gray-400' : 'border-red-500'} rounded-md focus:outline-none focus:border-blue-500`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {!isValidLastName && <p className="text-red-500 text-sm mb-4">Last name is required</p>}

            {/* Date of Birth input */}
            <input
              type="text"
              placeholder="Enter your date of birth"
              className={`w-[45%] p-2 mb-4 border ${isValidDateOfBirth ? 'border-gray-400' : 'border-red-500'} rounded-md focus:outline-none focus:border-blue-500`}
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            {!isValidDateOfBirth && <p className="text-red-500 text-sm mb-4">Date of birth is required</p>}

            {/* Email input */}
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-[45%] p-2 mb-4 border ${isValidEmail ? 'border-gray-400' : 'border-red-500'} rounded-md focus:outline-none focus:border-blue-500`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly  // Add the readOnly attribute
            />
            {!isValidEmail && <p className="text-red-500 text-sm mb-4">Invalid email format</p>}

            {/* Password input */}
            <input
              type="password"
              placeholder="Enter your password"
              className={`w-[45%] p-2 mb-4 border ${isValidPassword ? 'border-gray-400' : 'border-red-500'} rounded-md focus:outline-none focus:border-blue-500`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isValidPassword && <p className="text-red-500 text-sm mb-4">Password is required</p>}

            {/* Confirm Password input */}
            <input
              type="password"
              placeholder="Confirm your password"
              className={`w-[45%] p-2 mb-4 border ${isValidConfirmPassword ? 'border-gray-400' : 'border-red-500'} rounded-md focus:outline-none focus:border-blue-500`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!isValidConfirmPassword && <p className="text-red-500 text-sm mb-4">Passwords do not match</p>}

            {/* OTP input */}
            <input
              type="text"
              placeholder="Enter your OTP"
              className={`w-[45%] p-2 mb-4 border ${isValidOtp ? 'border-gray-400' : 'border-red-500'} rounded-md focus:outline-none focus:border-blue-500`}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            {!isValidOtp && <p className="text-red-500 text-sm mb-4">OTP is required</p>}

            {/* Signup button */}
            <button
              className="bg-gray-800 text-white p-3 px-8 rounded-md hover:bg-gray-700 focus:outline-none"
              onClick={handleSignupClick}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

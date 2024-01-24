import React, { useState } from 'react';
import quiz from '../../assets/quiz.webp';
import { useNavigate } from 'react-router-dom';
import {apiCall} from '../../utils/ApiCall'
import { toast } from 'react-toastify';
const SendOtp = ({setIsEmailField , email,setEmail}) => {
  // const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // State to manage form validation
  const [isValidEmail, setIsValidEmail] = useState(true);

  // Function to validate email format
  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  // Function to handle "Send OTP" button click
  const handleSendOtpClick = async () => {
    const isValid = validateEmail(email);
    setIsValidEmail(isValid);
    if (isValid) {
      try {
        toast.info("Sending OTP. Please wait...", { autoClose: false, hideProgressBar: true });
        const obj = {
          email: email
        };
        const sendOtpResponse = await apiCall('/auth/sendotp', obj);
        if (sendOtpResponse.success) {
          toast.dismiss();
          toast.success("OTP sent successfully. Redirecting to signup.");
          setIsEmailField(true);
        } else {
          toast.dismiss();
          toast.error("Failed to send OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error while sending OTP:", error);
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
      <div className='w-[50%] h-full '>
        <div className="flex justify-center items-center h-full bg-gray-900">
          <div className="bg-white p-8 rounded-md min-w-[60%] min-h-[250px]">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Enter Email</h2>

            {/* Email input */}
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full p-2 mb-4 border ${isValidEmail ? 'border-gray-400' : 'border-red-500'} rounded-md focus:outline-none focus:border-blue-500`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isValidEmail && <p className="text-red-500 text-sm mb-4">Invalid email format</p>}

            {/* Send OTP button */}
            <button
              className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none"
              onClick={handleSendOtpClick}
            >
              Send OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendOtp;

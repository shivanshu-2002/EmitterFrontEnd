import React, { useState } from 'react'
import SendOtp from './SendOtp';
import Signup from './Signup';
const CreateAccount = () => {
     const [isEmailFilled , setIsEmailField] = useState(false);
     const [email, setEmail] = useState('');
  return (
     <>
     {
        isEmailFilled?<Signup givenemail={email}/>: <SendOtp setIsEmailField={setIsEmailField } email={email} setEmail={setEmail} />
     }
     </>
  )
}

export default CreateAccount
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './View/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer'
import Login from './View/auth/Login';

import './App.css'
import {DataContextProvider} from './utils/Context';
import QuizDetail from './View/Quiz Page/QuizDetail';
import Profile from './View/Profile/Profile';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateAccount from './View/auth/CreateAccount';

function App() {
 
  return (
    <Router>
    <DataContextProvider>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/sendOtp" element={<SendOtp />} /> */}
        {/* <Route path='/signup' element={<Signup/>}/> */}
        <Route path='/create-account' element= {<CreateAccount/>}/>
        <Route path='/login' element= {<Login/>}/>
        <Route path='/quiz/:id' element = {<QuizDetail/>}/>
        <Route path='/profile/' element = {<Profile/>}/>
      </Routes>
      <ToastContainer />
    <Footer/>
    </DataContextProvider>
    </Router>
  );
}

export default App;

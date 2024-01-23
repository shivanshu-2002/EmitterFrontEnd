import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModel from '../ConfirmationModel/ConfirmationModel';


const QuizDisplaySection = ({ id, title, description, language, questionCount }) => {
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const navigate = useNavigate();
    const handleNavigate = () => {
        setOpenConfirmation(true);
    }
    const navigateToQuiz = ()=>{
        navigate(`/quiz/${id}`)
    }
    return (
        <>
            {
                openConfirmation ? <ConfirmationModel setOpenConfirmation={setOpenConfirmation } navigateToQuiz={navigateToQuiz}/> : <div></div>
            }
            <div className='w-[100%] hover:scale-105 cursor-pointer hover:shadow-2xl transition-[2s] mx-auto bg-gray-800 flex items-center justify-between text-white p-8 rounded-lg' onClick={handleNavigate}>
                <div>
                    <h2 className='text-3xl font-bold mb-4'>{title}</h2>
                    <p className='text-lg mb-3'>{description}</p>
                </div>
                <div className=' justify-between items-center text-gray-300 flex flex-col'>
                    <p className='text-xl  font-semibold'>{`Language: ${language}`}</p>
                    <p className='text-xl font-semibold'>{`Question Count: ${questionCount}`}</p>
                </div>
            </div>
        </>
    );
};

export default QuizDisplaySection;


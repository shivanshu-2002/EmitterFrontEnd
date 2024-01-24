import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { apiCall ,apiCallGet} from '../../utils/ApiCall';
import  Result  from './Result';
import Question from './component/Qustion'
import Spinner from '../../Components/Spinner.jsx/Spinner';
import { useCookies } from "react-cookie";

const QuizDetail = () => {
    const [cookies] = useCookies();
    const { pathname } = useLocation();
    const path = pathname.split('/')[pathname.split('/').length - 1];
    const [quizDetail, setQuizDetail] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [result,setResult] = useState('')

    const getData = async () => {
        try {
            const response = await apiCallGet(`/quiz/getQuizDetails/${path}`,cookies);
            setQuizDetail(response.data[0]);
            // Initialize selectedOptions state with default values
            const initialSelectedOptions = response.data[0].questionsDetails.map((question) => ({
                questionId: question._id,
                selectedOption: null,
            }));
            setSelectedOptions(initialSelectedOptions);
        } catch (error) {
            console.error('Error fetching quiz details:', error);
            // Handle error appropriately (e.g., show an error message)
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleOptionSelect = (questionId, optionIndex) => {
        setSelectedOptions((prevSelectedOptions) => {
            return prevSelectedOptions.map((question) =>
                question.questionId === questionId
                    ? { ...question, selectedOption: optionIndex }
                    : question
            );
        });
    };

    const handleSubmit = async () => {
        try {
            const data = {
                quizId: path,
                userResponses: selectedOptions
            };
            const response = await apiCall('/quiz/evaluateQuiz', data , cookies);
            setResult(response?.result)
            if(response.success){
                setShowResult(true);
            }
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };
    return (
        <>
           {
            showResult? <Result setShowResult={setShowResult} result={result}/>:<div></div>
           }
            <div className="bg-gray-800 min-h-screen border-t-2 text-white p-8">
            {quizDetail ? (
                <div className='w-[80%] mx-auto'>
                    <div className='bg-white my-5 text-black rounded-xl font-3xl font-semibold flex flex-row justify-center gap-4 flex-wrap'>
                        <div className='w-[40%] flex flex-col p-5  items-center justify-center'>
                            <h1 className="text-3xl font-bold ">{quizDetail.title}</h1>
                            <p className=" ">{quizDetail.description}</p>
                        </div>
                        <div className='w-[40%] flex flex-col items-center justify-center'>
                            <p className="">Language: {quizDetail.language}</p>
                            <p className=" ">Created At: {quizDetail.createdAt}</p>
                        </div>
                    </div>
                    {/* Questions */}
                    <ul>
                        {quizDetail.questionsDetails.map((question, index) => (
                               <Question question={question} index={index} selectedOptions={selectedOptions} handleOptionSelect={handleOptionSelect}/>
                        ))}
                    </ul>

                    <div className='text-center w-[200px] mx-auto text-gray-800 font-semibold text-xl hover:bg-green-500 cursor-pointer bg-white p-3 px-5 border-2 rounded-lg' onClick={handleSubmit}>Submit</div>
                </div>
            ) : (
                <div className='w-[100vw] h-[100vh] flex justify-center items-center'><Spinner/></div>
            )}
        </div>
        </>
       
    );
};

export default QuizDetail;

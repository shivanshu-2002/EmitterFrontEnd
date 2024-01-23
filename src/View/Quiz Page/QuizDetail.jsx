import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { apiCall ,apiCallGet} from '../../utils/ApiCall';
import  Result  from './Result';

const QuizDetail = () => {
    const { pathname } = useLocation();
    const path = pathname.split('/')[pathname.split('/').length - 1];
    const [quizDetail, setQuizDetail] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [result,setResult] = useState('')

    const getData = async () => {
        try {
            const response = await apiCallGet(`/quiz/getQuizDetails/${path}`);
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
          console.log(optionIndex)
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
            console.log(data);
            const response = await apiCall('/quiz/evaluateQuiz', data);
            console.log(response?.result);
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
                            <li key={index} className="mb-4">
                                <p className='text-2xl text-center '>({Number(index) + 1}){question.text}</p>
                                <div className="flex flex-row flex-wrap items-center justify-center  gap-4 mt-5 w-[60%] mx-auto">
                                    {question.options.map((option, optionIndex) => (
                                        <label key={optionIndex} className={`mb-2 p-3 border-2 w-[40%] cursor-pointer rounded-lg ${selectedOptions.find((q) => q.selectedOption === option) ? 'bg-green-600' : ''} hover:bg-green-600`}>
                                            <input
                                                type="radio"
                                                name={`question_${question._id}`}
                                                value={optionIndex}
                                                checked={selectedOptions.find((q) => q.selectedOption === option)}
                                                onChange={() => handleOptionSelect(question._id, option)}
                                                className="mr-2"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className='text-center w-[200px] mx-auto text-gray-800 font-semibold text-xl hover:bg-green-500 cursor-pointer bg-white p-3 px-5 border-2 rounded-lg' onClick={handleSubmit}>Submit</div>
                </div>
            ) : (
                <p>Loading quiz details...</p>
            )}
        </div>
        </>
       
    );
};

export default QuizDetail;

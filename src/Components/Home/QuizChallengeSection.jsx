// QuizChallengeSection.js
import React, { useEffect, useState } from 'react';
import QuizDisplaySection from './QuizDisplaySection'; // Import the QuizDisplaySection component
import { apiCall } from '../../utils/ApiCall';
import Spinner from '../Spinner.jsx/Spinner';
import { ImSad } from "react-icons/im";

const QuizChallengeSection = ({ filter }) => {
  // Load the elements when the component is rendered
  const [selectedLevel, setSelectedLevel] = useState(0);

  const handleLevelChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSelectedLevel(selectedValue);
    console.log(selectedValue)
  };
 


  const [quiz, setQuiz] = useState(null);
  const data = {
    skip: 0,
    limit: 10,
    filter: filter,
    userProficiencyLevel:selectedLevel
  }
  const getData = async () => {
    const resp = await apiCall('/quiz/getQuizList', data)
    setQuiz(resp.data)
  }

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, [filter,selectedLevel]);

  return (
    <div className='w-[80%] mx-auto mt-8'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold mb-6'>
          Challenge your Self with these Quizzes</h1>
        <div>
          <label htmlFor="proficiencyLevel">Select Proficiency Level:</label>
          <select className='p-2 border-[1px] rounded-lg mx-3'
            id="proficiencyLevel"
            name="proficiencyLevel"
            value={selectedLevel}
            onChange={handleLevelChange}
          >
           
            {[...Array(6).keys()].map((level) => (
              <option key={level} value={level}>
              {
                level ==0?'all': `Level ${level}`
              } 
              </option>
            ))}
          </select>
        </div>
      </div>
      {
        loading ? <Spinner /> : (
          <div className='flex flex-col items-center justify-center gap-2'>  
            {
              quiz!=null &&  quiz.length === 0 ? <div className='text-3xl font-semibold flex items-center justify-center gap-2 my-[100px]'>No Data found import <ImSad /> </div> :
                quiz?.map((item, index) => (
                  <QuizDisplaySection
                    id={item._id}
                    key={index} // Add a unique key prop for each item in the list
                    title={item?.title}
                    description={item?.description}
                    language={item?.language}
                    questionCount={item?.questionCount}
                  />
                ))
            }
          </div>
        )
      }

    </div>
  );
};

export default QuizChallengeSection;

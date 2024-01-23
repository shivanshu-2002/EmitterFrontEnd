import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../utils/Context';
import {apiCallGet,apiCall} from '../../utils/ApiCall.jsx'

const Profile = () => {
  // Mock user data
     const {user} = useContext(DataContext);
     const [userProgress ,setUserProgress] = useState(null)
     const [prevQuizzes,setPrevQuizzes] = useState(null);

     const getProgress = async () => {
      try {
        const response = await apiCallGet('/user/getUserProgress');
        if (response.success) {
          setUserProgress(response.languageProgress);
        }
      } catch (error) {
        console.error('Error fetching user progress:', error);
      }
    };
    
    const getPrevQuiz = async () => {
      try {
        const data = {
          skip: 0,
          limit: 10
        };
        const response = await apiCall('/user/prevQuizes', data);
        setPrevQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching previous quizzes:', error);
      }
    };
    
    useEffect(() => {
      const fetchData = async () => {
        await getProgress();
        await getPrevQuiz();
      };
    
      fetchData();
    }, []);
    

  return (
    <div className="max-w-3xl mx-auto my-8">
      {/* User Detail */}
      <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center">User Details</h2>
        <div className='flex justify-around  items-center'>
        <div className="flex items-center mb-4">
          <img className="rounded-full h-[60px] w-[60px] mr-4" src={user?.image} alt="User Avatar" />
          <div>
            <p className="text-lg font-semibold">{user?.username}</p>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className='flex flex-col'>
        <p className="text-gray-700">Full Name: {`${user?.profile?.firstName} ${user?.profile?.lastName}`}</p>
        <p className="text-gray-700">Date of Birth: {new Date(user?.profile?.dateOfBirth).toLocaleDateString()}</p>
        </div>
        </div>
      </div>

      {/* User Progress */}
      <div className="bg-gray-100 min-h-[200px] p-4 rounded-md shadow-md mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center">User Progress</h2>
        <ul className='flex justify-around gap-5 flex-wrap '>
      {
       userProgress===null?<div>Nothing to Show</div>:  
       <> {userProgress?.map((progressItem) => (
            <li key={progressItem?._id} className="mb-2 
             ">
              <p className="font-semibold text-2xl">{progressItem?.language}</p>
              <p className='font-semibold text-lg text-gray-500'>Proficiency Level: {progressItem?.proficiencyLevel}</p>
              <p className='font-semibold text-lg text-gray-500'>Total Points: {progressItem?.totalPoints}</p>
            </li>
          ))}
          </>
      }
        </ul>
      </div>

      {/* User Previous quizzes */}
      <div className="bg-gray-100 p-7 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">User's Previous Quizzes</h2>
        <ul>
        {
        prevQuizzes===null?<div className='text-center'>No Previous Quiz Available</div>:
          <>
          {prevQuizzes?.map((quiz) => (
            <li key={quiz?._id} className="mb-4  w-[90%] mx-auto flex justify-between bg-gray-300 p-4 items-center rounded-lg hover:shadow-2xl hover:translate-y-[-2px] transition-[2s]">
            <div className=''>
              <p className="font-semibold text-2xl">{quiz?.title}</p>
              <p className='font-semibold text-gray-600'>Score: {quiz?.score}</p>
              </div>
              <p className='w-[30%] text-lg font-semibold text-gray-600'>Completed At: {new Date(quiz?.completedAt).toLocaleString()}</p>
            </li>
          ))}
          </>
          }
        </ul>
      </div>
            {/*Publish Your quiz  */}
    </div>
  );
};

export default Profile;

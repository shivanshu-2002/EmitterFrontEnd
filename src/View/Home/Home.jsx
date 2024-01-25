import React, { useEffect, useState } from 'react'
import { FaCrown } from "react-icons/fa";
import english from '../../assets/english.jpg';
import hindi from '../../assets/hindi.jpg';
import spanish from '../../assets/spanish.jpg'
import user from '../../assets/User.jpg';
import language from '../../assets/language.jpg';
import quizs from '../../assets/quiz.jpg';
import rating from '../../assets/rating.jpg'
import russian from '../../assets/russian.jpg'
import img2 from '../../assets/Premium Vector _ Quiz vector logo isolate on white, questionnaire icon, poll sign, flat bubble speech symbols, concept of social communication, chatting, interview.jpg'
import QuizChallengeSection from '../../Components/Home/QuizChallengeSection';
import { apiCallGet } from '../../utils/ApiCall';
import Spinner from '../../Components/Spinner.jsx/Spinner';
const Home = () => {

      const [filter, setFilter] = useState('');
      const generateContainerStyle = (img) => {
            return {
                  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url('${img}') lightgray 50% / cover no-repeat`,
                  backdropFilter: 'blur(2px)',
            };
      };

      const [leaderBoardData, setLeaderBoardData] = useState(null);
      const [isLoader, setIsLoader] = useState(false);

      const getLeaderBoard = async () => {
            const data = await apiCallGet('/user/leaderboard');
            setLeaderBoardData(data.data);
      }

      useEffect(() => {
            setIsLoader(true);
            getLeaderBoard();
            setIsLoader(false);
      }, [])

      return (
            <div className='min-h-[100vh] py-10 w-[100%] flex flex-col gap-10'>
                  <div className='w-[80%] mx-auto  flex justify-between items-center'>
                        <div className='text-[32px] font-bold w-[40%] '>
                              Increase Your Language Knowledge by playing with the Quizs
                              <div className='text-gray-400 text-lg font-semibold'>"Empower language learners with our intuitive app. Personalized courses, quizzes, and progress tracking for a seamless language journey</div>
                              <div className='p-2 px-4 bg-gray-800 rounded-lg mt-4 text-[17px] hover:scale-105 hover:shadow-2xl transition-[2s] w-[200px] text-white py-4 text-center'>Try Now!</div>
                        </div>
                        <div className='mt-3 p-3'>
                              <img src={img2} alt='image  banner' />
                        </div>
                  </div>
                  {/* Some stats */}

                  {/* Leader Board */}
                  <div className='w-[100%] h-[450px]  flex flex-col items-center   justify-between '>
                        <div className='w-[80%] text-[32px] gap-3 font-semibold  items-center flex justify-center'>
                              <div><FaCrown className='text-yellow-600' /></div>
                              <div> Leader Board</div>
                        </div>
                        <div className='w-[80%] h-full flex  items-center justify-center  rounded-full px-5 py-2 bg-gray-200'>
                              {
                                    isLoader ? <Spinner /> : <>
                                          {
                                                leaderBoardData === null ? <div className='w-full h-full items-center justify-center text-2xl'>Cant fetch LeaderBoard Sorry!</div> :
                                                 <div className='relative w-[20%] mb-[70px] '>
                                                      <div className='relative top-1/2 w-[100%] h-full  border-[1px] hover:scale-105 hover:shadow-2xl  shadow-blur-[3xl] transition-[2s] border-gray-400 p-2 rounded-lg flex flex-col justify-center gap-2'>
                                                            <div className='h-[40%] flex items-center justify-center  '>
                                                                  <img src={leaderBoardData[0].userImage} alt='image' className='w-[45%] rounded-full ' />
                                                            </div>
                                                            <div className='text-gray-800 font-semibold text-xl text-center'>{leaderBoardData[0].userName}</div>
                                                            <div>
                                                                  <div className='text-gray-900 font-semibold text-center'>Total Points-{leaderBoardData[0].totalPoints}</div>
                                                            </div>
                                                            <div className='absolute top-3 right-2 text-yellow-400'><FaCrown className='text-yellow-600' size={30} /></div>
                                                      </div>
                                                      <div className='absolute top-1/2 left-[-110%] w-[100%] h-full  border-[1px] hover:scale-105 hover:shadow-2xl  shadow-blur-[3xl] transition-[2s] border-gray-400 p-2 rounded-lg flex flex-col justify-center gap-2'>
                                                            <div className='h-[40%] flex items-center justify-center  '>
                                                                  <img src={leaderBoardData[1].userImage} alt='image' className='w-[45%] rounded-full ' />
                                                            </div>
                                                            <div className='text-gray-800 font-semibold text-xl text-center'>{leaderBoardData[1].userName}</div>
                                                            <div>
                                                                  <div className='text-gray-900 font-semibold text-center'>Total Points-{leaderBoardData[1].totalPoints}</div>
                                                                  
                                                            </div>
                                                            <div className='absolute top-3 right-2 text-yellow-400'>
                                                            <FaCrown className='text-yellow-600' size={30} />
                                                            <FaCrown className='text-yellow-600' size={30} />
                                                            </div>
                                                      </div>
                                                      <div className='absolute top-1/2 right-[-110%] w-[100%] h-full  border-[1px] hover:scale-105 hover:shadow-2xl  shadow-blur-[3xl] transition-[2s] border-gray-400 p-2 rounded-lg flex flex-col justify-center gap-2'>
                                                            <div className='h-[40%] flex items-center justify-center  '>
                                                                  <img src={leaderBoardData[2].userImage} alt='image' className='w-[45%] rounded-full ' />
                                                            </div>
                                                            <div className='text-gray-800 font-semibold text-xl text-center'>{leaderBoardData[2].userName}</div>
                                                            <div>
                                                                  <div className='text-gray-900 font-semibold text-center'>Total Points-{leaderBoardData[2].totalPoints}</div>
                                                                 
                                                            </div>
                                                            <div className='absolute top-3 right-2 text-yellow-400'>
                                                            <FaCrown className='text-yellow-600' size={30} />
                                                            <FaCrown className='text-yellow-600' size={30} />
                                                            <FaCrown className='text-yellow-600' size={30} />
                                                            </div>
                                                      </div>
                                                </div>
                                          } </>
                              }
                        </div>
                  </div>
                  {/* QUiz Language */}
                  <div className='w-[100%] h-[260px]  flex flex-col items-center  gap-5 justify-end '>
                        <div className='w-[80%] text-[32px] gap-3 font-semibold  items-center flex justify-center'>
                              <div> Select Languages</div>
                        </div>
                        <div className='w-[80%] h-[200px] flex items-center justify-between mx-auto'>
                              <div className='w-[23%] flex flex-col gap-2 items-center rounded-lg bg-gray-800 justify-center h-full hover:scale-105 hover:shadow-2xl transition-[2s] text-white hover:text-gray-300' style={{ backgroundImage: `url(${english})`, backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => setFilter('ENGLISH')}>
                              </div>
                              <div className='w-[23%] flex flex-col gap-2 items-center rounded-lg bg-gray-800 justify-center h-full hover:scale-105 hover:shadow-2xl transition-[2s] text-white hover:text-gray-300' style={{ backgroundImage: `url(${hindi})`, backgroundSize: 'contain', backgroundPosition: 'center' }} onClick={() => setFilter('HINDI')}>
                              </div>
                              <div className='w-[23%] flex flex-col gap-2 items-center rounded-lg bg-gray-800 justify-center h-full hover:scale-105 hover:shadow-2xl transition-[2s] text-white hover:text-gray-300' style={{ backgroundImage: `url(${spanish})`, backgroundSize: 'contain', backgroundPosition: 'center' }} onClick={() => setFilter('FRENCH')}>
                                    <div className='text-[60px] font-bold text-black'> French</div>
                              </div>
                              <div className='w-[23%] flex flex-col gap-2 items-center rounded-lg bg-gray-800 justify-center h-full hover:scale-105 hover:shadow-2xl transition-[2s] text-white hover:text-gray-300' style={{ backgroundImage: `url(${russian})`, backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => setFilter('RUSSIAN')}>
                              </div>
                        </div>

                  </div>
                  {/* QUiz Display */}

                  <QuizChallengeSection filter={filter} />
            </div>
      )
}

export default Home
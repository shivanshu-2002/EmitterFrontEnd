import React from 'react'

const Qustion = ({question,index,selectedOptions,handleOptionSelect}) => {
  return (
    <li key={index} className="mb-4">
                                <p className='text-2xl text-center '>({Number(index) + 1}){question.text}</p>
                                <div className="flex flex-row flex-wrap items-center justify-center  gap-4 mt-5 w-[60%] mx-auto">
                                    {question.options.map((option, optionIndex) => (
                                        <label key={optionIndex} className={`mb-2 p-3 border-2 w-[260px] flex items-center justify-start  h-[60px] cursor-pointer rounded-lg ${selectedOptions.find((q) => (q.selectedOption === option && q.questionId ==question._id)) ? 'bg-green-600' : ''} hover:bg-green-600`}>
                                            <input
                                                type="radio"
                                                name={`question_${question._id}`}
                                                value={optionIndex}
                                                checked={selectedOptions.find((q) => (q.selectedOption === option && q.questionId ==question._id))}
                                                onChange={() => handleOptionSelect(question._id, option)}
                                                className="mr-2"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </li>
  )
}

export default Qustion
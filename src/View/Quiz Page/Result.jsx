import React from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Result = ({setShowResult,result}) => {
   const navigate = useNavigate();
  return (
    <div className="fixed z-10 inset-0 bg-opacity-80 bg-black flex justify-center items-center">
      <div className="relative text-white bg-white w-full max-w-md dark:bg-[#121212] justify-evenly space-y-5 p-6 flex flex-col rounded-2xl border">
        <button
          onClick={() => {
            navigate('/')
          }}
        >
          <MdCancel className="absolute top-2 right-2 dark:text-white text-black" size={30} onClick={()=>{setShowResult(false)}}/>
        </button>
        <div className="text-2xl font-semibold mb-2">Results</div>
        <div className="flex justify-between">
          <div>Total Correct Answers:</div>
          <div>{result?.totalCorrectAnswers}</div>{/* Replace with actual value */}
        </div>
        <div className="flex justify-between">
          <div>Total Wrong Answers:</div>
          <div>{result?.totalQuestions - result?.totalCorrectAnswers}</div>{/* Replace with actual value */}
        </div>
        <div className="flex justify-between">
          <div>Percentage:</div>
          <div>{result?.percentage}</div>{/* Replace with actual value */}
        </div>
        <div className="flex justify-between">
          <div>Result:</div>
          <div>{result.percentage>33?"Pass":"Fail"}</div>{/* Replace with actual value */}
        </div>
      </div>
    </div>
  );
};

export default Result;

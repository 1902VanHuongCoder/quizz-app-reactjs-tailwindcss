import { useContext, useEffect, useRef, useState } from "react";
import QuizContext from "./quizContext";
import { Circle } from "rc-progress";
import { useNavigate, useParams } from "react-router-dom";
const Quizz = () => {
  const { questions, currentQuestion, setCurrentQuestion } =
    useContext(QuizContext); //Receives transmitted data from its father
  const [isStart, setIsStart] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isNextButton, setIsNextButton] = useState(true);
  const [isResultButton, setIsResultButton] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [answerArray, setAnswerArray] = useState([]);
  const [time, setTime] = useState(30);
  const { level } = useParams(); // Get a parameter from the URL to retrieve the matching set of questions


  const navigate = useNavigate(); 
  const answers = questions[level][currentQuestion]; // 

  const hanleSelectAnswer = (index) => {
    if (currentQuestion >= questions[level].length - 1) {
      setIsResultButton(true);
      setIsNextButton(false);
    } else {
      setIsNextButton(true);
      setIsResultButton(false);
    }
    setSelectedIndex(index);
  };

  const currentStates = useRef({ 
    currentQuestion: currentQuestion,
    selectedIndex: selectedIndex,
    answerArray: answerArray
  });


  useEffect(() => {  // Update the latest value used for the function in useRef
    currentStates.current.currentQuestion = currentQuestion;
    currentStates.current.selectedIndex = selectedIndex;
    currentStates.current.answerArray = answerArray;

  }, [currentQuestion, selectedIndex, answerArray]);


  const nextquestion = useRef(() => { // Process to move to the next question 
    if (currentStates.current.currentQuestion >= questions[level].length - 1) {
      setCurrentQuestion(0);
      setIsResult(true);
      addAnswer(currentStates.current.selectedIndex);
    } else {
      setCurrentQuestion(currentStates.current.currentQuestion + 1);
      setSelectedIndex(null);
      addAnswer(currentStates.current.selectedIndex);
      setTime(10);
      setIsNextButton(false);
    }
  });

  function addAnswer(index) { // Add answer into answerArray
    let selectedAnswer =
      currentStates.current.selectedIndex === null
        ? {
            answer: "Üzgün",
            trueAnswer: false,
          }
        : questions[level][currentStates.current.currentQuestion].answers[index];
    let newAnswerArray = [...currentStates.current.answerArray, selectedAnswer];
    setAnswerArray(newAnswerArray);
  }

  let interval = useRef();
  useEffect(() => { //Create a countdown timer
    if (!isStart) {
      interval.current = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    }

    if (time === 0) { // If the time runs out, the question will automatically change
      nextquestion.current();
    }
    return () => clearInterval(interval.current); //Use cleanup function to avoid infinite loop when using useEffect 
  }, [time, isStart]);
  return isResult ? (
    navigate("/result", { //Navigate to the results page when completing the quizz
      state: {
        answers: answerArray,
        questions: questions[level],
      },
    })
  ) : (
    <div>
      <div className="relative flex justify-between px-6 py-3 items-center bg-[#00C4FF]">
        <div className="z-10 text-white uppercase font-medium">
          {" "}
          English vocabulary <br /> quizz
        </div>
        <div className="cursor-pointer p-1 w-10 h-10 flex justify-center items-center bg-[#FFF5B8] rounded-full">
          {level}
        </div>
        <div className="absolute top-2 left-2 w-10 h-10 bg-[#30A2FF] rounded-full z-0"></div>
        <div className="absolute right-20 bottom-1 w-7 h-7 bg-[#30A2FF] rounded-full z-0"></div>
        <div className="absolute right-[50%] top-3 w-3 h-3 bg-[#30A2FF] rounded-full z-0"></div>
      </div>
      {isStart && ( // create standby screen before entering the test
        <div className="relative bg-[url(./paper1.jpg)] bg-cover bg-center w-full h-screen text-white">
          <div className="p-2 text-center font-medium text-black">
            Start the test with level
          </div>
          <div className="text-2xl flex justify-center">
            <div className="w-fit h-fit p-2 bg-[#00C4FF] rounded-full">
              {level} 
            </div>
          </div>
          <div className="p-2">
            <h2 className="text-black">Rules: </h2>
            <div className="text-black">
              You will have 20 question, each of which you will have 30 secons
              to answer. Good luck!
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                setIsStart(false);
              }}
              className="py-1 px-4 bg-[#FFF5B8] text-black rounded-sm font-medium"
            >
              Start
            </button>
          </div>
        </div>
      )}
      {!isStart && (
        <div className="h-fit w-screen bg-[url(./paper1.jpg)] bg-center bg-cover">
          <div className="w-full p-3 flex flex-col items-center justify-center gap-3">
            <div className="flex gap-5 w-full justify-between p-3">
              <div className="flex flex-col justify-center items-center">
                <div className="relative basis-[50%]">
                  <Circle // use rc-progress to create the process circle
                    percent={Math.round(
                      (currentQuestion / questions[level].length) * 100
                    )}
                    strokeWidth="7"
                    strokeColor="#00d8ff"
                    trailColor="#FFE7A0"
                    trailWidth="3"
                    strokeLinecap="round"
                    className="w-[80px] h-[80px]"
                  />
                  <div className="absolute text-black  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    {Math.round(
                      (currentQuestion / questions[level].length) * 100
                    )}
                    %
                  </div>
                </div>
                {currentQuestion === 0 ? null : (
                  <div className="text-black font-bold text-center">
                    You completed {currentQuestion} questions
                  </div>
                )}
              </div>
              <div className="basis-[50%] flex flex-col justify-center items-center text-white">
                <h2 className="text-black">Time: {time}s</h2>
                {time <= 5 && <div>Run out of time</div>}
              </div>
            </div>
          </div>
          <div className="">
            <h1 className="text-black p-2 font-medium mt-4">
              Question {currentQuestion + 1}: {answers.question}
            </h1>
            <div>
              {answers.answers.map((answer, index) => {
                return (
                  <label
                    htmlFor={index}
                    key={index}
                    className={
                      selectedIndex === index
                        ? "bg-[#00d8ff] border-[2px] border-solid border-black flex justify-between p-3 mt-2 rounded-xl w-[90%] mx-auto"
                        : "bg-[white] border-[1px] border-solid border-black flex justify-between flex justify-between p-3 mt-2 rounded-xl w-[90%] mx-auto"
                    }
                  >
                    {answer.answer}
                    <input
                      onChange={() => {
                        hanleSelectAnswer(index);
                      }}
                      type="radio"
                      id={index}
                      checked={selectedIndex === index}
                    />
                  </label>
                );
              })}
              <div className="mt-3 flex justify-end px-6">
                {isNextButton && (
                  <button
                    className="bg-[#FFF5B8] p-2 rounded-sm"
                    onClick={nextquestion.current}
                  >
                    Next Question &gt;{" "}
                  </button>
                )}
                {isResultButton && (
                  <button
                    className="bg-[#FFF5B8] p-2 rounded-sm"
                    onClick={nextquestion.current}
                  >
                    {" "}
                    Result &gt;{" "}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quizz;

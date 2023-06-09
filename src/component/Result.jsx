import { BiBook } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
const Result = () => {
  const result = useLocation();
  const answerArray = result.state.answers;
  const questions = result.state.questions;
  let score = 0;
  answerArray.forEach((element) => {
    if (element.trueAnswer) {
      score = score + 1;
    }
  });
  let percent = Math.round((score / questions.length) * 100);
  return (
    <div>
      <div className="relative flex justify-between px-6 py-3 items-center bg-[#00C4FF]">
        <div className="z-10 text-white uppercase font-medium">
          {" "}
          English vocabulary <br /> quizz
        </div>
        <div className="cursor-pointer p-2 bg-[#FFF5B8] rounded-full">
          <BiBook />
        </div>
        <div className="absolute top-2 left-2 w-10 h-10 bg-[#30A2FF] rounded-full z-0"></div>
        <div className="absolute right-20 bottom-1 w-7 h-7 bg-[#30A2FF] rounded-full z-0"></div>
        <div className="absolute right-[50%] top-3 w-3 h-3 bg-[#30A2FF] rounded-full z-0"></div>
      </div>

      <div className="bg-[#00C4FF] h-fit w-screen">
        <div className="w-full bg-[url(./congratulationpaper.jpg)] bg-center bg-cover p-3 flex flex-col items-center justify-center gap-1">
          <div className="text-2xl text-[#ea03f3]">
            {percent}% <small className="text-[14px]">Correct</small>
          </div>
          <div> Congratulations</div>
        </div>
        <div className="p-2">
          <div>
            <h1 className="pl-2 mb-2 text-white font-bold">Your result</h1>
            <div className="flex flex-col gap-2 pl-2 mb-2 text-white font-bold">
              <div className="flex gap-2">
                <span className="w-7 h-7 bg-[#9dffcb] flex justify-center items-center rounded-full">
                  <AiOutlineCheckCircle className="text-[#128f01] font-bold" />
                </span>
                <span>Correct Answer</span>
              </div>
              <div className="flex gap-2">
                <span className="w-7 h-7 bg-[#ffdbdb] flex justify-center items-center rounded-full">
                <AiOutlineCloseCircle className="text-[#ff98b3] font-bold" />
                </span>
                <span>Wrong Answer</span>
              </div>
            </div>
          </div>
          <div>
            {questions.map((question, index) => {
              return (
                <div
                  key={index}
                  className={`bg-white mb-3 rounded-lg p-2 ${
                    answerArray[index].trueAnswer === false && "bg-[#ffc4c4]"
                  }`}
                >
                  <h1 className="font-bold mb-2">
                    Question {index + 1}: {question.question}
                  </h1>
                  <div>
                    {question.answers.map((answer, i) => {
                      let isTrueAnswer = answer.trueAnswer;
                      let isWrongAnswer =
                        answerArray[index].trueAnswer === false &&
                        answerArray[index].answer === answer.answer;
                      return (
                        <div
                          className={`${isTrueAnswer && "bg-[#9dffcb]"} ${
                            isWrongAnswer && "bg-[#ffdbdb]"
                          } bg-slate-100 mb-1 p-2 rounded-xl flex justify-between items-center`}
                          key={i}
                        >
                          {answer.answer}
                          {isTrueAnswer && (
                            <AiOutlineCheckCircle className="text-[#128f01] font-bold" />
                          )}
                          {isWrongAnswer && (
                            <AiOutlineCloseCircle className="text-[#ff98b3] font-bold" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pt-2 flex justify-center items-center">
            <Link to="/">
              <button className="px-4 py-1 rounded-sm bg-white ">
                Home &gt;{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;

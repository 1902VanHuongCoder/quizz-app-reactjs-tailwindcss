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
          <h1 className="pl-2 mb-2 text-white font-bold">Your result</h1>
          <div>
            {answerArray.map((answer, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-white rounded-xl mb-2 w-[95%] mx-auto"
                >
                  <div className="flex justify-center items-center w-5 h-5 bg-slate-200 text-sm rounded-full">
                    {index + 1}
                  </div>
                  <div className="font-[500]">{answer.answer}</div>
                  <div className="p-1 bg-slate-200 #f2eeee rounded-md">
                    {answer.trueAnswer ? (
                      <AiOutlineCheckCircle className="text-[#13b313] font-bold" />
                    ) : (
                      <AiOutlineCloseCircle className="text-[#ff98b3] font-bold" />
                    )}
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

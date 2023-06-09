//Color codes
// #30A2FF
// #00C4FF
// #FFE7A0
// #FFF5B8
import { BiBook } from "react-icons/bi";
import { Link } from "react-router-dom";
const level = ["A1", "A2", "B1", "B2", "C1", "C2"];
const Home = () => {
  return (
    <div className="font-sans w-screen overflow-hidden overflow-y-auto bg-white h-screen">
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
      <div className="relative drop-shadow-sm p-2 pl-6 font-[600] bg-[#00d8ff] ">
        <h1 className="text-white font-small">Quizz Lists</h1>
      </div>
      <div className="p-3 w-full h-full bg-[url(./paper1.jpg)] bg-cover bg-center grid grid-cols-2 grid-row-1 gap-4">
        {level.map((lev, index) => {
          return (
            <div
              className="bg-[#00d8ff] shadow-lg rounded-xl flex flex-col items-center justify-center gap-1"
              key={index}
            >
              <div className="text-3xl text-white">{lev}</div>
              <p className="text-xs uppercase">Level</p>
              <Link to={`/quiz/${lev}`}>
                <button className="text-[#30a2ff] cursor-pointer bg-white py-1 rounded-lg mt-1 font-bold px-2">
                  Start Quizz
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

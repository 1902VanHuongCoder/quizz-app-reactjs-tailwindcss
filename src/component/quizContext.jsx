import { useState } from "react";
import { createContext } from "react";
import { questions } from "../data/data";
const QuizContext = createContext();

function Provider({children}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const sharedProps = { questions, currentQuestion, setCurrentQuestion };
  return (
    <QuizContext.Provider value={sharedProps}>{children}</QuizContext.Provider>
  );
}

export { Provider };
export default QuizContext;

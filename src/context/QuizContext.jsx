/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import quizData from "@/constants/questions.json";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  // const [quizData, setQuizData] = useState(data);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [isQuizDone, setIsQuizDone] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <QuizContext.Provider
      value={{
        quizData,
        currentQuestion,
        setCurrentQuestion,
        score,
        setScore,
        history,
        setHistory,
        isQuizDone,
        setIsQuizDone,
        username,
        setUsername,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

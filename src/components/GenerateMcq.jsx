/* eslint-disable react-hooks/exhaustive-deps */
//! UI for mcq based type questions
import { useContext, useEffect, useState } from "react";
import { TIMER_DURATION, TOTAL_MCQS } from "@/constants";

import { toastError, toastSuccess } from "@/lib/toast";
import { QuizContext } from "@/context/QuizContext";
import { indToOption } from "@/lib/indToOption";

import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

const GenerateMcq = () => {
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);

  const {
    quizData,
    currentQuestion,
    setCurrentQuestion,
    setScore,
    setHistory,
  } = useContext(QuizContext);

  const data = quizData.find((ques) => ques.id === currentQuestion) || {};

  // to set timer and history array
  useEffect(() => {
    if (!data || !data.options) return;

    if (timeLeft === 0) {
      toastError("Time's up! Moving to next question.");
      setHistory((history) => [
        ...history,
        {
          question: data.question,
          selectedAnswer: "Did not attempt.", // did not attempt
        },
      ]);
      nextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, data]);

  // handle 'next' button
  const handleClick = () => {
    if (!data || !data.options) return;

    const correctAnswer = data.answer === selected;
    setHistory((history) => [
      ...history,
      {
        question: data.question,
        selectedAnswer: selected,
        correctAnswer: data.answer,
        isCorrect: correctAnswer,
      },
    ]);

    if (correctAnswer) {
      setScore((s) => s + 1);
      toastSuccess("Correct answer");
    } else {
      toastError("Wrong answer!");
    }

    nextQuestion();
  };

  // Move to next question
  const nextQuestion = () => {
    setSelected(null);
    setTimeLeft(TIMER_DURATION);
    setCurrentQuestion((question) => question + 1);
  };

  if (!data || !data.options) return null;

  return (
    <>
      <div className="text-white text-lg sm:text-2xl text-center mb-6">
        <span className="font-semibold">Q{currentQuestion}.</span>{" "}
        {data.question}
      </div>

      {/* question counter like 1/10, 2/10 etc */}
      <div className="text-sm text-white/70 text-left mb-3 flex justify-between w-full">
        <span>
          Question {currentQuestion} / {TOTAL_MCQS}
        </span>
        <span className="text-emerald-400 font-semibold">⏳ {timeLeft}s</span>
      </div>

      <Progress
        value={(currentQuestion / TOTAL_MCQS) * 100}
        className="w-full mb-6 bg-emerald-800 rounded-full progress-bar"
      />

      {/* mcqs options */}
      <div className="space-y-4 flex flex-col items-center w-full">
        {data.options.map((option, ind) => (
          <button
            onClick={() => setSelected(ind + 1)}
            key={option}
            className={`w-[95%] max-w-2xl text-left px-4 py-3 rounded-lg text-lg flex items-center gap-3 
              border border-emerald-200 transition-all duration-200 cursor-pointer 
              ${
                selected === ind + 1
                  ? "bg-emerald-500 scale-102 shadow-md shadow-emerald-500 text-black"
                  : "bg-black-3 hover:bg-black-4 hover:shadow-sm hover:shadow-emerald-500 text-white/90"
              }`}
          >
            <span
              className={`font-bold text-xl ${
                selected === ind + 1 ? "text-black" : "text-white"
              }`}
            >
              {indToOption(ind + 1)}.
            </span>
            <span className="flex-1">{option}</span>
          </button>
        ))}

        {selected !== null && (
          <Button
            size="lg"
            className="mt-6 w-[95%] max-w-2xl text-emerald-300 bg-black-1 
            hover:bg-emerald-400 hover:text-black-1 transition-all"
            onClick={handleClick}
          >
            Next
          </Button>
        )}
      </div>
    </>
  );
};

export default GenerateMcq;

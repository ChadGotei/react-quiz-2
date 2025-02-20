/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "@/context/QuizContext";
import { TIMER_DURATION, TOTAL_QUESTIONS } from "@/constants";

import { toastError, toastSuccess } from "@/lib/toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const NumQuiz = () => {
  const {
    currentQuestion,
    setCurrentQuestion,
    quizData,
    setScore,
    setIsQuizDone,
    setHistory,
  } = useContext(QuizContext);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const navigate = useNavigate();

  const integerQuestions = quizData.filter((ques) => ques.type === "integer");
  const data = integerQuestions.find((ques) => ques.id === currentQuestion);

  // Redirect to the finish page when the quiz is over
  useEffect(() => {
    if (currentQuestion > TOTAL_QUESTIONS) {
      navigate("/finish");
    }
  }, [navigate, currentQuestion]);

  // Timer logic
  useEffect(() => {
    if (!data) return;

    if (timeLeft === 0) {
      toastError("Time's up! Moving to next question.");
      setHistory((history) => [
        ...history,
        {
          question: data.question,
          selectedAnswer: "Did not attempt."  // did not attempt
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

  const handleNext = () => {
    // cant leave empty input field
    if (!selectedAnswer) {
      toastError("Please provide an answer before proceeding");
      return;
    }

    const correctAnswer = Number(data.answer) === Number(selectedAnswer);
    setHistory((history) => [
      ...history,
      {
        question: data.question,
        selectedAnswer: selectedAnswer,
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

    if (currentQuestion === TOTAL_QUESTIONS) {
      setIsQuizDone(true);
      navigate("/finish");
    }

    nextQuestion();
  };

  // Move to the next question and reset timer
  const nextQuestion = () => {
    setSelectedAnswer("");
    setTimeLeft(TIMER_DURATION);
    if (currentQuestion < TOTAL_QUESTIONS) {
      setCurrentQuestion((question) => question + 1);
    } else {
      navigate("/finish");
    }
  };

  if (!data) return null;

  return (
    <div className="text-white text-lg space-y-6">
      <div className="flex justify-between text-sm text-white/70 mb-3">
        <span>
          Question {currentQuestion} / {TOTAL_QUESTIONS}
        </span>
        <span className="text-emerald-400 font-semibold">⏳ {timeLeft}s</span>
      </div>
      <Progress
        value={(currentQuestion / TOTAL_QUESTIONS) * 100}
        className="w-full mb-6 bg-emerald-800 rounded-full progress-bar"
      />

      <div className="font-semibold">
        Q{data.id}. {data.question}
      </div>

      <Input
        type="number"
        className="w-32 text-white font-semibold"
        value={selectedAnswer}
        onChange={(e) => setSelectedAnswer(e.target.value)}
      />

      <Button
        className="mt-6 w-full bg-emerald-500 text-black-1 transition-all hover:text-emerald-500 hover:bg-black-1"
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default NumQuiz;

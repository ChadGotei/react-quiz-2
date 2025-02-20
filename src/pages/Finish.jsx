import generateStupidName from "sillyname";
import { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { QuizContext } from "@/context/QuizContext";
import { Navigate, useNavigate } from "react-router-dom";
import { saveQuizResult } from "@/lib/indexedDB";
import { TOTAL_QUESTIONS } from "@/constants";
import { addEmoji } from "@/lib/addEmoji";

const Finish = () => {
  const {
    setCurrentQuestion,
    score,
    isQuizDone,
    history,
    setHistory,
    setScore,
    username,
  } = useContext(QuizContext);
  const navigate = useNavigate();
  let name;

  name = !username ? generateStupidName() : username;

  useEffect(() => {
    if (isQuizDone && history.length > 0) {
      saveQuizResult(history, score, name);
    }
    setCurrentQuestion(1);
    setHistory([]);
  }, [isQuizDone]);

  const handleRestart = () => {
    setScore(0);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
      {isQuizDone ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Quiz Completed! 🎉</h1>
          <p className="text-lg mb-6">
            Your Score:{" "}
            <span className="text-emerald-400 font-semibold">
              {score}/{TOTAL_QUESTIONS} {addEmoji(TOTAL_QUESTIONS, score)}
            </span>
          </p>
          <Button
            className="bg-emerald-500 text-black-1 transition-all 
            hover:text-emerald-500 hover:bg-black-1"
            onClick={handleRestart}
          >
            Restart Quiz
          </Button>
        </>
      ) : (
        <Navigate to={"/"} />
      )}
    </div>
  );
};

export default Finish;

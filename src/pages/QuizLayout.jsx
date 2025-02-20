import { quiz } from "@/assets";
import GenerateMcq from "@/components/GenerateMcq";
import { QuizContext } from "@/context/QuizContext";
import { useContext } from "react";
import { NumQuiz } from ".";

const QuizLayout = () => {
  const { currentQuestion, quizData } = useContext(QuizContext);
  const data = quizData.find((ques) => ques.id === currentQuestion);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black-1 px-4">
      <img className="mb-6" src={quiz} height={100} width={100} />
      <div
        className="bg-black-2 w-full max-w-3xl rounded-2xl shadow-md 
          shadow-black-2 p-6"
      >
        {data.type === "mcq" ? <GenerateMcq /> : <NumQuiz />}
      </div>
    </div>
  );
};

export default QuizLayout;

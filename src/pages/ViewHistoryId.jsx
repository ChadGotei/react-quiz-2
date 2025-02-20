import { getQuizResultById } from "@/lib/indexedDB";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderCircle } from "lucide-react";
import { TOTAL_QUESTIONS } from "@/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QuizContext } from "@/context/QuizContext";

const ViewHistoryId = () => {
  const { quizData } = useContext(QuizContext);
  const [userHistory, setUserHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const data = await getQuizResultById(id);

      console.log(quizData);
      setUserHistory(data[0]);
      setLoading(false);
    };

    fetchHistory();
  }, [id]);

  if (loading) {
    return (
      <LoaderCircle
        className="animate-spin mx-auto my-30"
        height={100}
        width={100}
      />
    );
  }

  if (!userHistory) {
    return (
      <div className="text-center text-white">Provide a valid user ID</div>
    );
  }

  return (
    <div className="flex flex-col min-h-[80vh] text-white gap-4 sm:gap-6">
      {/* User details */}
      <div
        key={userHistory.id}
        className="flex flex-row gap-8 items-center md:ml-20 my-4 justify-center md:justify-normal"
      >
        <Avatar className="w-[60px] h-[60px] cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>

        <div className="text-2xl md:text-4xl sm:text-3xl text-emerald-100 font-semibold">
          {userHistory.name || `User ID: ${userHistory.id}`}
        </div>
      </div>

      {/* User score */}
      <div className="flex flex-row justify-between bg-black-2 w-[90%] h-[4rem] rounded-2xl mx-auto px-10 py-5 text-lg">
        <p className="text-gray-400">
          Max Score: <span className="text-emerald-400">{TOTAL_QUESTIONS}</span>
        </p>
        <p className="text-gray-400">
          Your Score:{" "}
          <span className="text-emerald-400">{userHistory.score}</span>
        </p>
        <p className="text-gray-400 hidden sm:block">
          Percentage:{" "}
          <span className="text-emerald-400">
            {((userHistory.score / TOTAL_QUESTIONS) * 100).toFixed(2)}%
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userHistory.history.map((ques, ind) => (
          <Card
            key={ques.id}
            className="bg-black-2 text-white shadow-lg rounded-xl
             transition-transform hover:scale-105 hover:shadow-emerald-400/40 cursor-pointer"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-emerald-300">
                Question {ind + 1}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {ques.question}
              </CardDescription>
            </CardHeader>

            <CardContent className="mt-1 space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-gray-400 font-medium">Status:</p>
                <span
                  className={`font-semibold ${
                    ques.isCorrect ? "text-emerald-400" : "text-red-500"
                  }`}
                >
                  {ques.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>

              <div className="flex flex-row mt-4 gap-2">
                <p className="text-gray-400 font-medium">Your Answer:</p>
                <p className="text-emerald-300 font-semibold">
                  {quizData[ind].type === "integer"
                    ? ques.selectedAnswer
                    : `${
                        quizData[ind].options[ques.selectedAnswer-1]
                          ? quizData[ind].options[ques.selectedAnswer-1]
                          : "Did not attempt"
                      }`}
                </p>
              </div>

              <div className="flex flex-row gap-2">
                <p className="text-gray-400 font-medium">Correct Answer: </p>
                <p className="text-emerald-400 font-semibold">
                  {quizData[ind].type === "integer"
                    ? quizData[ind].answer
                  : quizData[ind].options[quizData[ind].answer-1]}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewHistoryId;

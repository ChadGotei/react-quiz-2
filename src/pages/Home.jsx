import InstructionsButton from "@/components/InstructionsButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuizContext } from "@/context/QuizContext";
import { toastError } from "@/lib/toast";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const { username, setUsername } = useContext(QuizContext);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState("");
  const fullText = "Welcome to React Quiz";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (!username) {
      toastError("Please enter a username to proceed");
      return;
    }
    setUsername(username);
    navigate("/quiz");
    return;
  };

  return (
    <div className="flex flex-col justify-center items-center h-[60dvh] text-white">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-center space-y-4 bg-black-2 p-8 rounded-2xl shadow-sm shadow-emerald-300"
      >
        <h1 className="text-2xl font-bold sm:text-3xl">{displayText}</h1>
        <p className="text-gray-400">
          Test your knowledge, click on the button below to continue.
        </p>
        <div className="flex flex-row justify-center items-center gap-7 mt-8">
          
          
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              onClick={() => setShowButton(true)}
              className="cursor-pointer bg-black-1 hover:bg-white 
             hover:text-black-1 hover:shadow-black-1 hover:shadow-md"
              size="lg"
            >
              Start Quiz
            </Button>
          </motion.div>

          <InstructionsButton />
        </div>
      </motion.div>

      {showButton && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="w-full flex flex-row gap-6 mt-10 justify-center"
        >
          <Input
            placeholder="Enter username"
            value={username}
            className="w-[20rem] p-4"
            onChange={(e) => setUsername(e.target.value)}
          />

          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              className="bg-emerald-500 text-black-1 hover:text-emerald-500 
              hover:bg-black-2 hover:animate-in"
              onClick={handleClick}
            >
              Continue
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;

import { getQuizResults } from "@/lib/indexedDB";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TOTAL_QUESTIONS } from "@/constants";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getQuizResults();
      setHistoryData(data);
    };

    fetchHistory();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center py-10 text-white"
    >
      <h1 className="text-3xl font-bold mb-6">Quiz History</h1>
      {historyData.length ? (
        <div className="w-full max-w-2xl space-y-4">
          {historyData.map((entry) => (
            <div
              key={entry.id}
              className="bg-black-2 p-5 rounded-xl shadow-lg flex justify-between 
              items-center"
            >
              <div>
                <p className="text-lg font-semibold">
                  Username:{" "}
                  <span className="font-bold"> {entry.name || entry.id}</span>
                </p>
                <p className="text-gray-400">
                  Max Score: {TOTAL_QUESTIONS}
                  <span className="text-emerald-400">{entry.TOTAL}</span>
                </p>
                <p className="text-gray-400">
                  Your Score:{" "}
                  <span className="text-emerald-400">{entry.score}</span>
                </p>
              </div>
              <Link to={`/history/${entry.id}`}>
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  View Details
                </Button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No history found.</p>
      )}
    </motion.div>
  );
};

export default History;

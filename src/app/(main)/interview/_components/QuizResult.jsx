import { Trophy } from "lucide-react";

const QuizResult = ({ result, startNewQuiz }) => {
  if (!result) return null;
  return (
    <div className="mx-auto">
      <h1 className="flex items-center gap-2 text-3xl gradient-title">
        <Trophy className="h-6 w-6 text-yellow-500" />
        Quiz Results
      </h1>
    </div>
  );
};

export default QuizResult;

"use client";

import { generateQuiz, saveQuizResult } from "@/actions/interview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/useFetch";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import QuizResult from "./QuizResult";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]); // storing user answers
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  console.log("quizData from Quiz.jsx", quizData);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  console.log("Quiz resultData from quiz/jsx", resultData);

  /**
   * When quiz data is loaded, create an array of nulls (one for each question)
   * This helps track user-selected answers and ensures answer states are in sync with the quiz
   */
  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null)); // [null, null, null, null, null, null, null, null, null, null]
    }
  }, [quizData]);

  if (generatingQuiz)
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;

  if (!quizData) {
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={generateQuizFn} className="w-full">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];

  const handleAnswer = (answer) => {
    console.log("answer from handleAnswer", answer);
    const newAnswers = [...answers]; // Shallow copy of the answers array
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
    console.log("newAnswers from quiz", newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false); // hides explanation for next quiz
    } else {
      finishQuiz();
    }
  };

  const calcualteScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index]?.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const finishQuiz = async () => {
    const score = calcualteScore();

    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz Completed Successfully");
    } catch (error) {
      toast.error(error.message || "Failed to save Quiz Results");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    setResultData(null);
  };

  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} startNewQuiz={startNewQuiz} />
      </div>
    );
  }

  return (
    <Card className="mx-2">
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-lg font-medium">{question.question}</p>
        <RadioGroup
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
          className="space-y-2"
        >
          {question?.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>

        {showExplanation && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="font-medium">Explanation:</p>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]} // Disabled when no answer is selected
          >
            Show Explanation
          </Button>
        )}

        <Button
          onClick={handleNext}
          className="ml-auto"
          disabled={!answers[currentQuestion] || savingResult} // Disabled when no answer is selected
        >
          {savingResult && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {currentQuestion < quizData.length - 1 ? "Next" : "Finish"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Quiz;

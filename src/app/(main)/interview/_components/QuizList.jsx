"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QuizResult from "./QuizResult";

const QuizList = ({ assessments }) => {
  // console.log("quizLIST", assessments);

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const router = useRouter();

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="gradient-title text-3xl md:text-4xl">
                Recent Quizzes
              </CardTitle>
              <CardDescription>
                Review your past quiz performance
              </CardDescription>
            </div>
            <Button onClick={() => router.push("/interview/mock")}>
              Start New Quiz
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments.length ? (
              assessments.map((assessment, index) => {
                return (
                  <Card
                    key={assessment.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedQuiz(assessment)}
                  >
                    <CardHeader>
                      <CardTitle className="gradient-title text-2xl">
                        Quiz {index + 1}
                      </CardTitle>
                      <CardDescription className="flex justify-between w-full">
                        <div>Score: {assessment.quizScore.toFixed(1)}%</div>
                        <div>
                          {format(
                            new Date(assessment.createdAt),
                            "MMMM dd, yyyy HH:mm"
                          )}
                        </div>
                      </CardDescription>
                    </CardHeader>

                    {assessment.improvementTip && (
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {assessment.improvementTip}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                );
              })
            ) : (
              <p className="text-3xl font-bold text-muted-foreground text-center p-6">
                You haven't attempted any quiz yet. Start a new quiz to see your
                results here.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      {/* Dialog */}

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="overflow-y-auto max-w-5xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNewBtn
            startNewQuiz={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuizList;

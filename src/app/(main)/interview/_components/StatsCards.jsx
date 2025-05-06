import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, Trophy } from "lucide-react";

const StatsCards = ({ assessments }) => {
  const getAverageScore = () => {
    const totalScore = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (totalScore / assessments.length).toFixed(2);
  };

  const getLatestAssesment = () => {
    if (!assessments.length) return null;
    return assessments[assessments.length - 1];
  };
  const getTotalAssesments = () => {
    if (!assessments.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment?.questions?.length,
      0
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getAverageScore()} %</div>
          <p className="text-xs text-muted-foreground">
            Across all assessments
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Questions Practiced
          </CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getTotalAssesments()}</div>
          <p className="text-xs text-muted-foreground">Total questions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {getLatestAssesment()?.quizScore || 0}%
          </div>
          <p className="text-xs text-muted-foreground">Most recent quiz</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;

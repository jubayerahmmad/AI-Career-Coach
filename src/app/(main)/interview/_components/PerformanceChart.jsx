"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PerformanceChart = ({ assessments }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        score: assessment.quizScore,
        date: format(new Date(assessment.createdAt), "MMM dd"),
      }));
      setChartData(formattedData);
    }
  }, [assessments]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="gradient-title text-3xl md:text-4xl">
          Performance Trend
        </CardTitle>
        <CardDescription>Your quiz scores over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    // console.log("payload from tooltip recharts", payload);
                    return (
                      <div className="bg-background border rounded-lg shadow-xl p-2">
                        <p className="font-medium text-sm">
                          Score: {payload[0].value} %
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Date: {payload[0].payload.date}
                        </p>
                      </div>
                    );
                  }
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#fff"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;

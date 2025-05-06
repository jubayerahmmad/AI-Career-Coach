"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";

// export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); // A "use server" file can only export async functions, found object.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Generate Quiz
export const generateQuiz = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
    select: {
      industry: true,
      skills: true,
    },
  });
  if (!user) throw new Error("User Not Found");

  console.log("user from interview.js--> ", user); // user:{industry: terch-software-development, skills:[js,py]}

  const prompt = `
    Generate 4 technical interview questions for a ${
      user.industry
    } professional${
    user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
  }.
    Each question should be multiple choice with 4 options.
    Return the response in this JSON format only, NO ADDITIONAL TEXT:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const text = response.text.replace(/```(?:json)?\n?/g, "").trim();
    console.log("text from interview (JSON)", text);
    const quiz = JSON.parse(text);

    return quiz.questions;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz questions");
  }
};

export async function saveQuizResult(questions, answers, score) {
  // console.log("questions from saveQuizResult interview.js", questions);
  // console.log("answers from saveQuizResult interview.js", answers);
  // console.log("score from saveQuizResult interview.js", score);

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user?.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const questionResults = questions.map((q, idx) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[idx],
    isCorrect: q.correctAnswer === answers[idx],
    explanation: q.explanation,
  }));

  // Get wrong answers
  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

  // Only generate improvement tips if there are wrong answers
  let improvementTip = null;
  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n"); // e.g, Question: "What is JavaScript"\nCorrect Answer: "JavaScript is a Programming Language"\nUser Answer: "JavaScript is Canada's Language"

    const improvementPrompt = `
          The user got the following ${user.industry} technical interview questions wrong:
    
          ${wrongQuestionsText}
    
          Based on these mistakes, provide a concise, specific improvement tip.
          Focus on the knowledge gaps revealed by these wrong answers.
          Keep the response under 2-3 sentences and make it encouraging.
          Don't explicitly mention the mistakes, instead focus on what to learn/practice.
      `;

    try {
      const tipResult = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: improvementPrompt,
      });

      improvementTip = tipResult.text.trim();
      // console.log("improvementTip :", improvementTip);
    } catch (error) {
      console.error("Error generating improvement tip:", error);
      // Continue without improvement tip if generation fails
    }
  }

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });
    return assessment;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw new Error("Failed to save quiz result");
  }
}

export async function getAssessments() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user?.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const assessments = await db.assessment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return assessments;
  } catch (error) {
    console.error("Error fetching assessments:", error);
    throw new Error("Failed to fetch assessments");
  }
}

"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAIInsights } from "./dashboard";

export const updateUser = async (data) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) throw new Error("User Not Found");

  try {
    const result = await db.$transaction(
      async (tx) => {
        // find if industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        // If industry doesn't exist, create it with ai
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);

          industryInsight = await db.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }
        // update the user
        const updateUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            bio: data.bio,
            experience: data.experience,
            industry: data.industry,
            skills: data.skills,
          },
        });
        return { updateUser, industryInsight };
      },
      {
        timeout: 10000, //default 5000
      }
    );
    console.log(result);

    // return result.user;
    return { sucess: true, ...result };
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
};

// get user onboarding status
export const getUserOnboardingStatus = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { industry: true },
    });

    if (!user) {
      throw new Error("User Not Found");
    }

    return {
      isOnboarded: !!user.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
};

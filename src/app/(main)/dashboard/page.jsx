import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import DashboardView from "./_components/DashboardView";

// thats IndustryInsights Page
const Dashboard = async () => {
  // If not onboarded, redirect to onboarding page
  // Skip this check if already on the onboarding page
  const { isOnboarded } = await getUserOnboardingStatus();
  if (!isOnboarded) redirect("/onboarding");

  const insights = await getIndustryInsights();
  // console.log("insights from dashboard", insights);

  return (
    <div className="container mx-auto">
      <DashboardView insights={insights} />
    </div>
  );
};

export default Dashboard;

import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

// thats IndustryInsights Page
const Dashboard = async () => {
  // check if user is onboarded
  const { isOnboarded } = await getUserOnboardingStatus();
  if (!isOnboarded) redirect("/onboarding");

  return <div>Dashboard</div>;
};

export default Dashboard;

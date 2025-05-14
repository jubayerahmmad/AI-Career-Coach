import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Quiz from "../_components/Quiz";

const Mock = () => {
  return (
    <div className="container mx-auto space-y-4 py-6 px-3">
      <div className="flex flex-col space-y-2">
        <Link href="/interview">
          <Button variant="outline" className="pl-0">
            <ArrowLeft className="h-6 w-6" />
            Back to Interview Preparation
          </Button>
        </Link>

        <div>
          <h1 className="text-5xl md:text-6xl font-bold gradient-title">
            Mock Interview
          </h1>
          <p className="text-muted-foreground">
            Test your knowledge with industry-specific questions
          </p>
        </div>
      </div>

      <Quiz />
    </div>
  );
};

export default Mock;

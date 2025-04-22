import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const CallToAct = () => {
  return (
    <section className="w-full">
      <div className="mx-auto py-24 bg-gradient-to-b from-gray-400/50 via-gray-200/50 to-gray-600/80">
        <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter text-gray-50 sm:text-4xl md:text-5xl">
            Ready to Accelerate Your Career?
          </h2>
          <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl">
            Join thousands of professionals who are advancing their careers with
            AI-powered guidance.
          </p>
          <Link href="/dashboard" passHref>
            <Button
              size="lg"
              variant="secondary"
              className="h-11 mt-5 animate-bounce"
            >
              Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAct;

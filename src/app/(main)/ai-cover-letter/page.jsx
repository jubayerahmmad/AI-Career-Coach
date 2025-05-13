import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const CoverLetter = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl md:text-5xl font-bold gradient-title">
          My Cover Letters
        </h1>
        <Link href="/ai-cover-letter/new">
          <Button size="sm">
            <Plus />
            Create New
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CoverLetter;

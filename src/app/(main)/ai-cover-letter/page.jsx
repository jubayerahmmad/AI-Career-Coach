import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import CoverLetterList from "./_components/CoverLetterList";
import { getAllCoverLetter } from "@/actions/coverLetter";

const CoverLetter = async () => {
  const coverLetters = await getAllCoverLetter();
  return (
    <div className="container mx-auto px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-5xl font-bold gradient-title">
          My Cover Letters
        </h1>
        <Link href="/ai-cover-letter/new">
          <Button size="sm">
            <Plus />
            Create New
          </Button>
        </Link>
      </div>
      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
};

export default CoverLetter;

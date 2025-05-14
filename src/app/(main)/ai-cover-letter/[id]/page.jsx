import { getSingleCoverLetter } from "@/actions/coverLetter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CoverLetterPreview from "../_components/CoverLetterPreview";
import { ArrowLeft } from "lucide-react";

const EditCoverLetterMarkdown = async ({ params }) => {
  const { id } = await params;
  const coverLetter = await getSingleCoverLetter(id);

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-2">
        <Link href="/ai-cover-letter">
          <Button variant="outline" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        <h1 className="text-3xl md:text-6xl font-bold gradient-title mb-6">
          {coverLetter?.jobTitle} at {coverLetter?.companyName}
        </h1>
      </div>

      <CoverLetterPreview content={coverLetter?.content} />
    </div>
  );
};

export default EditCoverLetterMarkdown;

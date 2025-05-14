"use client";

import { deleteCoverLetter } from "@/actions/coverLetter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CoverLetterList = ({ coverLetters }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  return (
    <div className="my-6 space-y-4">
      {coverLetters && coverLetters.length > 0 ? (
        coverLetters.map((letter) => (
          <Card key={letter?.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl gradient-title">
                    {letter.jobTitle} at {letter.companyName}
                  </CardTitle>
                  <CardDescription>
                    Created {format(new Date(letter.createdAt), "PPP")}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <AlertDialog>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/ai-cover-letter/${letter?.id}`)
                      }
                    >
                      <Eye />
                    </Button>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete Cover Letter?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your cover letter for {letter.jobTitle} at{" "}
                          {letter.companyName}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(letter.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground text-sm line-clamp-3">
                {letter.jobDescription}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              No Cover Letters Yet
            </CardTitle>
            <CardDescription>
              Create your first cover letter to get started
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default CoverLetterList;

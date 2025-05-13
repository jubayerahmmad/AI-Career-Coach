"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CoverLetterForm = () => {
  return (
    <div className="my-4">
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Provide the Information about the position you're applying for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                placeholder="Enter company Name"
                type="text"
                id="company"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input placeholder="Enter Job Title" type="text" id="jobTitle" />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                placeholder="Paste Job Description here"
                type="text"
                id="jobDescription"
                className="h-32"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Generate Cover Letter</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CoverLetterForm;

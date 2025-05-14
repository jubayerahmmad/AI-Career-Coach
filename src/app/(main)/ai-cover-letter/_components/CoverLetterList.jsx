"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";

const CoverLetterList = ({ coverLetters }) => {
  return (
    <div className="my-6 space-y-4">
      {coverLetters?.map((letter) => (
        <Card key={letter?.id}>
          <CardHeader>
            <CardTitle className="text-xl gradient-title">
              {letter.jobTitle} at {letter.companyName}
            </CardTitle>
            <CardDescription>
              Created {format(new Date(letter.createdAt), "PPP")}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default CoverLetterList;

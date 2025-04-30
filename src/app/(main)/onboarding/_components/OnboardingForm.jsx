"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { onboardingSchema } from "@/lib/schema";
import useFetch from "@/hooks/useFetch";
import { updateUser } from "@/actions/user";

const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });
  const {
    loading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const watchIndustry = watch("industry");

  const handleOnSubmit = async (values) => {
    console.log("form value", values);
    try {
    } catch (error) {
      console.log("handleOnSubmit error", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt-10 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and
            recommendations.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(handleOnSubmit)}>
            {/* Industries */}
            <div className="space-y-2.5">
              <Label htmlFor="industry">Industry</Label>
              <Select
                onValueChange={(value) => {
                  console.log("select--->", value); // here value is the id of each industry object e.g, 'technology ,nonprofit'

                  // Update the 'industry' field in the form
                  setValue("industry", value);

                  // Find the full industry object from the 'industries' array by matching the id,
                  // and update the local state 'selectedIndustry' for further usage (e.g., displaying details or loading sub-industries)
                  setSelectedIndustry(
                    industries.find((industry) => industry.id === value)
                  );

                  // Clear the 'subIndustry' field in the form
                  // This ensures that the previously selected sub-industry (if any) doesn't remain
                  // when a new main industry is chosen
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger id="industry" className="w-full">
                  <SelectValue placeholder="Select a Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Industries</SelectLabel>
                    {industries.map((industry) => (
                      <SelectItem key={industry.id} value={industry.id}>
                        {industry.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-500">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {/* Sub Industries */}
            {watchIndustry && (
              <div className="space-y-2.5">
                <Label htmlFor="subIndustry">Specialization</Label>
                <Select
                  onValueChange={(value) => {
                    setValue("subIndustry", value);
                  }}
                >
                  <SelectTrigger id="subIndustry" className="w-full">
                    <SelectValue placeholder="Select a Sub-Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Industries</SelectLabel>
                      {selectedIndustry?.subIndustries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-sm text-red-500">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            {/* Experience */}
            <div className="space-y-2.5">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                placeholder="Enter Experience"
                min="0"
                max="50"
                {...register("experience")}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-2.5">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                type="text"
                placeholder="e.g, JavaScript, Python, Tech Lead"
                {...register("skills")}
              />
              <p className="text-sm text-muted-foreground">
                Separate multiple skills with commas
              </p>
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            {/* Bio */}
            <div className="space-y-2.5">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us About Professional Experience"
                {...register("bio")}
              />

              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Complete Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;

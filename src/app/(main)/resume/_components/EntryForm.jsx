"use client";
import { improveWithAi } from "@/actions/resume";
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
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/useFetch";
import { entrySchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Loader2, PlusCircle, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const formatDateDisplay = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

const EntryForm = ({ type, onChange, entries }) => {
  const [isAdding, setIsAdding] = useState(false);
  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      description: "",
      endDate: "",
      current: false,
    },
  });

  const current = watch("current");

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAi);

  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);
  };

  const handleAdd = handleValidation((data) => {
    const formattedEntry = {
      ...data,
      startDate: formatDateDisplay(data.startDate),
      endDate: data.current ? "" : formatDateDisplay(data.endDate),
    };

    onChange([...entries, formattedEntry]);
    reset();
    setIsAdding(false);
  });

  const handleImproveDesc = async () => {
    const description = watch("description");
    if (!description) {
      toast.error("Add a Description First");
    }
    console.log("watching description from improveDesc-->", description);
    await improveWithAIFn({
      current: description,
      type: type.toLowerCase(), // 'experience', "education" , "project"
    });
  };

  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("description", improvedContent);
      toast.success("Successfully Improved Description with AI");
    }
    if (improveError) {
      toast.error("Failed to Improve Description");
    }
  }, [improvedContent, setValue, improveError, isImproving]);

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {entries?.map((entry, index) => (
          <Card key={index}>
            <CardHeader className="flex items-center justify-between py-1.5">
              <div className="space-y-1">
                <CardTitle className="text-lg font-medium">
                  {entry.title}{" "}
                  {entry?.organization
                    ? `at  ${entry?.organization}`
                    : "(Personal Project)"}
                </CardTitle>
                <CardDescription>
                  <p className="text-sm text-muted-foreground">
                    {entry.current
                      ? `${entry.startDate} - Present`
                      : `${entry.startDate} - ${entry.endDate}`}
                  </p>
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => handleDelete(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="">
              <p className="text-base whitespace-pre-wrap">
                {entry.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Add {type}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {/* title and name of org */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  placeholder="Title/Position"
                  {...register("title")}
                  error={errors.title}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Organization/Company"
                  {...register("organization")}
                  error={errors.organization}
                />
                {errors.organization && (
                  <p className="text-sm text-red-500">
                    {errors.organization.message}
                  </p>
                )}
              </div>
            </div>

            {/* Dates */}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  type="month"
                  {...register("startDate")}
                  error={errors.startDate}
                />
                {errors.startDate && (
                  <p className="text-sm text-red-500">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  type="month"
                  {...register("endDate")}
                  disabled={current}
                  error={errors.endDate}
                />
                {errors.endDate && (
                  <p className="text-sm text-red-500">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="current"
                {...register("current")}
                onChange={(e) => {
                  setValue("current", e.target.checked);
                  if (e.target.checked) {
                    setValue("endDate", "");
                  }
                }}
              />
              <label htmlFor="current">Current {type}</label>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Textarea
                placeholder={`Description of your ${type.toLowerCase()}`}
                className="h-32"
                {...register("description")}
                error={errors.description}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Improve w/ Ai button */}
            <Button
              variant="ghost"
              type="button"
              size="sm"
              onClick={handleImproveDesc}
              disabled={isImproving || !watch("description")}
            >
              {isImproving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Improving...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Improve With AI
                </>
              )}
            </Button>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setIsAdding(false);
              }}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleAdd}>
              Add Entry
            </Button>
          </CardFooter>
        </Card>
      )}

      {!isAdding && (
        <Button
          className="w-full"
          variant="outline"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add {type}
        </Button>
      )}
    </div>
  );
};

export default EntryForm;

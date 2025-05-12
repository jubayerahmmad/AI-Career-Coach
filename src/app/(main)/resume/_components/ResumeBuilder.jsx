"use client";

import { saveResume } from "@/actions/resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/useFetch";
import { resumeSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import EntryForm from "./EntryForm";
import { entriesToMarkdown, getContactMarkdown } from "@/lib/toMarkdown";
import MDEditor from "@uiw/react-md-editor";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const ResumeBuilder = ({ initialContent }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeMode, setResumeMode] = useState("preview");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const [activeTab, setActiveTab] = useState("edit");
  const { user } = useUser();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      skills: "",
      summary: "",
      education: [],
      projects: [],
      experience: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  // Watch form fields for preview updates
  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  const getCombinedContent = () => {
    const { summary, skills, education, projects, experience, contactInfo } =
      formValues;

    return [
      getContactMarkdown(contactInfo, user),
      summary && `# Professional Summary\n\n${summary}`,
      skills && `# Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(projects, "Projects"),
      entriesToMarkdown(education, "Education"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const genaratePDF = async () => {
    setIsGenerating(true);
    try {
      const html2pdf = (await import("html2pdf.js/dist/html2pdf.min.js"))
        .default;
      const element = document.getElementById("resume-pdf");
      const options = {
        margin: [15, 15],
        fileName: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      await html2pdf().set(options).from(element).save();
    } catch (error) {
      console.error(error);
      toast.error("Failed Downloading PDF!");
    } finally {
      setIsGenerating(false);
    }
  };

  // save resume
  useEffect(() => {
    if (!isSaving && saveResult) toast.success("Resume Saved Successfully");

    if (saveError) toast.error(saveError?.message || "Resume Saving Failed!");
  }, [isSaving, saveError, saveResult]);

  const handleSaveResume = async () => {
    try {
      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Saving Resume Error", error);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <h1 className="font-bold gradient-title text-5xl md:text-6xl">
          Resume Builder
        </h1>
        <div className="space-x-2">
          <Button variant="destructive" onClick={handleSaveResume}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save
              </>
            )}
          </Button>
          <Button onClick={genaratePDF}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="edit">Form</TabsTrigger>
          <TabsTrigger value="preview">Markdown</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <form className="space-y-6">
            {/* Contact Info */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
                {/* --Email-- */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Email</Label>
                  <Input
                    {...register("contactInfo.email")}
                    placeholder="example@gmail.com"
                    type="email"
                    error={errors.contactInfo?.email}
                  />
                  {errors.contactInfo?.email && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.email.message}
                    </p>
                  )}
                </div>
                {/* --Mobile-- */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Mobile</Label>
                  <Input
                    {...register("contactInfo.mobile")}
                    type="tel"
                    placeholder="+1 234 567 8900"
                    error={errors.contactInfo?.linkedin}
                  />
                  {errors.contactInfo?.mobile && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.mobile.message}
                    </p>
                  )}
                </div>
                {/* --LinkedIn-- */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">LinkedIn</Label>
                  <Input
                    {...register("contactInfo.linkedin")}
                    type="url"
                    placeholder="https://linkedin.com/in/your-profile"
                    error={errors.contactInfo?.linkedin}
                  />
                  {errors.contactInfo?.linkedin && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.linkedin.message}
                    </p>
                  )}
                </div>
                {/* --Twitter/X-- */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    X/Twitter Profile
                  </Label>
                  <Input
                    {...register("contactInfo.twitter")}
                    placeholder="https://x.com/your-handle"
                    type="url"
                    error={errors.contactInfo?.twitter}
                  />
                  {errors.contactInfo?.twitter && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.twitter.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Professional Summary</h3>
              <Controller
                name="summary"
                control={control}
                render={({ field }) => {
                  // console.log("FIELD from summary controller", field);
                  return (
                    <Textarea
                      {...field}
                      className="h-32"
                      placeholder="Write an attractive summary"
                      error={errors.summary}
                    />
                  );
                }}
              />
              {errors.summary && (
                <p className="text-sm text-red-500">{errors.summary.message}</p>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Skills</h3>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="h-32"
                    placeholder="List your Skills:  e.g, JavaScript, Python, React.js"
                    error={errors.skills}
                  />
                )}
              />
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Experience</h3>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => {
                  // console.log("FIELD from experience controller", field);
                  return (
                    <EntryForm
                      type="Experience"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Projects */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Projects</h3>
              <Controller
                name="projects"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Project"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.projects && (
                <p className="text-sm text-red-500">
                  {errors.projects.message}
                </p>
              )}
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Education</h3>
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Education"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.education && (
                <p className="text-sm text-red-500">
                  {errors.education.message}
                </p>
              )}
            </div>
          </form>
        </TabsContent>
        <TabsContent value="preview">
          <Button
            type="button"
            variant="link"
            size="sm"
            className="mb-2"
            onClick={() =>
              setResumeMode(resumeMode === "preview" ? "edit" : "preview")
            }
          >
            {resumeMode === "preview" ? (
              <>
                <Edit />
                Edit Resume
              </>
            ) : (
              <>
                <Monitor />
                Show Preview
              </>
            )}
          </Button>
          {resumeMode !== "preview" && (
            <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm">
                You will lose editied markdown if you update the form data.
              </span>
            </div>
          )}

          <div className="border rounded-lg">
            {/* MarkDown Editor */}
            <MDEditor
              value={previewContent}
              onChange={setPreviewContent}
              height={800}
              preview={resumeMode}
            />
          </div>
          {/*  pdf */}
          <div className="hidden">
            <div id="resume-pdf">
              <MDEditor.Markdown
                source={previewContent}
                style={{
                  background: "white",
                  color: "black",
                }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeBuilder;

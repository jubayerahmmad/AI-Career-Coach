"use client";

import CoverLetterForm from "../_components/CoverLetterForm";

const CreateNewPage = () => {
  return (
    <div className="px-6">
      <h1 className="text-3xl md:text-5xl font-bold gradient-title">
        Create Cover Letters
      </h1>
      <p className="text-muted-foreground px-0.5">
        Generate a tailored Cover Letter for your Job Application
      </p>

      <CoverLetterForm />
    </div>
  );
};

export default CreateNewPage;

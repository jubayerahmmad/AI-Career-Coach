import { z } from "zod";

export const onboardingSchema = z.object({
  industry: z.string({
    required_error: "Please select an industry",
  }),
  subIndustry: z.string({
    required_error: "Please select a specialization",
  }),
  bio: z.string().max(500).optional(),
  experience: z
    .string() // 1. Expects the initial input to be a string
    .transform((val) => parseInt(val, 10)) // 2. Tries to convert the string to an integer
    .pipe(
      // 3. Passes the result (a number or NaN) to another schema
      z
        .number() // 4. Checks if the transformed value is a valid number
        .min(0, "Experience must be at least 0 years") // 5. Checks the minimum value
        .max(50, "Experience cannot exceed 50 years") // 6. Checks the maximum value
    ),
  skills: z
    .string() // 1. Expects a string initially e.g, "JavaScript, React, Node.js"
    .transform(
      (
        val // 2. Applies a transformation function to the string
      ) =>
        val // 3. Check if the string is truthy (not empty)
          ? val // 4. If not empty...
              .split(",") // 4a. Split the string by commas e.g, ['JavaScript', ' React', '  Node.js', '',]
              .map((skill) => skill.trim()) // 4b. Trim whitespace from each item e.g, ['JavaScript', 'React', 'Node.js', '']
              .filter(Boolean) // 4c. Remove any empty items e.g, ['JavaScript', 'React', 'Node.js']
          : undefined // 5. If the string was empty, return undefined
    ),
});

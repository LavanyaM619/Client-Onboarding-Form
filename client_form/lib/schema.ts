import { z } from "zod";

export const SERVICES = ["UI/UX", "Branding", "Web Dev", "Mobile App"] as const;

export const onboardSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name must be at most 80 characters")
    .regex(/^[a-zA-Z\s’'-]+$/, "Full name can only contain letters, spaces, ’ and -"),
  email: z.string().email("Invalid email address"),
  companyName: z.string().min(2, "Company name must be at least 2 characters").max(100, "Company name must be at most 100 characters"),
  services: z.array(z.enum(SERVICES)).min(1, "Select at least one service"),
  budgetUsd: z
    .number()
    .int("Budget must be an integer")
    .min(100, "Budget must be at least 100")
    .max(1000000, "Budget must be at most 1,000,000")
    .optional()
    .nullable(),
  projectStartDate: z.string().refine(
    (date) => {
      if (!date) return false;
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    },
    { message: "Project start date must be today or later" }
  ),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms",
  }),
});

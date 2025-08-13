import { onboardSchema } from "./schema";

describe("onboardSchema validation", () => {
  const validData = {
    fullName: "Ada Lovelace",
    email: "ada@example.com",
    companyName: "Analytical Engines Ltd",
    services: ["UI/UX", "Web Dev"],
    budgetUsd: 50000,
    projectStartDate: "2099-09-01", 
    acceptTerms: true,
  };

  test("valid input passes schema", () => {
    expect(() => onboardSchema.parse(validData)).not.toThrow();
  });

  test("rejects invalid email", () => {
    const invalid = { ...validData, email: "bademail" };
    expect(() => onboardSchema.parse(invalid)).toThrow();
  });

  test("rejects fullName with invalid characters", () => {
    const invalid = { ...validData, fullName: "John123" };
    expect(() => onboardSchema.parse(invalid)).toThrow();
  });

  test("rejects empty services array", () => {
    const invalid = { ...validData, services: [] };
    expect(() => onboardSchema.parse(invalid)).toThrow();
  });

  test("accepts budgetUsd as optional", () => {
    const { budgetUsd, ...withoutBudget } = validData;
    expect(() => onboardSchema.parse(withoutBudget)).not.toThrow();
  });

  test("rejects projectStartDate in past", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const pastDate = yesterday.toISOString().split("T")[0];
    const invalid = { ...validData, projectStartDate: pastDate };
    expect(() => onboardSchema.parse(invalid)).toThrow();
  });

  test("rejects acceptTerms false", () => {
    const invalid = { ...validData, acceptTerms: false };
    expect(() => onboardSchema.parse(invalid)).toThrow();
  });
});

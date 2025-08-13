"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardSchema, SERVICES } from "../lib/schema";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { useState, useEffect } from "react";
import axios from "axios";

type OnboardFormData = z.infer<typeof onboardSchema>;

export default function OnboardForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.getAll("service");
  const filteredServices = serviceParam.filter((s) =>
    SERVICES.includes(s as typeof SERVICES[number])
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OnboardFormData>({
    resolver: zodResolver(onboardSchema),
    mode: "onBlur",
    defaultValues: {
      services:
        filteredServices.length > 0
          ? (filteredServices as typeof SERVICES[number][])
          : [],
    },
  });

  useEffect(() => {
    if (filteredServices.length > 0) {
      reset({ services: filteredServices as typeof SERVICES[number][] });
    }
  }, [searchParams, reset, filteredServices]);

  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const onSubmit = async (data: OnboardFormData) => {
    setSubmitStatus(null);
    setSubmitMessage(null);
    try {
      const body = {
        fullName: data.fullName,
        email: data.email,
        companyName: data.companyName,
        services: data.services,
        budgetUsd: data.budgetUsd ?? undefined,
        projectStartDate: data.projectStartDate,
        acceptTerms: data.acceptTerms,
      };

      const res = await axios.post(process.env.NEXT_PUBLIC_ONBOARD_URL!, body, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status >= 200 && res.status < 300) {
        setSubmitStatus("success");
        setSubmitMessage(`Successfully submitted:\n${JSON.stringify(body, null, 2)}`);
        reset();
      } else {
        setSubmitStatus("error");
        setSubmitMessage("Failed to submit form.");
      }
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("Network or server error.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="max-w-lg mx-auto p-6 space-y-6 rounded shadow-md font-sans"
    >
      <div>
        <label htmlFor="fullName" className="block font-semibold mb-1">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          {...register("fullName")}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
            errors.fullName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="Ada Lovelace"
        />
        {errors.fullName && (
          <p className="text-red-600 mt-1 text-sm">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block font-semibold mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
            errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="ada@example.com"
        />
        {errors.email && (
          <p className="text-red-600 mt-1 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="companyName" className="block font-semibold mb-1">
          Company Name
        </label>
        <input
          id="companyName"
          type="text"
          {...register("companyName")}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
            errors.companyName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="Analytical Engines Ltd"
        />
        {errors.companyName && (
          <p className="text-red-600 mt-1 text-sm">{errors.companyName.message}</p>
        )}
      </div>

      <fieldset className="space-y-2">
        <legend className="font-semibold">Services Interested In</legend>
        <div className="flex flex-wrap gap-4">
          {SERVICES.map((service) => (
            <label key={service} className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                value={service}
                {...register("services")}
                className="w-5 h-5 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span>{service}</span>
            </label>
          ))}
        </div>
        {errors.services && (
          <p className="text-red-600 text-sm">{errors.services.message}</p>
        )}
      </fieldset>

      <div>
        <label htmlFor="budgetUsd" className="block font-semibold mb-1">
          Budget (USD) (optional)
        </label>
        <input
          id="budgetUsd"
          type="number"
          {...register("budgetUsd", { valueAsNumber: true })}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
            errors.budgetUsd ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="50000"
          min={100}
          max={1000000}
          step={1}
          inputMode="numeric"
          pattern="[0-9]*"
        />
        {errors.budgetUsd && (
          <p className="text-red-600 mt-1 text-sm">{errors.budgetUsd.message}</p>
        )}
      </div>

      <div>
  <label htmlFor="projectStartDate" className="block font-semibold mb-1">
    Project Start Date
  </label>
  <input
    id="projectStartDate"
    type="date"
    {...register("projectStartDate")}
    className={`w-full border rounded px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 ${
      errors.projectStartDate
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-blue-500"
    }`}
    min={minDate}
  />
  {errors.projectStartDate && (
    <p className="text-red-600 mt-1 text-sm">{errors.projectStartDate.message}</p>
  )}
</div>


      <div className="flex items-center gap-2">
        <input
          id="acceptTerms"
          type="checkbox"
          {...register("acceptTerms")}
          className={`w-5 h-5 border-gray-300 rounded focus:ring-2 ${
            errors.acceptTerms ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
          }`}
        />
        <label htmlFor="acceptTerms" className="select-none">
          I accept the terms and conditions
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="text-red-600 mt-1 text-sm">{errors.acceptTerms.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 transition"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      {submitStatus === "success" && (
        <pre className="mt-4 text-green-600 whitespace-pre-wrap">{submitMessage}</pre>
      )}
      {submitStatus === "error" && (
        <p className="mt-4 text-red-600">{submitMessage}</p>
      )}
    </form>
  );
}

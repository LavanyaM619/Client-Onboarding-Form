import OnboardForm from "@/components/OnboardForm";

export default function HomePage() {
  return (
    <main className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Client Onboarding</h1>
      <OnboardForm />
    </main>
  );
}

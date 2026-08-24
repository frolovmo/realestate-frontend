import AuthPageShell from "../../components/auth/AuthPageShell";
import SignUpForm from "@/components/signup/signupForm";

export default function SignupPage() {
  return (
    <AuthPageShell
      eyebrow="Get started"
      title="Create your account"
      description="Join the platform to explore verified homes and submit your application."
    >
      <SignUpForm />
    </AuthPageShell>
  );
}

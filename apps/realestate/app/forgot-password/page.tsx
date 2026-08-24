import AuthPageShell from "../../components/auth/AuthPageShell";
import FindAccountForm from "@/components/reset-password/findAccountForm";

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell
      eyebrow="Account recovery"
      title="Reset your password"
      description="Enter your account details and we will help you regain secure access."
    >
      <FindAccountForm />
    </AuthPageShell>
  );
}

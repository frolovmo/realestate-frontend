import AuthPageShell from "../../components/auth/AuthPageShell";
import LoginForm from "../../components/login/loginForm";

export default function LoginPage() {
  return (
    <AuthPageShell
      eyebrow="Welcome"
      title="Sign in"
      description="Use your email and password, or continue with your preferred account."
    >
      <LoginForm />
    </AuthPageShell>
  );
}

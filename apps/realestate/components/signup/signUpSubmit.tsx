import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export default function SignupSubmit() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="default"
      className="w-full"
      disabled={pending}
    >
      Sign Up
    </Button>
  );
}

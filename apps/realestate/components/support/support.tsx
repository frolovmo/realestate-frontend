import { QuestionIcon } from "../icons";
import { Button } from "../ui/button";

export default function Support() {
  return (
    <div className="rounded-2xl border border-primary/25 bg-white/5 p-4">
      <div className="mb-4 inline-block rounded-xl bg-primary p-2 text-secondary">
        <QuestionIcon />
      </div>
      <div className="mb-4">
        <p className="font-bold text-sm text-white">Need help?</p>
        <p className="text-xs leading-5 text-white/65">
          Please raise a ticket right from here!
        </p>
      </div>
      <Button variant="active" className="w-full border-none text-sm">
        Raise a Ticket
      </Button>
    </div>
  );
}

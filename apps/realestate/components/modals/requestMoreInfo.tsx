import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

interface RequestMoreInfoProps {
  onCancel: () => void;
  onRequestSend: (message: string) => void;
}

export default function RequestMoreInfo({
  onCancel,
  onRequestSend,
}: RequestMoreInfoProps) {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  return (
    <div className="shadow-xl font-poppins text-black rounded-md">
      <div className="px-6 py-4 bg-primary  text-white font-semibold text-xl rounded-t-md">
        Request More Information
      </div>

      <div className="py-9 px-6 text-sm">
        <div className="mb-8">
          <p className="mb-1">
            What additional information do you need to approve this listing?
          </p>
          <Textarea
            placeholder="Enter your input here"
            value={value}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center gap-[87px]">
          <Button
            variant="secondary"
            size="lg"
            className="text-xs w-[150px]"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            size="lg"
            className="text-xs w-[150px]"
            onClick={() => {
              onRequestSend(value);
              onCancel();
            }}
          >
            Send Request
          </Button>
        </div>
      </div>
    </div>
  );
}

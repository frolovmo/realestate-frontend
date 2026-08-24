import { BaseComponentProps } from "@/lib/types";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

interface ApprovalProcessConfirmModalProps extends BaseComponentProps {
  title: string;
  description: string;
  loading?: boolean;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm: (message: string) => void;
}

export default function ApprovalProcessConfirmModal({
  title,
  description,
  loading,
  onClose,
  onCancel,
  onConfirm,
}: ApprovalProcessConfirmModalProps) {
  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleConfirm = async () => {
    onConfirm(value);
    onClose();
  };

  return (
    <div className="shadow-xl font-poppins text-black rounded-md">
      <div className="px-6 py-4 bg-primary  text-white font-semibold text-xl rounded-t-md">
        {title}
      </div>

      <div className="py-9 px-6 text-sm">
        <div className="mb-8">
          <p className="mb-1">{description}</p>
          <Textarea
            placeholder="Enter your input here"
            value={value}
            onChange={onChange}
          />
        </div>

        <div className="flex justify-center gap-[87px]">
          <Button
            variant="secondary"
            size="lg"
            disabled={loading}
            className="text-xs w-[150px]"
            onClick={onCancel || onClose}
          >
            Cancel
          </Button>

          <Button
            variant="default"
            size="lg"
            disabled={loading}
            className="text-xs w-[150px]"
            onClick={handleConfirm}
          >
            Send Request
          </Button>
        </div>
      </div>
    </div>
  );
}

import { BaseComponentProps } from "@/lib/types";
import { Button } from "../ui/button";

interface ConfirmBaseModalProps extends BaseComponentProps {
  title: string;
  description: string;
  loading?: boolean;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
}

export default function ConfirmBaseModal({
  title,
  description,
  loading,
  onClose,
  onCancel,
  onConfirm,
}: ConfirmBaseModalProps) {
  return (
    <div className="shadow-xl font-poppins text-black rounded-md">
      <div className="px-6 py-4 bg-primary text-white font-semibold text-xl rounded-t-md">
        {title}
      </div>

      {description && <div className="px-6 py-4">{description}</div>}

      <div className="py-9 px-6 text-sm">
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
            loading={loading}
            className="text-xs w-[150px]"
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

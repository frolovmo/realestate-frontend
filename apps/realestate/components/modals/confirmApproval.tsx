import { Button } from "../ui/button";

interface ConfirmApprovalProps {
  isPending: boolean;
  sendApproval: () => void;
  onCancel: () => void;
}

export default function ConfirmApproval({
  isPending,
  sendApproval,
  onCancel,
}: ConfirmApprovalProps) {
  return (
    <div className="shadow-xl rounded-md">
      <div className="px-6 py-4 bg-primary font-poppins text-white font-semibold text-xl rounded-t-md">
        Confirm Approval
      </div>

      <div className="py-9 px-6 font-poppins text-sm text-black">
        <div className="mb-11">
          <p>Are you sure you want to approve this unit?</p>
          <p>Once approved, you won’t be able to revert it back.</p>
        </div>

        <div className="flex justify-center gap-[87px]">
          <Button
            variant="secondary"
            size="lg"
            className="text-xs w-[150px]"
            onClick={onCancel}
          >
            {isPending ? "Processing..." : "No, Cancel"}
          </Button>
          <Button
            variant="default"
            size="lg"
            className="text-xs w-[150px]"
            onClick={sendApproval}
          >
            {isPending ? "Processing..." : "Yes, Approve"}
          </Button>
        </div>
      </div>
    </div>
  );
}

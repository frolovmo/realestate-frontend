import { PointerIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface TableTitleBarProps {
  title: string;
  status: string;
}

export default function TableTitleBar({ title, status }: TableTitleBarProps) {
  const isPending = status === "pending";
  const isApproved = status === "approved";
  const isRejected = status === "rejected";
  return (
    <div
      className={cn(
        "flex justify-between items-center p-[10px] border rounded-md border-l-4",
        isPending
          ? "bg-primaryneutral text-googlelink border-l-googlelink"
          : "",
        isApproved
          ? "bg-successneutral text-status1-foreground border-l-status1-foreground"
          : "",
        isRejected ? "bg-rejectedneutral text-rejected border-l-rejected" : ""
      )}
    >
      <p className="font-poppins font-medium text-lg italic">{title}</p>
      <PointerIcon
        className={cn(
          "cursor-pointer",
          isPending ? "text-googlelink" : "",
          isApproved ? "text-status1-foreground" : "",
          isRejected ? "text-rejected" : ""
        )}
      />
    </div>
  );
}

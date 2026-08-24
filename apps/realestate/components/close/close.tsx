import { CloseIcon } from "@/components/icons";

interface CloseProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Close({ onClick }: CloseProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-4 h-4 bg-primary cursor-pointer rounded-full"
    >
      <CloseIcon width={9} height={9} />
    </button>
  );
}

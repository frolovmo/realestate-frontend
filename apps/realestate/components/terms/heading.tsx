import { cn } from "@/lib/utils";

export default function Heading({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("font-semibold text-xl", className)} {...props}>
      {children}
    </h2>
  );
}

interface HeadingBarProps {
  heading: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export default function HeadingBar({
  heading,
  actions,
  children,
}: HeadingBarProps) {
  return (
    <div className="flex items-center justify-between rounded-t-2xl border border-b-0 bg-white px-5 py-4">
      <div className="flex w-full items-center justify-between gap-4 border-l-4 border-primary pl-3 font-poppins text-lg font-semibold text-secondary">
        {heading}
        {actions}
      </div>
      {children}
    </div>
  );
}

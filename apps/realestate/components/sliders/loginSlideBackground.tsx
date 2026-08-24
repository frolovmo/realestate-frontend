interface LoginSlideBackgroundProps {
  children: React.ReactNode;
}

export default function LoginSlideBackground({
  children,
}: LoginSlideBackgroundProps) {
  return (
    <div className="brand-glow brand-grid h-full w-full">
      {children}
    </div>
  );
}

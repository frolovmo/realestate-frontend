import { cn } from "../../lib/utils";

type IzeTechLogoProps = {
  className?: string;
  markOnly?: boolean;
  inverse?: boolean;
  productLabel?: string;
};

export default function IzeTechLogo({
  className,
  markOnly = false,
  inverse = false,
  productLabel,
}: IzeTechLogoProps) {
  const contrast = inverse ? "text-white" : "text-secondary";

  return (
    <span
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label={productLabel ? `IZE Tech ${productLabel}` : "IZE Tech"}
    >
      <svg
        viewBox="0 0 56 56"
        role="img"
        aria-hidden="true"
        className="h-[1em] w-[1em] shrink-0 overflow-visible"
      >
        <path
          d="M10.5 20.2A20.4 20.4 0 0 1 40 10.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="6.5"
          strokeLinecap="square"
          className="text-primary"
        />
        <path
          d="M42.8 17.3A20.3 20.3 0 0 1 46 34.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="6.5"
          strokeLinecap="square"
          className="text-primary"
        />
        <path
          d="M42.9 39.2A20.4 20.4 0 0 1 9.8 29.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="6.5"
          strokeLinecap="square"
          className={contrast}
        />
        <path
          d="m13 27.5 10.6 10.7L48.5 7.5 26 27.1Z"
          fill="currentColor"
          className="text-primary"
        />
      </svg>

      {!markOnly && (
        <span className="flex items-center leading-none">
          <span className="font-black tracking-[-0.08em] text-primary">IZE</span>
          <span className={cn("font-black tracking-[-0.08em]", contrast)}>
            TECH
          </span>
          {productLabel && (
            <span
              className={cn(
                "ml-3 border-l pl-3 text-[0.34em] font-semibold uppercase tracking-[0.16em]",
                inverse
                  ? "border-white/30 text-white/75"
                  : "border-secondary/20 text-secondary/65"
              )}
            >
              {productLabel}
            </span>
          )}
        </span>
      )}
    </span>
  );
}

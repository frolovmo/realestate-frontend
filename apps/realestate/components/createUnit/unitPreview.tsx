import { BaseComponentProps } from "@/lib/types";

interface UnitPreviewProps extends BaseComponentProps {
  children: React.ReactNode;
  noTitle?: boolean;
}

export default function UnitPreview({ children, noTitle, className = '', ...props }: UnitPreviewProps) {
  return (
    <div className={`flex-2 h-fit bg-white mt-9 pt-5 pb-12 px-7 rounded-sm ${className}`} {...props}>
      <div className="flex flex-col justify-center items-center">
        {!noTitle && (
          <p className="text-xl	text-black font-semibold mb-7">
            This is how the client will see it
            <span className="text-lightdark"> (Preview)</span>
          </p>
        )}

        {children}
      </div>
    </div>
  );
}

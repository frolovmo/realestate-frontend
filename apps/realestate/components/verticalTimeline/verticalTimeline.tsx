import { cn } from "../../lib/utils";

export enum VerticalTimelineStatus {
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
  INIT = "init",
}

const StatusColors: Record<VerticalTimelineStatus, string> = {
  [VerticalTimelineStatus.SUCCESS]: "bg-success",
  [VerticalTimelineStatus.ERROR]: "bg-rejected",
  [VerticalTimelineStatus.INIT]: "bg-white border border-grayborder",
  [VerticalTimelineStatus.PENDING]: "bg-googlelink",
};

interface VerticalTimelineItem {
  title: string;
  description: string;
  status: VerticalTimelineStatus;
}

interface VerticalTimelineProps {
  items: VerticalTimelineItem[];
}

export default function VerticalTimeline({
  items = [],
}: VerticalTimelineProps) {
  return (
    <div className="flex flex-col items-start sm:pl-4 pl-2">
      {items.map((item, index) => (
        <StatusLine
          item={item}
          key={item.title}
          firstLine={index === items.length - 1}
        />
      ))}
    </div>
  );
}

interface StatusLineProps {
  item: VerticalTimelineItem;
  firstLine?: boolean;
}

function StatusLine({ item, firstLine = false }: StatusLineProps) {
  const color = StatusColors[item.status];

  if (!color) {
    return null; // Prevents errors if `status` is invalid
  }

  return (
    <div className="relative">
      {/* Line */}
      {!firstLine && (
        <div className="absolute left-[6.7px] top-2 w-[1.65px] h-full bg-grayborder"></div>
      )}

      {/* Dot */}
      <div
        className={cn("absolute left-0 top-2 w-4 h-4 rounded-full", color)}
      ></div>

      {/* Content */}
      <div className="pl-6 pb-8">
        <p className="text-xs">{item.title}</p>
        <p className="text-[10px] text-graytext">{item.description}</p>
      </div>
    </div>
  );
}

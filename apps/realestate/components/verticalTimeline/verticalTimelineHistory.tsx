import { cn } from "../../lib/utils";
import { unitStatus } from "../../lib/constants";
import { UnitResponseData } from "../../lib/types/index";
import { useMemo } from "react";
import { QuestionIcon } from "../icons";
import Tooltip from "../ui/tooltip";

type StatusHistory = UnitResponseData["statusHistory"];

interface IDataMap {
  title: string;
  description: string;
  message?: string | null;
  color: string;
}

const timelineDataMap = (
  historyGroup: StatusHistory
): Record<string, IDataMap> => ({
  [unitStatus.APPROVED]: {
    title: "Approval",
    description: `${historyGroup[0]?.name} - Admin`,
    message: historyGroup[0]?.message,
    color: "bg-success",
  },
  [unitStatus.PENDING]: {
    title: "Pending",
    description: "Request awaiting for approval",
    color: "bg-googlelink",
  },
  [unitStatus.REQUESTED_MORE_INFO]: {
    title: "Need More Info",
    description: `${historyGroup[0]?.name} - Admin`,
    message: historyGroup[0]?.message,
    color: "bg-status4",
  },
  [unitStatus.REJECTED]: {
    title: "Rejected",
    description: `${historyGroup[0]?.name} - Admin`,
    message: historyGroup[0]?.message,
    color: "bg-rejected",
  },
  [unitStatus.SUBMITTED]: {
    title: "Submitted application",
    description: "Request was submitted and now under review",
    color: "bg-white border border-grayborder",
  },
});

interface VerticalTimelineProps {
  unit: UnitResponseData;
}

export default function VerticalTimelineHistory({
  unit,
}: VerticalTimelineProps) {
  const { statusHistory } = unit;
  const groupedHistory = useMemo(() => {
    return statusHistory.reduce((acc, entry) => {
      const statusKey = entry.status as keyof typeof unitStatus;

      if (!acc[statusKey]) {
        acc[statusKey] = [];
      }
      acc[statusKey].push(entry);
      return acc;
    }, {} as Record<keyof typeof unitStatus, typeof statusHistory>);
  }, [statusHistory]);

  // Select history entries that match the current status
  const currentHistory =
    groupedHistory[unit.status as keyof typeof unitStatus] || [];

  const statusHistoryItems = [...(statusHistory || [])];

  statusHistoryItems.reverse();

  return (
    <div className="flex flex-col items-start pl-4">
      {statusHistoryItems.map((item) => (
        <StatusLine
          key={item.date}
          status={item.status}
          historyGroup={[item]}
        />
      ))}

      <StatusLine
        status={unitStatus.SUBMITTED}
        firstLine
        historyGroup={currentHistory}
      />
    </div>
  );
}

interface StatusLineProps {
  status: string;
  firstLine?: boolean;
  historyGroup: StatusHistory;
}

function StatusLine({
  status,
  firstLine = false,
  historyGroup,
}: StatusLineProps) {
  const statusKey = status as keyof ReturnType<typeof timelineDataMap>;
  const data = timelineDataMap(historyGroup)[statusKey];

  if (!data) {
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
        className={cn("absolute left-0 top-2 w-4 h-4 rounded-full", data.color)}
      ></div>

      {/* Content */}
      <div className="pl-6 pb-8">
        <div className="flex items-center gap-1">
          <p className="text-xs">{data.title}</p>

          {data?.message && (
            <Tooltip content={data?.message}>
              <QuestionIcon fill="#B5B5B5" width={12} height={12} />
            </Tooltip>
          )}
        </div>

        <p className="text-[10px] text-graytext">{data.description}</p>
      </div>
    </div>
  );
}

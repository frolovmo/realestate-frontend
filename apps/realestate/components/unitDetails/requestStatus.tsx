import { UnitResponseData } from "../../lib/types/index";
import VerticalTimelineHistory from "../verticalTimeline/verticalTimelineHistory";

interface RequestStatusProps {
  unit: UnitResponseData;
}

export default function RequestStatus({ unit }: RequestStatusProps) {
  return (
    <div className="border border-grayborder rounded-md p-3 min-w-[295px] self-start">
      <p className="border-b border-grayborder text-base font-semibold mb-6">
        Approval Status
      </p>
      <VerticalTimelineHistory unit={unit} />
    </div>
  );
}

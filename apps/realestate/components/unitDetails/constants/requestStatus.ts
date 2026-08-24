import { VerticalTimelineStatus } from "@/components/verticalTimeline/verticalTimeline";
import { unitStatus } from "@/lib/constants";

export const RequestStatusMapping: Record<string, VerticalTimelineStatus> = {
  [unitStatus.PENDING]: VerticalTimelineStatus.PENDING,
  [unitStatus.REQUESTED_MORE_INFO]: VerticalTimelineStatus.PENDING,
  [unitStatus.SUBMITTED]: VerticalTimelineStatus.INIT,
  [unitStatus.APPROVED]: VerticalTimelineStatus.SUCCESS,
  [unitStatus.REJECTED]: VerticalTimelineStatus.ERROR,
};

export const requestStatuses: Record<
  VerticalTimelineStatus,
  { title: string; description: string; status: VerticalTimelineStatus }
> = {
  [VerticalTimelineStatus.PENDING]: {
    title: "Pending",
    description: "Request awaiting for approval",
    status: VerticalTimelineStatus.PENDING,
  },

  [VerticalTimelineStatus.SUCCESS]: {
    title: "Approval",
    description: "Request was approved",
    status: VerticalTimelineStatus.SUCCESS,
  },

  [VerticalTimelineStatus.ERROR]: {
    title: "Rejected",
    description: "Request was rejected",
    status: VerticalTimelineStatus.ERROR,
  },

  [VerticalTimelineStatus.INIT]: {
    title: "Submitted application",
    description: "Request was submitted and now under review",
    status: VerticalTimelineStatus.INIT,
  },
};

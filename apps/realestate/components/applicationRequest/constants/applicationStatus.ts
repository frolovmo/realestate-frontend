import { VerticalTimelineStatus } from "@/components/verticalTimeline/verticalTimeline";

// export const LOAN_APPLICATION_BACK_END_STATUSES = [
// 	'Pending',
// 	'Under-Review',
// 	'Rejected',
// 	'Approved',
// ];

// export const LOAN_APPLICATION_BANK_STATUSES = [
// 	'Pending',
// 	'Under-Process',
// 	'Rejected',
// 	'Disbursed',
// ];

export enum ApplicationLevel {
  LEVEL_1 = "level-1",
  LEVEL_2 = "level-2",
}

export enum LevelOneStatus {
  PENDING = "Pending",
  UNDER_REVIEW = "Under-Review",
  REJECTED = "Rejected",
  APPROVED = "Approved",
}

export enum LevelTwoStatus {
  PENDING = "Pending",
  UNDER_REVIEW = "Under-Review",
  REJECTED = "Rejected",
  DISBURSED = "Disbursed",
}

export const LevelOneStatusMapping = {
  [LevelOneStatus.PENDING]: VerticalTimelineStatus.PENDING,
  [LevelOneStatus.UNDER_REVIEW]: VerticalTimelineStatus.PENDING,
  [LevelOneStatus.REJECTED]: VerticalTimelineStatus.ERROR,
  [LevelOneStatus.APPROVED]: VerticalTimelineStatus.SUCCESS,
};

export const LevelTwoStatusMapping = {
  [LevelTwoStatus.PENDING]: VerticalTimelineStatus.PENDING,
  [LevelTwoStatus.UNDER_REVIEW]: VerticalTimelineStatus.PENDING,
  [LevelTwoStatus.REJECTED]: VerticalTimelineStatus.ERROR,
  [LevelTwoStatus.DISBURSED]: VerticalTimelineStatus.SUCCESS,
};

export const applicationLevelStatuses: Record<
  ApplicationLevel,
  Record<
    VerticalTimelineStatus,
    { title: string; description: string; status: VerticalTimelineStatus }
  >
> = {
  [ApplicationLevel.LEVEL_1]: {
    [VerticalTimelineStatus.PENDING]: {
      title: "Approval level 1",
      description: "Request awaiting for for approval",
      status: VerticalTimelineStatus.PENDING,
    },

    [VerticalTimelineStatus.SUCCESS]: {
      title: "Approval level 1",
      description: "Request approved at level 1",
      status: VerticalTimelineStatus.SUCCESS,
    },

    [VerticalTimelineStatus.ERROR]: {
      title: "Approval level 1",
      description: "Request rejected at level 1",
      status: VerticalTimelineStatus.ERROR,
    },

    [VerticalTimelineStatus.INIT]: {
      title: "Approval level 1",
      description: "",
      status: VerticalTimelineStatus.INIT,
    },
  },

  [ApplicationLevel.LEVEL_2]: {
    [VerticalTimelineStatus.PENDING]: {
      title: "Approval level 2",
      description: "Request awaiting for for approval",
      status: VerticalTimelineStatus.PENDING,
    },

    [VerticalTimelineStatus.SUCCESS]: {
      title: "Approval level 2",
      description: "Request disbursed at level 2",
      status: VerticalTimelineStatus.SUCCESS,
    },

    [VerticalTimelineStatus.ERROR]: {
      title: "Approval level 2",
      description: "Request rejected at level 2",
      status: VerticalTimelineStatus.ERROR,
    },

    [VerticalTimelineStatus.INIT]: {
      title: "Approval level 2",
      description: "",
      status: VerticalTimelineStatus.INIT,
    },
  },
};

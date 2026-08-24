import { INotificationItem, NotificationType } from "@/lib/types/notification";

export const mockNotifications: INotificationItem[] = [
  {
    type: NotificationType.INFO,
    title: "Success Tip",
    description:
      "Tip: Properties with high-quality images get 3x more views. Update your listings for better results!",
    date: "2025-03-20T09:38:38.282+00:00",
  },
  {
    type: NotificationType.PROPERTY_APPROVED,
    title: "Property Approved",
    description:
      "Congratulations! Your property [Property Name] has been approved and is now live on the platform.",
    date: "2025-03-20T09:38:38.282+00:00",
  },
  {
    type: NotificationType.SECURITY,
    title: "New Login from Device",
    description:
      "New login detected on iPhone from Kigali. If this wasn’t you, please secure your account immediately.",
    date: "2025-03-20T09:38:38.282+00:00",
  },
  {
    type: NotificationType.SALES,
    title: "Monthly Sales Update",
    description: "You’ve achieved 10 sales this month. Keep up the great work!",
    date: "2025-03-20T09:38:38.282+00:00",
  },
];

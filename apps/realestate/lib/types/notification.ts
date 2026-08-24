export enum NotificationType {
  INFO = "info",
  PROPERTY_APPROVED = "property-approved",
  SECURITY = "security",
  SALES = "sales",
}

export interface INotificationItem {
  type: NotificationType;
  title: string;
  description: string;
  date: string;
}

import { BaseComponentProps } from "@/lib/types";
import { INotificationItem } from "@/lib/types/notification";

export interface INotificationsContentProps extends BaseComponentProps {
  items: INotificationItem[];
  onChangeNotifications: (items: INotificationItem[]) => void;
}

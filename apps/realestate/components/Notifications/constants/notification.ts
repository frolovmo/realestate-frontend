import NotificationInfoIcon from "@/components/icons/NotificationInfoIcon";
import NotificationSalesIcon from "@/components/icons/NotificationSalesIcon";
import NotificationSecurityIcon from "@/components/icons/NotificationSecurityIcon";
import NotificationPropertyApprovedIcon from "@/components/icons/NotificationPropertyApprovedIcon";

import { NotificationType } from "@/lib/types/notification";

type IconType = (props: React.SVGProps<SVGSVGElement>) => JSX.Element;

export const NotificationTypeIconMap: Record<NotificationType, IconType> = {
  [NotificationType.INFO]: NotificationInfoIcon,
  [NotificationType.PROPERTY_APPROVED]: NotificationPropertyApprovedIcon,
  [NotificationType.SALES]: NotificationSalesIcon,
  [NotificationType.SECURITY]: NotificationSecurityIcon,
};

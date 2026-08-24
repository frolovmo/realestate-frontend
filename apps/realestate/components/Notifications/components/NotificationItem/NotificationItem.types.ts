import { BaseComponentProps } from "@/lib/types";

export interface INotificationItemProps extends BaseComponentProps {
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  description: string;
  date: string;
}

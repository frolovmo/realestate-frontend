import React from "react";

import { NotificationIcon } from "@/components/icons";
import NotificationActiveIcon from "@/components/icons/NotificationActiveIcon";

import { INotificationButtonProps } from "./NotificationButton.types";

const NotificationButton = ({
  isActive,
  ...props
}: INotificationButtonProps) => {
  return (
    <div className="w-11 h-11" {...props}>
      {!isActive ? (
        <NotificationIcon width={44} height={44} />
      ) : (
        <NotificationActiveIcon width={44} height={44} />
      )}
    </div>
  );
};

export default NotificationButton;

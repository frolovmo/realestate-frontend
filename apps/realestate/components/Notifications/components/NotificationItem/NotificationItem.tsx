import React from "react";
import moment from "moment";

import { cn } from "@/lib/utils";

import { INotificationItemProps } from "./NotificationItem.types";

const NotificationItem = ({
  Icon,
  title,
  description,
  date,
  className = "",
  ...props
}: INotificationItemProps) => {
  const formatedDate = moment(date).fromNow() || "";

  return (
    <div
      className={cn("flex items-center gap-2 pr-2 py-[5px]", className)}
      {...props}
    >
      <div>
        <Icon width="26px" height="26px" />
      </div>

      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center justify-between gap-1">
          <h2 className="text-black text-xs font-semibold">{title}</h2>

          <p className="text-neutral-300 text-[10px]">{formatedDate}</p>
        </div>

        <div>
          <p className="text-neutral-400 text-[9px]">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;

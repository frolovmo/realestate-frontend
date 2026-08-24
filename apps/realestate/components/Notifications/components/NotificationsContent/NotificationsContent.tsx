"use client";

import React, { useState } from "react";
import { Loader } from "lucide-react";

import NotificationItem from "../NotificationItem";
import NotificationDivider from "../NotificationDivider";

import { NotificationTypeIconMap } from "../../constants/notification";

import { INotificationsContentProps } from "./NotificationsContent.types";
import mockRequest from "@/lib/utils/mockRequest";

const NotificationsContent = ({
  items = [],
  className = "",
  onChangeNotifications,
  ...props
}: INotificationsContentProps) => {
  const [loading, setLoading] = useState(false);

  const noItems = !items.length;

  const markNotificationsAsRead = async () => {
    setLoading(true);

    await mockRequest(null);
    onChangeNotifications([]);

    setLoading(false);
  };

  return (
    <div {...props}>
      <div className="py-3 px-4 flex items-center justify-between gap-3 shadow-md shadow-slate-300/30">
        <h2 className="text-base font-semibold font-sans">Notifications</h2>

        {!noItems && (
          <button
            className="flex items-center gap-1 text-[10px] font-medium text-orangelight font-sans hover:underline disabled:no-underline"
            onClick={markNotificationsAsRead}
            disabled={loading}
          >
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            Mark all as read
          </button>
        )}
      </div>

      {noItems ? (
        <div className="py-3 px-4">
          <p className="text-sm text-neutral-400">No Notices Right Now!</p>
        </div>
      ) : (
        <div className="py-3 px-[10px]">
          {items.map((item, index) => (
            <>
              <NotificationItem
                Icon={NotificationTypeIconMap[item.type]}
                title={item.title}
                description={item.description}
                date={item.date}
              />

              {index !== items.length - 1 && <NotificationDivider />}
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsContent;

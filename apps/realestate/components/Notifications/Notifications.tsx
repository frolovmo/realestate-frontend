"use client";

import React, { useState } from "react";

import NotificationButton from "./components/NotificationButton";
import NotificationsContent from "./components/NotificationsContent";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { mockNotifications } from "./mock/mockNotifications";
import { INotificationItem } from "@/lib/types/notification";
// import useSocketNotifications from "@/lib/hooks/useSocketNotifications";

const Notifications = () => {
  const [notifications, setNotifications] =
    useState<INotificationItem[]>(mockNotifications);

  const noNotifications = !notifications.length;

  // TODO: add after API ready
  //   const { notifications } = useSocketNotifications();

  return (
    <Popover>
      <PopoverTrigger>
        <NotificationButton isActive={!noNotifications} />
      </PopoverTrigger>

      <PopoverContent className="p-0 min-w-[380px]">
        <NotificationsContent
          items={notifications}
          onChangeNotifications={setNotifications}
        />
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;

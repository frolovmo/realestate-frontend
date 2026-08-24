import { useEffect, useState } from "react";
import { socket } from "../socket";
import { INotificationItem } from "../types/notification";

const useSocketNotifications = () => {
  const [notifications, setNotifications] = useState<INotificationItem[]>([]);

  const onChangeNotifications = (data: INotificationItem[]) => {
    setNotifications(data);
  };

  useEffect(() => {
    socket.on("notifications", onChangeNotifications);

    return () => {
      socket.off("notifications", onChangeNotifications);
    };
  }, []);

  return { notifications };
};

export default useSocketNotifications;

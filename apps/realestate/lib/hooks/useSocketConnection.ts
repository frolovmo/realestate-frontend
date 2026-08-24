import { useEffect } from "react";
import { socket } from "../socket";

const useSocketConnection = () => {
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      console.log("Connected to socket server");
    }

    function onDisconnect() {
      console.log("Socket server disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
};

export default useSocketConnection;

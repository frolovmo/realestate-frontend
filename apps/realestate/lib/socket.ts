"use client";

import { io } from "socket.io-client";
import { SOCKET_SERVER_URL } from "./api";

export const socket = io(SOCKET_SERVER_URL);

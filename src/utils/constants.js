export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

import {io} from "socket.io-client";

export const createSocketConnection = () => {
    return io(BASE_URL, {
        transports: ["websocket", "polling"],
    });
};
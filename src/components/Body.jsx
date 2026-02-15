import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import api from "../utils/apiAxios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/constants";
import { setOnlineUsers, addOnlineUser, removeOnlineUser, removeAllOnlineUser } from "../utils/onlineUserSlice";
import { updateLastSeen } from "../utils/connectionSlice";

function Body() {
    const dispatch = useDispatch();
    const userData = useSelector((store) => store.user);
    const [socket, setSocket] = useState(null);

    const fetchUser = async () => {
        try {
            const user = await api.get("/profile/view");
            dispatch(addUser(user.data));
        } catch (err) {
            // If 401, it just means the user isn't logged in and we don't need to log an error or redirect here.
            if (err.response?.status !== 401) {
                console.error("Unexpected error fetching profile:", err);
            }
        }
    };

    useEffect(() => {
        // Fetch user only if we don't have one
        if (!userData) {
            fetchUser();
        }
    }, [userData]);

    // Initialize socket connection and set up global online status listeners
    useEffect(() => {
        if (userData?._id) {
            const newSocket = createSocketConnection();

            // When socket connects, emit userConnected event
            newSocket.on("connect", () => {
                newSocket.emit("userConnected", userData._id);
            });

            // Handle online users list when connecting
            newSocket.on("onlineConnectionList", (onlineUserIds) => {
                dispatch(setOnlineUsers(onlineUserIds));
            });

            // Handle when a connection comes online
            newSocket.on("connectionOnline", (userId) => {
                dispatch(addOnlineUser(userId));
            });

            // Handle when a connection goes offline
            newSocket.on("connectionOffline", ({ userId, lastSeen }) => {
                dispatch(removeOnlineUser(userId));
                dispatch(updateLastSeen({userId, lastSeen}));
            });

            setSocket(newSocket);

            // Clean up on unmount
            return () => {
                if (newSocket) {
                    newSocket.disconnect();
                    dispatch(removeAllOnlineUser());
                }
            };
        }
    }, [userData, dispatch]);

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow mb-2">
                <Outlet context={socket} />
            </main>
            <Footer />
        </div>
    );
}

export default Body;

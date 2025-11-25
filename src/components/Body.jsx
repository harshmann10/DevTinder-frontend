import { Outlet, useNavigate, useLocation } from "react-router-dom";
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
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useSelector((store) => store.user);
    const [socket, setSocket] = useState(null);

    // Define paths that are explicitly public and do not require a logged-in user
    // and where a failed user fetch should NOT cause a redirect.
    const publicPaths = [
        "/",
        "/terms-of-service",
        "/privacy-policy",
        "/contact-us",
        "/cancellation-and-refund",
        "/shipping-And-delivery",
        "/login",
        "/signup",
        "/forgot-password",
    ];

    const fetchUser = async () => {
        try {
            const user = await api.get("/profile/view");
            dispatch(addUser(user.data));
        } catch (err) {
            console.error("Failed to fetch user profile:", err);

            // Only redirect to login if the error is 401 (Unauthorized)
            // AND the current path is NOT one of the public paths.
            // For other errors or if on a public path, do not force a redirect.
            if (err.response?.status === 401 && !publicPaths.includes(location.pathname)) {
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        if (!userData) {
            fetchUser();
        }
    }, [userData, location.pathname]);

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

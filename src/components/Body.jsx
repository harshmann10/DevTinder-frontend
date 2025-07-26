import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import api from "../utils/apiAxios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

function Body() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useSelector((store) => store.user);

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

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow mb-2">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Body;

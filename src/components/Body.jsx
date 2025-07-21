import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import api from "../utils/apiAxios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

function Body() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        try {
            const user = await api.get("/profile/view");
            dispatch(addUser(user.data));
        } catch (err) {
            if (err.response?.status === 401) {
                navigate("/login");
            }
            console.error("Failed to fetch user profile:", err);
            navigate("/");
        }
    };

    useEffect(() => {
        if (!userData) {
            fetchUser();
        }
    }, [userData]);

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

import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
import api from "../utils/apiAxios";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
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
                // dispatch(removeUser());
            }
            console.error("Failed to fetch user profile:", err);
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
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Body;

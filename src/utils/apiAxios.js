import axios from "axios";
import { BASE_URL } from "./constants";
import appStore from "./appStore";
import { removeUser } from "./userSlice";
import { removeFeed } from "./feedSlice";
import { removeConnection } from "./connectionSlice";
import { clearRequests } from "./requestSlice";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const { dispatch } = appStore;
            dispatch(removeUser());
            dispatch(removeFeed());
            dispatch(removeConnection());
            dispatch(clearRequests());
        }
        // Return the error so that component-level catch blocks can still handle it
        return Promise.reject(error);
    }
);

export default api;

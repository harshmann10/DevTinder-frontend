import axios from "axios";
import { BASE_URL } from "./constants";
import appStore from "./appStore";
import { removeUser } from "./userSlice";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
        if (error.response?.status === 401) {
            // Dispatch the logout action to clear user state
            appStore.dispatch(removeUser());
        }
        // Return the error so that component-level catch blocks can still handle it
        return Promise.reject(error);
    }
);

export default api;


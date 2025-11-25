import { createSlice } from "@reduxjs/toolkit";

const onlineUserSlice = createSlice({
    name: "onlineUsers",
    initialState: [],
    reducers: {
        setOnlineUsers: (state, action) => {
            return action.payload;
        },
        addOnlineUser: (state, action) => {
            const userId = action.payload;
            if (!state.includes(userId)) {
                state.push(userId);
            }
        },
        removeOnlineUser: (state, action) => {
            const userId = action.payload;
            return state.filter((id) => id !== userId);
        },
        removeAllOnlineUser: (state, action) => [],
    },
});

export const { setOnlineUsers, addOnlineUser, removeOnlineUser, removeAllOnlineUser } = onlineUserSlice.actions;

export default onlineUserSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequest: (state, action) => action.payload,
        removeRequest: (state, action) => {
            const id = action.payload;
            return state.filter((request) => request._id !== id);
        },
        clearRequests: () => null,
    },
});

export const { addRequest, removeRequest, clearRequests } = requestSlice.actions;

export default requestSlice.reducer;

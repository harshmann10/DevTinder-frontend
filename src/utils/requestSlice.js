import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: [],
    reducers: {
        addRequest: (state, action) => action.payload,
        removeRequest: (state, action) => {
            const id = action.payload;
            return state.filter((request) => request._id !== id);
        },
    },
});

export const { addRequest, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name: "connection",
    initialState: [],
    reducers: {
        addConnection: (state, action) => action.payload,
        removeConnection: (state, action) => [],
        updateLastSeen: (state, action) => {
            if (!Array.isArray(state)) return;
            
            const { userId, lastSeen } = action.payload;
            const connection = state.find(c => c._id === userId);
            if (connection) {
                connection.lastSeen = lastSeen;
            }
        },
    },
});

export const { addConnection, removeConnection, updateLastSeen } = connectionsSlice.actions;

export default connectionsSlice.reducer;

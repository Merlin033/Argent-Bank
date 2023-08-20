import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: null,
    reducers: {
        setGetProfile: (state, action) => {
            state = action.payload;
            return state;
        },
        setEditUser: (state, action) => {
            state.userName = action.payload;
        },
        setClearProfile: () => null
    }
});

export const { setGetProfile, setEditUser, setClearProfile } = profileSlice.actions;
export default profileSlice.reducer;
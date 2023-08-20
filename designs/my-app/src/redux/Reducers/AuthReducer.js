import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: "",
  },
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload;
    },
    setLogout: (state, action) => {
      state.token = '';
    },
  },
});

export const {setAuth, setLogout} = authSlice.actions;
export default authSlice.reducer;
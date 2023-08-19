import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('auth_token') || '', // Load token from local storage if available
  },
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.response.body.token;
      localStorage.setItem('auth_token', state.token); // Store token in local storage
    },
    setLogout: (state, action) => {
      state.token = '';
      localStorage.removeItem('auth_token'); // Remove token from local storage
    },
  },
});

export const {setAuth, setLogout} = authSlice.actions;
export default authSlice.reducer;
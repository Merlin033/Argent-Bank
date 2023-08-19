import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Reducers/AuthReducer'
import ProfileUserReducer from './Reducers/ProfileUserReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: ProfileUserReducer,
  },
})
export default store
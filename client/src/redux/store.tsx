import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Auth';

export const store = configureStore({
  reducer: {
      user: authReducer,
  },
})

// export type AuthReducer = ReturnType<typeof authReducer>
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

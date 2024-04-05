import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import ComponentListReducer from "./componentListReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    componentList: ComponentListReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;


import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import ComponentListReducer from "./componentListReducer";
import pageInfoReducer from "./pageInfoReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    componentList: ComponentListReducer,
    pageInfo: pageInfoReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;


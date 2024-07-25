import { configureStore } from "@reduxjs/toolkit";
import settingReducer, { AccomudationSlices, ChatRoomSlices, getPost } from "./setting/reducers";
import { userReducer } from "./setting/reducers";
export const store = configureStore({
  reducer: {
    setting: settingReducer,
    user: userReducer,
    data: getPost,
    Accomudation: AccomudationSlices,
    chatRoom:ChatRoomSlices
  },
});

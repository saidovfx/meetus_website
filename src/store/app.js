import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import userSlice from "../features/auth.features/check.auth.js";
import userSignupSlice from "../features/auth.features/signup.user.js";
import loginSlice from "../features/auth.features/login.user.js";
import completeSlice from "../features/auth.features/complete.user.auth.js";
import navigatorSlice from "../features/navigator.features/navigator.js";
import profileRenameSlice from "../features/profile.features/rename.user.profile.js";
import contactSlice from "../features/profile.features/user.contact.js";
import projectSlice from "../features/post.feautures/post.project.js";
import searchSlice from "../features/search.feauture/search.js";
import postDetails from "../features/post.feautures/post.details.js";
import collaboratorNOtificationSlice from "../features/notification.features/post.notifictaion/collaborator.notication.js";
const rootReducer = combineReducers({
  user: userSlice,
  auth: userSignupSlice,
  login: loginSlice,
  complete: completeSlice,
  navigator: navigatorSlice,
  profileRename: profileRenameSlice,
  contact: contactSlice,
  project: projectSlice,
  search: searchSlice,
  postDetails: postDetails,
  collaborator: collaboratorNOtificationSlice,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["postDetails"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

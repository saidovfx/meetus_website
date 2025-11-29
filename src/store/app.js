import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/auth.features/check.auth.js";
import userSignupSlice from "../features/auth.features/signup.user.js";
import loginSlice from "../features/auth.features/login.user.js";
import completeSlice from "../features/auth.features/complete.user.auth.js";
import navigatorSlice from "../features/navigator.features/navigator.js";
import profileRenameSlice from "../features/profile.features/rename.user.profile.js";
import contactSlice from "../features/profile.features/user.contact.js";
import projectSlice from "../features/post.feautures/post.project.js";
const persistedState = sessionStorage.getItem("reduxState")
  ? JSON.parse(sessionStorage.getItem("reduxState"))
  : {};
export const store = configureStore({
  reducer: {
    user: userSlice,
    auth: userSignupSlice,
    login: loginSlice,
    complete: completeSlice,
    navigator: navigatorSlice,
    profileRename: profileRenameSlice,
    contact: contactSlice,
    project: projectSlice,
  },

  preloadedState: persistedState,
});

store.subscribe(() => {
  sessionStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

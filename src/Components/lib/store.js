import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import audioReducer from "./songSlices/audioSlice";
import { shazamApi } from "./songSlices/shazamSlice";

export const makeStore = configureStore({
  reducer: {
    audio: audioReducer,
    // Add the generated reducer as a specific top-level slice
    [shazamApi.reducerPath]: shazamApi.reducer,
  },

  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([shazamApi.middleware]),
});

setupListeners(makeStore.dispatch);

// import { combineReducers, configureStore, MiddlewareArray } from "@reduxjs/toolkit";
// import userReducer from "./user/userSlice"; // Corrected the spelling of 'userSlice'
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// // Combine reducers
// const rootReducer = combineReducers({ user: userReducer });

// // Configure persistence
// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Explicitly define Middleware type
// const middleware = (getDefaultMiddleware: any) => 
//   getDefaultMiddleware({
//     serializableCheck: false,
//   });

// // Create the store
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: middleware as MiddlewareArray<any>, // Cast to MiddlewareArray
// });

// // Create persistor
// export const persistor = persistStore(store);

// // Define RootState and AppDispatch based on the store
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch; // Add this line

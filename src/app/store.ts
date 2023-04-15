import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import songsReducer from "../features/main/songs/Songs.slice";
import moviesReducer from "../features/main/movies/Movies.slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    songsReducer,
    moviesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

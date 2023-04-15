import { TMovie } from "./Movies.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { moviesApi } from "../../../api/moviesApi/songs.api";

export interface IMoviesState {
  movies: TMovie[];
  status: "idle" | "loading" | "failed";
  errorMessage: string | undefined;
}

export const initialState: IMoviesState = {
  movies: [],
  status: "idle",
  errorMessage: undefined,
};

const moviesSlice = createSlice({
  name: "moviesReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMovies.fulfilled, (state, { payload }) => {
      state.status = "idle";
      state.movies = payload;
    });
    builder.addCase(fetchMovies.rejected, (state, { payload }) => {
      state.status = "failed";
      state.errorMessage = payload;
    });
  },
});

export const fetchMovies = createAsyncThunk<
  TMovie[],
  void,
  { rejectValue: string }
>("moviesReducer/fetchMovies", async (_, { rejectWithValue }) => {
  try {
    const { data } = await moviesApi.getMovies();
    return data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

const {} = moviesSlice.actions;

export default moviesSlice.reducer;

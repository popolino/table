import { createSlice } from "@reduxjs/toolkit";
import { TSong } from "./Songs.types";
import { songsApi } from "../../../api/songsApi/songs.api";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface ISongsState {
  songs: TSong[];
  category: string;
  status: "idle" | "loading" | "failed";
  errorMessage: string | undefined;
}

export const initialState: ISongsState = {
  songs: [],
  category: "songs",
  status: "idle",
  errorMessage: undefined,
};

const songsSlice = createSlice({
  name: "songsReducer",
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSongs.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSongs.fulfilled, (state, { payload }) => {
      state.status = "idle";
      state.songs = payload;
    });
    builder.addCase(fetchSongs.rejected, (state, { payload }) => {
      state.status = "failed";
      state.errorMessage = payload;
    });
  },
});

export const fetchSongs = createAsyncThunk<
  TSong[],
  void,
  { rejectValue: string }
>("songsReducer/fetchSongs", async (_, { rejectWithValue }) => {
  try {
    const { data } = await songsApi.getSongs();
    return data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const { changeCategory } = songsSlice.actions;
const {} = songsSlice.actions;

export default songsSlice.reducer;

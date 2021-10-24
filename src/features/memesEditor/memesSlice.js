import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

const memesAdapter = createEntityAdapter();

const initialState = memesAdapter.getInitialState({
  status: 'idle',
  error: null,
})


export const fetchMemes = createAsyncThunk('memes/fetchMemes', async () => {
  const response = await fetch("https://api.imgflip.com/get_memes");
  const { data } = await response.json();
  return data.memes
})



const memesSlice = createSlice({
  name: 'memes',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMemes.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        memesAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchMemes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})


export default memesSlice.reducer;
export const { selectAll: selectAllMemes } = memesAdapter.getSelectors(state => state.memes)

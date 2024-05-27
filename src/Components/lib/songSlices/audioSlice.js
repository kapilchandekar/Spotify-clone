import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPlaying: false,
  song: null,
};

const songSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    playSong: (state, action) => {
      state.isPlaying = true;
      state.song = action.payload;
    },
    stopSong: (state) => {
      state.isPlaying = false;
      state.song = null;
    },
  },
});

export const { playSong, stopSong } = songSlice.actions;
export default songSlice.reducer;

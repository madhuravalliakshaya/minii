import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '@/data/mockData';

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  queue: Song[];
  shuffle: boolean;
  repeat: 'off' | 'one' | 'all';
}

const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  volume: 80,
  progress: 0,
  queue: [],
  shuffle: false,
  repeat: 'off',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
      state.progress = 0;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setQueue: (state, action: PayloadAction<Song[]>) => {
      state.queue = action.payload;
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
    toggleRepeat: (state) => {
      const modes: ('off' | 'one' | 'all')[] = ['off', 'one', 'all'];
      const currentIndex = modes.indexOf(state.repeat);
      state.repeat = modes[(currentIndex + 1) % modes.length];
    },
    nextSong: (state) => {
      if (state.queue.length === 0 || !state.currentSong) return;
      
      const currentIndex = state.queue.findIndex(s => s.id === state.currentSong?.id);
      let nextIndex: number;
      
      if (state.shuffle) {
        nextIndex = Math.floor(Math.random() * state.queue.length);
      } else {
        nextIndex = (currentIndex + 1) % state.queue.length;
      }
      
      state.currentSong = state.queue[nextIndex];
      state.progress = 0;
    },
    prevSong: (state) => {
      if (state.queue.length === 0 || !state.currentSong) return;
      
      const currentIndex = state.queue.findIndex(s => s.id === state.currentSong?.id);
      const prevIndex = currentIndex === 0 ? state.queue.length - 1 : currentIndex - 1;
      
      state.currentSong = state.queue[prevIndex];
      state.progress = 0;
    },
  },
});

export const {
  setCurrentSong,
  togglePlay,
  setVolume,
  setProgress,
  setQueue,
  toggleShuffle,
  toggleRepeat,
  nextSong,
  prevSong,
} = playerSlice.actions;

export default playerSlice.reducer;

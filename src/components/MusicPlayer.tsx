import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Heart,
  ListMusic,
  Maximize2,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  togglePlay,
  setVolume,
  setProgress,
  toggleShuffle,
  toggleRepeat,
  nextSong,
  prevSong,
} from '@/store/playerSlice';
import { formatDuration } from '@/data/mockData';
import { Slider } from '@/components/ui/slider';

const MusicPlayer = () => {
  const dispatch = useAppDispatch();
  const { currentSong, isPlaying, volume, progress, shuffle, repeat } = useAppSelector(
    (state) => state.player
  );
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);

  // Simulate progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        dispatch(setProgress(Math.min(progress + 1, currentSong.duration)));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong, progress, dispatch]);

  // Auto next song
  useEffect(() => {
    if (currentSong && progress >= currentSong.duration) {
      if (repeat === 'one') {
        dispatch(setProgress(0));
      } else {
        dispatch(nextSong());
      }
    }
  }, [progress, currentSong, repeat, dispatch]);

  const handleVolumeToggle = () => {
    if (isMuted) {
      dispatch(setVolume(prevVolume));
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      dispatch(setVolume(0));
      setIsMuted(true);
    }
  };

  if (!currentSong) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-card/80 backdrop-blur-xl border-t border-border flex items-center justify-center">
        <p className="text-muted-foreground">Select a song to start playing</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 h-24 bg-card/95 backdrop-blur-xl border-t border-border z-50"
    >
      <div className="h-full max-w-screen-2xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* Song Info */}
        <div className="flex items-center gap-4 w-80 min-w-0">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 shadow-card"
            style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
          >
            <img
              src={currentSong.cover}
              alt={currentSong.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="min-w-0 flex-1">
            <h4 className="font-medium truncate">{currentSong.title}</h4>
            <p className="text-sm text-muted-foreground truncate">{currentSong.artist}</p>
          </div>
          <button className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex-1 max-w-2xl flex flex-col items-center gap-2">
          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(toggleShuffle())}
              className={`transition-colors ${shuffle ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              onClick={() => dispatch(prevSong())}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(togglePlay())}
              className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-glow"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-primary-foreground fill-current" />
              ) : (
                <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" />
              )}
            </motion.button>
            <button
              onClick={() => dispatch(nextSong())}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            <button
              onClick={() => dispatch(toggleRepeat())}
              className={`transition-colors ${repeat !== 'off' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {repeat === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-10 text-right">
              {formatDuration(progress)}
            </span>
            <Slider
              value={[progress]}
              max={currentSong.duration}
              step={1}
              onValueChange={(value) => dispatch(setProgress(value[0]))}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-10">
              {formatDuration(currentSong.duration)}
            </span>
          </div>
        </div>

        {/* Volume & Extra */}
        <div className="hidden md:flex items-center gap-4 w-80 justify-end">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <ListMusic className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 w-32">
            <button
              onClick={handleVolumeToggle}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={(value) => {
                dispatch(setVolume(value[0]));
                if (value[0] > 0) setIsMuted(false);
              }}
              className="flex-1"
            />
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;

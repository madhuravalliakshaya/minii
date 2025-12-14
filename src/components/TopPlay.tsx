import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { getTopSongs, formatPlays } from '@/data/mockData';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentSong, togglePlay, setQueue } from '@/store/playerSlice';
import { songs } from '@/data/mockData';
import { Link } from 'react-router-dom';

const TopPlay = () => {
  const dispatch = useAppDispatch();
  const { currentSong, isPlaying } = useAppSelector((state) => state.player);
  const topSongs = getTopSongs();

  const handlePlay = (song: typeof topSongs[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentSong?.id === song.id) {
      dispatch(togglePlay());
    } else {
      dispatch(setQueue(songs));
      dispatch(setCurrentSong(song));
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Top Charts</h2>
        <Link to="/" className="text-sm text-primary hover:underline">
          See all
        </Link>
      </div>

      <div className="space-y-3">
        {topSongs.map((song, index) => {
          const isCurrentSong = currentSong?.id === song.id;
          
          return (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/song/${song.id}`}>
                <div className="group flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/50 transition-all duration-200 cursor-pointer">
                  {/* Rank */}
                  <div className={`w-6 text-center font-bold ${index < 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                    {index + 1}
                  </div>

                  {/* Cover */}
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => handlePlay(song, e)}
                      className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {isCurrentSong && isPlaying ? (
                        <Pause className="w-4 h-4 text-foreground" />
                      ) : (
                        <Play className="w-4 h-4 text-foreground ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium truncate text-sm ${isCurrentSong ? 'text-primary' : ''}`}>
                      {song.title}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                  </div>

                  {/* Plays */}
                  <div className="text-xs text-muted-foreground">
                    {formatPlays(song.plays)}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Featured Artist */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-bold mb-4">Featured Artist</h3>
        <div className="relative rounded-2xl overflow-hidden aspect-video">
          <img
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=225&fit=crop"
            alt="Featured Artist"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <p className="text-xs text-muted-foreground mb-1">Artist of the Week</p>
            <h4 className="text-lg font-bold">Amber Keys</h4>
            <p className="text-sm text-muted-foreground">12.5M monthly listeners</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPlay;

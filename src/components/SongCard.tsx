import { motion } from 'framer-motion';
import { Play, Pause, Heart } from 'lucide-react';
import { Song, formatDuration, formatPlays } from '@/data/mockData';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentSong, togglePlay, setQueue } from '@/store/playerSlice';
import { songs } from '@/data/mockData';
import { Link } from 'react-router-dom';

interface SongCardProps {
  song: Song;
  index?: number;
}

const SongCard = ({ song, index = 0 }: SongCardProps) => {
  const dispatch = useAppDispatch();
  const { currentSong, isPlaying } = useAppSelector((state) => state.player);
  const isCurrentSong = currentSong?.id === song.id;

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCurrentSong) {
      dispatch(togglePlay());
    } else {
      dispatch(setQueue(songs));
      dispatch(setCurrentSong(song));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group"
    >
      <Link to={`/song/${song.id}`}>
        <div className="relative p-4 rounded-xl bg-card hover:bg-secondary/50 transition-all duration-300 shadow-card hover:shadow-elevated cursor-pointer">
          {/* Cover Image */}
          <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
            <img
              src={song.cover}
              alt={song.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
            
            {/* Play Button */}
            <motion.button
              onClick={handlePlay}
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              className="absolute bottom-2 right-2 w-12 h-12 rounded-full gradient-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-glow translate-y-2 group-hover:translate-y-0"
            >
              {isCurrentSong && isPlaying ? (
                <Pause className="w-5 h-5 text-primary-foreground fill-current" />
              ) : (
                <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" />
              )}
            </motion.button>

            {/* Playing indicator */}
            {isCurrentSong && isPlaying && (
              <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-primary/90 backdrop-blur-sm">
                <div className="flex gap-0.5">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-primary-foreground rounded-full"
                      animate={{
                        height: [8, 16, 8],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-1">
            <h3 className={`font-semibold truncate ${isCurrentSong ? 'text-primary' : 'text-foreground'}`}>
              {song.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatDuration(song.duration)}</span>
              <span>{formatPlays(song.plays)} plays</span>
            </div>
          </div>

          {/* Like Button */}
          <button 
            onClick={(e) => e.preventDefault()}
            className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Heart className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default SongCard;

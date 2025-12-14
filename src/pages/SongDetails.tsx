import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, Heart, Share2, MoreHorizontal, Clock } from 'lucide-react';
import { getSongById, formatDuration, formatPlays, songs } from '@/data/mockData';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentSong, togglePlay, setQueue } from '@/store/playerSlice';
import { Button } from '@/components/ui/button';
import ErrorState from '@/components/ErrorState';

const SongDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentSong, isPlaying } = useAppSelector((state) => state.player);

  const song = getSongById(id || '');

  if (!song) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorState message="Song not found" />
      </div>
    );
  }

  const isCurrentSong = currentSong?.id === song.id;

  const handlePlay = () => {
    if (isCurrentSong) {
      dispatch(togglePlay());
    } else {
      dispatch(setQueue(songs));
      dispatch(setCurrentSong(song));
    }
  };

  // Get related songs (same genre)
  const relatedSongs = songs.filter((s) => s.genre === song.genre && s.id !== song.id).slice(0, 5);

  return (
    <div className="min-h-screen pb-48">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Gradient */}
        <div
          className="absolute inset-0 h-96"
          style={{
            background: `linear-gradient(to bottom, hsla(141, 76%, 48%, 0.3), transparent)`,
          }}
        />

        {/* Back Button */}
        <div className="relative z-10 p-4 lg:p-8">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>

        {/* Song Info */}
        <div className="relative z-10 px-4 lg:px-8 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row items-center lg:items-end gap-6 lg:gap-8"
          >
            {/* Cover */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="w-56 h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-elevated flex-shrink-0"
            >
              <img
                src={song.cover}
                alt={song.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Details */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Song</p>
              <h1 className="text-3xl lg:text-5xl font-bold mb-4">{song.title}</h1>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{song.artist}</span>
                <span>•</span>
                <span>{song.album}</span>
                <span>•</span>
                <span>{song.year}</span>
                <span>•</span>
                <span>{formatDuration(song.duration)}</span>
                <span>•</span>
                <span>{formatPlays(song.plays)} plays</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 lg:px-8 py-6 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlay}
          className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-glow"
        >
          {isCurrentSong && isPlaying ? (
            <Pause className="w-6 h-6 text-primary-foreground fill-current" />
          ) : (
            <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
          )}
        </motion.button>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <Heart className="w-6 h-6" />
        </Button>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Share2 className="w-5 h-5" />
        </Button>

        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Song Stats */}
      <div className="px-4 lg:px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Plays', value: formatPlays(song.plays) },
            { label: 'Genre', value: song.genre.charAt(0).toUpperCase() + song.genre.slice(1) },
            { label: 'Album', value: song.album },
            { label: 'Released', value: song.year.toString() },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl p-4 shadow-card"
            >
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-lg font-semibold">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Related Songs */}
      {relatedSongs.length > 0 && (
        <div className="px-4 lg:px-8 py-6">
          <h2 className="text-xl font-bold mb-4">More from {song.genre}</h2>
          <div className="bg-card rounded-xl overflow-hidden shadow-card">
            {relatedSongs.map((relatedSong, index) => {
              const isRelatedPlaying = currentSong?.id === relatedSong.id;
              return (
                <motion.div
                  key={relatedSong.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/song/${relatedSong.id}`}>
                    <div
                      className={`flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors ${
                        index !== relatedSongs.length - 1 ? 'border-b border-border' : ''
                      }`}
                    >
                      <span className="w-6 text-center text-muted-foreground">{index + 1}</span>
                      <img
                        src={relatedSong.cover}
                        alt={relatedSong.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium truncate ${isRelatedPlaying ? 'text-primary' : ''}`}>
                          {relatedSong.title}
                        </h4>
                        <p className="text-sm text-muted-foreground truncate">{relatedSong.artist}</p>
                      </div>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="text-sm hidden sm:block">{formatPlays(relatedSong.plays)}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{formatDuration(relatedSong.duration)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SongDetails;

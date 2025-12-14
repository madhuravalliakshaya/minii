import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SongCard from '@/components/SongCard';
import TopPlay from '@/components/TopPlay';
import GenreFilter from '@/components/GenreFilter';
import LoadingState from '@/components/LoadingState';
import { getSongsByGenre, genres } from '@/data/mockData';

interface HomePageProps {
  selectedGenre: string;
  onGenreSelect: (genreId: string) => void;
}

const HomePage = ({ selectedGenre, onGenreSelect }: HomePageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const songs = getSongsByGenre(selectedGenre);
  const currentGenre = genres.find((g) => g.id === selectedGenre);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [selectedGenre]);

  return (
    <div className="min-h-screen pb-48">
      {/* Hero Banner */}
      <div className="relative h-64 lg:h-80 mb-8 rounded-2xl overflow-hidden mx-4 lg:mx-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=1200&h=400&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <div className="relative z-10 h-full flex flex-col justify-end p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-primary text-sm font-medium mb-2">Featured Playlist</p>
            <h1 className="text-3xl lg:text-5xl font-bold mb-2">Today's Top Hits</h1>
            <p className="text-muted-foreground max-w-lg">
              The hottest tracks right now. Updated daily with the freshest music.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mobile Genre Filter */}
      <div className="px-4 mb-6">
        <GenreFilter selectedGenre={selectedGenre} onGenreSelect={onGenreSelect} />
      </div>

      {/* Main Content */}
      <div className="flex gap-6 px-4 lg:px-0">
        {/* Songs Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                {currentGenre?.id === 'all' ? 'All Songs' : currentGenre?.name}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {songs.length} {songs.length === 1 ? 'song' : 'songs'}
              </p>
            </div>
          </div>

          {isLoading ? (
            <LoadingState />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {songs.map((song, index) => (
                <SongCard key={song.id} song={song} index={index} />
              ))}
            </div>
          )}
        </div>

        {/* TopPlay Sidebar - Hidden on smaller screens */}
        <div className="hidden xl:block w-80 flex-shrink-0">
          <div className="sticky top-24">
            <TopPlay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

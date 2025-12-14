import { motion } from 'framer-motion';
import { genres } from '@/data/mockData';

interface GenreFilterProps {
  selectedGenre: string;
  onGenreSelect: (genreId: string) => void;
}

const GenreFilter = ({ selectedGenre, onGenreSelect }: GenreFilterProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide lg:hidden">
      {genres.map((genre) => {
        const isActive = selectedGenre === genre.id;
        return (
          <motion.button
            key={genre.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onGenreSelect(genre.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              isActive
                ? 'text-primary-foreground shadow-glow'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
            style={isActive ? { backgroundColor: genre.color } : undefined}
          >
            {genre.name}
          </motion.button>
        );
      })}
    </div>
  );
};

export default GenreFilter;

import { Sun, Moon, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onMenuToggle: () => void;
}

const Header = ({ isDark, onToggleTheme, onMenuToggle }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search songs, artists..."
              className="w-full h-10 pl-4 pr-4 rounded-full bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleTheme}
          className="p-2.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-foreground" />
          ) : (
            <Moon className="w-5 h-5 text-foreground" />
          )}
        </motion.button>
      </div>
    </header>
  );
};

export default Header;

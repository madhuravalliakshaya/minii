import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, Heart, PlusCircle, Music2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { genres } from '@/data/mockData';

interface SidebarProps {
  selectedGenre: string;
  onGenreSelect: (genreId: string) => void;
}

const Sidebar = ({ selectedGenre, onGenreSelect }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Library, label: 'Library', path: '/library' },
  ];

  const playlists = [
    { icon: Heart, label: 'Liked Songs', path: '/liked' },
    { icon: PlusCircle, label: 'Create Playlist', path: '/create' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-sidebar h-full border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <Music2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Melodify</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="px-3 mb-6">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-primary font-medium'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-sidebar-primary' : ''}`} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Playlists */}
      <div className="px-3 mb-6">
        <h3 className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Playlists
        </h3>
        <ul className="space-y-1">
          {playlists.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Genres Filter */}
      <div className="flex-1 px-3 overflow-y-auto scrollbar-hide">
        <h3 className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Genres
        </h3>
        <ul className="space-y-1">
          {genres.map((genre) => {
            const isActive = selectedGenre === genre.id;
            return (
              <li key={genre.id}>
                <motion.button
                  onClick={() => onGenreSelect(genre.id)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-primary font-medium'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: genre.color }}
                  />
                  <span className="text-sm">{genre.name}</span>
                </motion.button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-sidebar-accent/50 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground">Premium</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

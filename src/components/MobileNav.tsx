import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, Music2 } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileNav = () => {
  const location = useLocation();

  const items = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Library, label: 'Library', path: '/library' },
  ];

  return (
    <nav className="fixed bottom-24 left-0 right-0 lg:hidden bg-card/95 backdrop-blur-xl border-t border-border z-40">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className="flex flex-col items-center gap-1 py-2 px-4"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon
                  className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                />
              </motion.div>
              <span
                className={`text-xs ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;

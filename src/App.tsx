import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/store/store';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import MusicPlayer from '@/components/MusicPlayer';
import MobileNav from '@/components/MobileNav';
import HomePage from '@/pages/HomePage';
import SongDetails from '@/pages/SongDetails';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

const AppContent = () => {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop Sidebar */}
      <Sidebar selectedGenre={selectedGenre} onGenreSelect={setSelectedGenre} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        <main className="flex-1 lg:px-8 py-6 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  selectedGenre={selectedGenre}
                  onGenreSelect={setSelectedGenre}
                />
              }
            />
            <Route path="/song/:id" element={<SongDetails />} />
            <Route path="/search" element={<HomePage selectedGenre="all" onGenreSelect={setSelectedGenre} />} />
            <Route path="/library" element={<HomePage selectedGenre="all" onGenreSelect={setSelectedGenre} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Mobile Navigation */}
        <MobileNav />

        {/* Music Player */}
        <MusicPlayer />
      </div>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;

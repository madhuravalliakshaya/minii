export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  genre: string;
  year: number;
  plays: number;
}

export interface Genre {
  id: string;
  name: string;
  color: string;
}

export const genres: Genre[] = [
  { id: 'all', name: 'All', color: 'hsl(141, 76%, 48%)' },
  { id: 'pop', name: 'Pop', color: 'hsl(340, 82%, 52%)' },
  { id: 'hiphop', name: 'Hip Hop', color: 'hsl(45, 93%, 47%)' },
  { id: 'rock', name: 'Rock', color: 'hsl(0, 72%, 51%)' },
  { id: 'electronic', name: 'Electronic', color: 'hsl(270, 76%, 55%)' },
  { id: 'rnb', name: 'R&B', color: 'hsl(200, 89%, 53%)' },
  { id: 'jazz', name: 'Jazz', color: 'hsl(30, 80%, 55%)' },
  { id: 'classical', name: 'Classical', color: 'hsl(180, 55%, 45%)' },
];

export const songs: Song[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Eclipse',
    album: 'Starlight',
    duration: 234,
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    genre: 'pop',
    year: 2024,
    plays: 2500000,
  },
  {
    id: '2',
    title: 'City Lights',
    artist: 'Urban Flow',
    album: 'Concrete Jungle',
    duration: 198,
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
    genre: 'hiphop',
    year: 2024,
    plays: 3200000,
  },
  {
    id: '3',
    title: 'Electric Soul',
    artist: 'Neon Waves',
    album: 'Synthetic Dreams',
    duration: 267,
    cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    genre: 'electronic',
    year: 2023,
    plays: 1800000,
  },
  {
    id: '4',
    title: 'Velvet Skies',
    artist: 'Sophia Rose',
    album: 'Whispers',
    duration: 212,
    cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
    genre: 'rnb',
    year: 2024,
    plays: 4100000,
  },
  {
    id: '5',
    title: 'Thunder Road',
    artist: 'The Voltage',
    album: 'Amplified',
    duration: 289,
    cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop',
    genre: 'rock',
    year: 2023,
    plays: 2900000,
  },
  {
    id: '6',
    title: 'Smooth Operator',
    artist: 'Jazz Collective',
    album: 'Late Night Sessions',
    duration: 345,
    cover: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&h=300&fit=crop',
    genre: 'jazz',
    year: 2024,
    plays: 890000,
  },
  {
    id: '7',
    title: 'Sunrise Symphony',
    artist: 'Orchestra Nova',
    album: 'Dawn',
    duration: 456,
    cover: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop',
    genre: 'classical',
    year: 2023,
    plays: 450000,
  },
  {
    id: '8',
    title: 'Dance Floor',
    artist: 'Beat Masters',
    album: 'Club Nights',
    duration: 223,
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    genre: 'electronic',
    year: 2024,
    plays: 5600000,
  },
  {
    id: '9',
    title: 'Golden Hour',
    artist: 'Amber Keys',
    album: 'Sunset Boulevard',
    duration: 245,
    cover: 'https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?w=300&h=300&fit=crop',
    genre: 'pop',
    year: 2024,
    plays: 7200000,
  },
  {
    id: '10',
    title: 'Street Poetry',
    artist: 'MC Lyrical',
    album: 'Verses',
    duration: 201,
    cover: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=300&h=300&fit=crop',
    genre: 'hiphop',
    year: 2024,
    plays: 4800000,
  },
  {
    id: '11',
    title: 'Ocean Waves',
    artist: 'Coastal Vibes',
    album: 'Seaside',
    duration: 278,
    cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop',
    genre: 'rnb',
    year: 2023,
    plays: 1500000,
  },
  {
    id: '12',
    title: 'Rebel Heart',
    artist: 'Phoenix Rising',
    album: 'Revolution',
    duration: 312,
    cover: 'https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=300&h=300&fit=crop',
    genre: 'rock',
    year: 2024,
    plays: 3400000,
  },
];

export const getTopSongs = (): Song[] => {
  return [...songs].sort((a, b) => b.plays - a.plays).slice(0, 5);
};

export const getSongsByGenre = (genreId: string): Song[] => {
  if (genreId === 'all') return songs;
  return songs.filter(song => song.genre === genreId);
};

export const getSongById = (id: string): Song | undefined => {
  return songs.find(song => song.id === id);
};

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatPlays = (plays: number): string => {
  if (plays >= 1000000) {
    return `${(plays / 1000000).toFixed(1)}M`;
  }
  if (plays >= 1000) {
    return `${(plays / 1000).toFixed(1)}K`;
  }
  return plays.toString();
};

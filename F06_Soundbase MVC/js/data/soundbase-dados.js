// Helper functions

export const formatDuration = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export const formatPlays = (plays) => {
  if (plays >= 1000) return `${(plays / 1000).toFixed(1)}k`;
  return plays.toString();
};

// Catalogue

export const catalogue = [
  { title: 'Blinding Lights',   artist: 'The Weeknd',      duration: 200, genre: 'Pop',        plays: 8400  },
  { title: 'Levitating',        artist: 'Dua Lipa',         duration: 203, genre: 'Pop',        plays: 6200  },
  { title: 'HUMBLE.',           artist: 'Kendrick Lamar',   duration: 177, genre: 'Hip-Hop',    plays: 12500 },
  { title: "God's Plan",        artist: 'Drake',            duration: 198, genre: 'Hip-Hop',    plays: 9800  },
  { title: 'Take Five',         artist: 'Dave Brubeck',     duration: 324, genre: 'Jazz',       plays: 3100  },
  { title: 'So What',           artist: 'Miles Davis',      duration: 565, genre: 'Jazz',       plays: 2400  },
  { title: 'Strobe',            artist: 'deadmau5',         duration: 602, genre: 'Electronic', plays: 5500  },
  { title: 'One More Time',     artist: 'Daft Punk',        duration: 320, genre: 'Electronic', plays: 7100  },
  { title: 'Nights',            artist: 'Frank Ocean',      duration: 307, genre: 'R&B',        plays: 7300  },
  { title: 'Redbone',           artist: 'Childish Gambino', duration: 326, genre: 'R&B',        plays: 4900  },
];

export const GENRES = ['Pop', 'Hip-Hop', 'Jazz', 'Electronic', 'R&B'];
export const VIEWS  = ['cards', 'table'];
export const SORTS = {
  'title-asc': 'Title (A-Z)',
  'plays-desc': 'Most Played',
  'duration-desc': 'Longest Duration',
}
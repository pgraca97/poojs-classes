// Funções auxiliares
const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${secs}`;
};

const formatPlays = (plays) => {
  return plays >= 1000 ? `${(plays / 1000).toFixed(1)}k` : String(plays);
};

const getTrackInfo = (track) => {
  return `${track.title} — ${track.artist} | ${formatDuration(track.duration)} | ${track.genre} | ${formatPlays(track.plays)} plays`;
};

// SoundBase catalogue
const catalogue = [
  { title: "Blinding Lights",   artist: "The Weeknd",       duration: 200, genre: "Pop",     plays: 84000 },
  { title: "HUMBLE.",           artist: "Kendrick Lamar",   duration: 177, genre: "Hip-Hop", plays: 61200 },
  { title: "Peaches",           artist: "Justin Bieber",    duration: 198, genre: "Pop",     plays: 43500 },
  { title: "Autumn Leaves",     artist: "Ahmad Jamal",      duration: 316, genre: "Jazz",    plays: 8700  },
  { title: "Motion Picture",    artist: "Jungle",           duration: 234, genre: "Indie",   plays: 15300 },
  { title: "Good Days",         artist: "SZA",              duration: 279, genre: "R&B",     plays: 29800 },
  { title: "All Falls Down",    artist: "Kanye West",       duration: 214, genre: "Hip-Hop", plays: 37600 },
  { title: "Vienna",            artist: "Billy Joel",       duration: 211, genre: "Pop",     plays: 22100 },
];

// FICHA 1 — Funções e Objetos

// Arrow Functions

// Exercício 1: Reescrever funções base como funções arrow
// Sintaxe completa (com {} e return explícito quando necessário)
const formatDuration = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};

const greetArtist = (name, genre) => {
  console.log(`Welcome to SoundBase, ${name}! Your genre is ${genre}.`);
};

// Return implícito (sem {} nem return)
const isLongTrack = (duration) => duration > 240;

const formatPlays = (plays) =>
  plays >= 1000 ? `${(plays / 1000).toFixed(1)}k` : String(plays);

// Exercício 2: Testar cada função
console.log("--- Exercício 2 ---");
console.log(formatDuration(215)); // "3:35"
console.log(isLongTrack(215)); // false
console.log(isLongTrack(300)); // true
greetArtist("Billie Eilish", "Pop"); // Welcome to SoundBase...
console.log(formatPlays(12500)); // "12.5k"
console.log(formatPlays(800)); // "800"

// Exercício 3: describeTrack com parâmetro por defeito
const describeTrack = (title, artist, genre = "Unknown") =>
  `${title} by ${artist} [${genre}]`;

console.log("--- Exercício 3 ---");
console.log(describeTrack("Blinding Lights", "The Weeknd", "Pop")); // "Blinding Lights by The Weeknd [Pop]"
console.log(describeTrack("Blinding Lights", "The Weeknd")); // "Blinding Lights by The Weeknd [Unknown]"

// Exercício 4: logTracks com parâmetros rest
const logTracks = (...titles) => {
  titles.forEach((title, index) => {
    console.log(`${index + 1}. ${title}`);
  });
};

console.log("--- Exercício 4 ---");
logTracks("Blinding Lights", "Levitating", "Stay");

// Objetos literais com métodos

// Exercícios 5 e 6: objeto track com métodos
const track = {
  title: "Blinding Lights",
  artist: "The Weeknd",
  duration: 200,
  genre: "Pop",
  plays: 8400,
  liked: false,

  // Exercício 6 — métodos
  play() {
    this.plays++;
    console.log(`Now playing: ${this.title} by ${this.artist} (plays: ${this.plays})`);
  },

  like() {
    this.liked = !this.liked;
    if (this.liked) {
      console.log(`${this.title} liked!`);
    } else {
      console.log(`${this.title} unliked.`);
    }
  },

  getInfo() {
    return `${this.title} — ${this.artist} | ${formatDuration(this.duration)} | ${this.genre} | ${formatPlays(this.plays)} plays`;
  },
};

// Exercício 7: Testar métodos
console.log("--- Exercício 7 ---");
track.play();
track.play();
console.log("plays after 2 calls:", track.plays); // 8402
track.like();
track.like();
console.log("liked status after 2 toggles:", track.liked); // false
console.log(track.getInfo());

// Exercício 8: Objeto aninhado + getAlbumInfo
track.album = {
  title: "After Hours",
  year: 2020,
  totalTracks: 14,
};

track.getAlbumInfo = function () {
  console.log(`${this.title} is part of the album ${this.album.title} (${this.album.year}) — ${this.album.totalTracks} tracks`);
};

console.log("--- Exercício 8 ---");
track.getAlbumInfo();

// Exercício 9: for...in
console.log("--- Exercício 9 ---");
for (const key in track) {
  // Excluir funções e objetos aninhados
  if (typeof track[key] !== "function" && typeof track[key] !== "object") {
    console.log(`${key}: ${track[key]}`);
  }
}

// Array de Objetos & Iteração

// Exercício 10: array catalogue
const catalogue = [
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: 200,
    genre: "Pop",
    plays: 15200,
  },
  {
    title: "HUMBLE.",
    artist: "Kendrick Lamar",
    duration: 177,
    genre: "Hip-Hop",
    plays: 22000,
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    duration: 203,
    genre: "Pop",
    plays: 8400,
  },
  {
    title: "Blue in Green",
    artist: "Miles Davis",
    duration: 337,
    genre: "Jazz",
    plays: 3100,
  },
  {
    title: "Strobe",
    artist: "deadmau5",
    duration: 600,
    genre: "Electronic",
    plays: 11500,
  },
  {
    title: "Black Dog",
    artist: "Led Zeppelin",
    duration: 295,
    genre: "Rock",
    plays: 9800,
  },
];

// Exercício 11: getTrackInfo independente + forEach
const getTrackInfo = (track) =>
  `${track.title} — ${track.artist} | ${formatDuration(track.duration)} | ${track.genre} | ${formatPlays(track.plays)} plays`;

console.log("--- Exercício 11 ---");
catalogue.forEach((t) => console.log(getTrackInfo(t)));

// Exercício 12: for...of — apenas faixas com > 10k reproduções
console.log("--- Exercício 12 ---");
for (const t of catalogue) {
  if (t.plays > 10000) {
    console.log(`${t.title} — ${formatPlays(t.plays)} plays`);
  }
}

// Exercício 13: push + shift
console.log("--- Exercício 13 ---");
catalogue.push(
  {
    title: "Redbone",
    artist: "Childish Gambino",
    duration: 325,
    genre: "R&B",
    plays: 7600,
  },
  {
    title: "Everlong",
    artist: "Foo Fighters",
    duration: 250,
    genre: "Rock",
    plays: 6200,
  },
);
catalogue.shift(); // remove "Blinding Lights"
console.log("Catálogo após push + shift:");
catalogue.forEach((t) => console.log(" -", t.title));

// Exercício 14: duração total com forEach
console.log("--- Exercício 14 ---");

const totalSeconds = catalogue.reduce((totalDuration, t) => totalDuration + t.duration, 0);

console.log(`Total catalogue duration: ${formatDuration(totalSeconds)}`);

// Exercício integrador

// Exercícios 15 e 16: objeto playlist com métodos
const playlist = {
  name: "Late Night Vibes",
  createdBy: "mina_le6",
  tracks: [],

  addTrack(track) {
    this.tracks.push(track);
    console.log(`${track.title} added to ${this.name}.`);
  },

  removeTrack(title) {
    let found = false;
    for (let i = 0; i < this.tracks.length; i++) {
      if (this.tracks[i].title === title) {
        this.tracks.splice(i, 1);
        console.log(`${title} removed from ${this.name}.`);
        found = true;
        break;
      }
    }
    if (!found) console.log("Track not found.");
  },

  getTotalDuration() {
    let total = 0;
    this.tracks.forEach((t) => {
      total += t.duration;
    });
    return `Total: ${formatDuration(total)}`;
  },

  getMostPlayed() {
    let most = null;
    for (const t of this.tracks) {
      if (most === null || t.plays > most.plays) {
        most = t;
      }
    }
    if (most) console.log(getTrackInfo(most));
    return most;
  },

  printAll() {
    console.log(`${this.name} — by ${this.createdBy}`);
    this.tracks.forEach((t) => console.log(getTrackInfo(t)));
  },
};

// Exercício 17: Testar playlist
console.log("--- Exercício 17 ---");
playlist.addTrack(catalogue[0]);
playlist.addTrack(catalogue[1]);
playlist.addTrack(catalogue[2]);

playlist.printAll();

playlist.removeTrack(catalogue[1].title);
playlist.printAll();

console.log(playlist.getTotalDuration());
playlist.getMostPlayed();

// DESAFIOS

// Desafio 1 (alínea 18): getByGenre
playlist.getByGenre = function (genre) {
  const result = this.tracks.filter((t) => t.genre === genre);

  if (result.length === 0) {
    console.log(`No tracks found for genre: ${genre}`);
    return;
  }

  result.forEach((r) => console.log(getTrackInfo(r)));
};

console.log("--- Desafio 1 ---");
playlist.getByGenre("Pop");
playlist.getByGenre("Jazz");

// Desafio 2 (alínea 19): summarise com parâmetros rest
const summarise = (...tracks) => {
  const total = tracks.reduce((acc, t) => acc + t.duration, 0);
  const longest = tracks.toSorted((a, b) => b.duration - a.duration)[0];

  console.log(`Summary: ${tracks.length} tracks | Total: ${formatDuration(total)} | Longest: ${longest.title} (${formatDuration(longest.duration)})`);
};

console.log("--- Desafio 2 ---");
summarise(catalogue[0], catalogue[1], catalogue[2]);

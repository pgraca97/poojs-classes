// F04 - Classes e Herança

// A Classe Track

class Track {
  // Desafio 1: campo estático privado para contagem de instâncias
  static #count = 0;
  #id;

  // Exercício 4: campos privados
  #plays;
  #liked;

  constructor(title, artist, duration, genre) {
    // Desafio 1: id único crescente
    this.#id = Track.#count++;

    this.title = title;
    this.artist = artist;
    this.duration = duration;
    this.genre = genre;
    this.#plays = 0;
    this.#liked = false;
  }

  // Exercício 4: getters para campos privados

  get plays() {
    return this.#plays;
  }

  get liked() {
    return this.#liked;
  }

  // Desafio 1: expõe id da instância e total de instâncias criadas

  get id() {
    return this.#id;
  }

  static get count() {
    return Track.#count;
  }

  // Exercício 5: setter com validação

  set plays(value) {
    if (value < 0) {
      console.log("Erro: o número de plays não pode ser negativo.");
      return;
    }
    this.#plays = value;
  }

  // Exercício 3: métodos de instância

  play() {
    this.#plays++;
    console.log(
      `Now playing: ${this.title} by ${this.artist} (plays: ${this.#plays})`,
    );
  }

  like() {
    this.#liked = !this.#liked;
    console.log(
      this.#liked ? `${this.title} liked!` : `${this.title} unliked.`,
    );
  }

  getInfo() {
    return `${this.title} — ${this.artist} | ${formatDuration(this.duration)} | ${this.genre} | ${formatPlays(this.#plays)} plays`;
  }

  // Exercício 6: compara duas tracks pelo número de plays; null se iguais

  static compare(a, b) {
    if (a.plays === b.plays) return null;
    return a.plays > b.plays ? a : b;
  }

  // Exercício 7: cria uma Track a partir de um objeto literal

  static fromObject(obj) {
    return new Track(obj.title, obj.artist, obj.duration, obj.genre);
  }
}

// Exercício 2

console.log("--- Exercício 2 ---");
const t1 = new Track("Blinding Lights", "The Weeknd", 200, "Pop");
const t2 = new Track("HUMBLE.", "Kendrick Lamar", 177, "Hip-Hop");
const t3 = new Track("Autumn Leaves", "Ahmad Jamal", 316, "Jazz");

console.log(t1);
console.log(t2);
console.log(t3);

// Exercício 3

console.log("--- Exercício 3 ---");
t1.play();
t1.like();
t1.like();
console.log(t1.getInfo());

// Exercício 4

console.log("--- Exercício 4 ---");
// console.log(t1.#plays); // SyntaxError: private field '#plays' must be declared in an enclosing class
console.log(t1.plays); // via getter -> 1
console.log(t1.liked); // via getter -> false

// Exercício 5

console.log("--- Exercício 5 ---");
t1.plays = -10; // "Erro: o número de plays não pode ser negativo."
t1.plays = 500;
console.log(t1.plays); // 500

// Métodos Estáticos

// Exercício 6

console.log("--- Exercício 6 ---");
console.log(Track.compare(t1, t2)); // t1 (500 plays vs 0)
console.log(Track.compare(t2, t3)); // null (ambos com 0 plays)

// Exercício 7

console.log("--- Exercício 7 ---");
const t4 = Track.fromObject(catalogue[0]);
console.log(t4.getInfo());

// A Classe Playlist

// Exercício 8

class Playlist {
  #tracks = [];

  constructor(name, createdBy) {
    this.name = name;
    this.createdBy = createdBy;
  }

  // Exercício 10: número de faixas
  get size() {
    return this.#tracks.length;
  }

  add(track) {
    this.#tracks.push(track);
    console.log(`${track.title} added to ${this.name}.`);
  }

  remove(title) {
    const index = this.#tracks.findIndex((t) => t.title === title);
    if (index === -1) {
      console.log("Track not found.");
      return;
    }
    const removed = this.#tracks.splice(index, 1)[0];
    console.log(`${removed.title} removed.`);
  }

  getTotalDuration() {
    const total = this.#tracks.reduce((acc, t) => acc + t.duration, 0);
    return `Total: ${formatDuration(total)}`;
  }

  getMostPlayed() {
    if (this.#tracks.length === 0) return null;
    return this.#tracks.reduce((most, track) =>
      track.plays > most.plays ? track : most,
    );
  }

  printAll() {
    console.log(`${this.name} — by ${this.createdBy}`);
    this.#tracks.forEach((track) => console.log(track.getInfo()));
  }

  // Desafio 2: filtra por género
  getByGenre(genre) {
    const results = this.#tracks.filter((t) => t.genre === genre);
    if (results.length === 0) {
      console.log(`No tracks found for genre: ${genre}`);
      return [];
    }
    results.forEach((track) => console.log(track.getInfo()));
    return results;
  }
}

// Exercícios 9 e 10

console.log("--- Exercícios 9 e 10 ---");
const playlist = new Playlist("Late Night Vibes", "mina_le6");

playlist.add(t1);
playlist.add(t2);
playlist.add(t3);

playlist.printAll();
console.log(playlist.getTotalDuration());
console.log(playlist.getMostPlayed().getInfo());
console.log(playlist.size); // 3

playlist.remove("HUMBLE.");
playlist.remove("Levitating"); // "Track not found."
console.log(playlist.size); // 2

// Herança

// Exercício 11

class PodcastEpisode extends Track {
  constructor(title, host, duration, episode) {
    // super() tem de ser a primeira instrução
    super(title, host, duration, "Podcast");
    this.episode = episode;
  }

  // Exercício 12: override de getInfo()
  getInfo() {
    return `Ep. ${this.episode} — ${this.title} | hosted by ${this.artist} | ${formatDuration(this.duration)}`;
  }
}

// Exercício 13

console.log("--- Exercício 13 ---");
const ep1 = new PodcastEpisode("Deep Dive into AI", "Lex Fridman", 4965, 12);
const ep2 = new PodcastEpisode("The Future of the Web", "Syntax FM", 3120, 7);

const mixedPlaylist = new Playlist("Mixed Feed", "mina_le6");
mixedPlaylist.add(t1);
mixedPlaylist.add(ep1);
mixedPlaylist.add(ep2);

// getInfo() sobrescrito é chamado corretamente para cada tipo
mixedPlaylist.printAll();

// Desafios

// Desafio 1

console.log("--- Desafio 1 ---");
const d1 = new Track("Vienna", "Billy Joel", 211, "Pop");
const d2 = new Track("Good Days", "SZA", 279, "R&B");

console.log(d1.id); // id único
console.log(d2.id); // d1.id + 1
console.log(Track.count); // total de instâncias criadas

// Desafio 2

console.log("--- Desafio 2 ---");
const genrePlaylist = new Playlist("Genre Test", "mina_le6");
genrePlaylist.add(Track.fromObject(catalogue[0])); // Pop
genrePlaylist.add(Track.fromObject(catalogue[1])); // Hip-Hop
genrePlaylist.add(Track.fromObject(catalogue[2])); // Pop
genrePlaylist.add(Track.fromObject(catalogue[3])); // Jazz

genrePlaylist.getByGenre("Pop"); // 2 resultados
genrePlaylist.getByGenre("Jazz"); // 1 resultado
genrePlaylist.getByGenre("Indie"); // "No tracks found for genre: Indie"

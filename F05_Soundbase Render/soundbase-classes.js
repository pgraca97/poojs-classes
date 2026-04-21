// Track

class Track {
  // Private fields
  #id;
  #plays;
  #liked;

  constructor(title, artist, duration, genre) {
    this.#id = crypto.randomUUID();
    this.title = title;
    this.artist = artist;
    this.duration = duration;
    this.genre = genre;
    this.#plays = 0;
    this.#liked = false;
  }

  // Getters
  get id() {
    return this.#id;
  }
  get plays() {
    return this.#plays;
  }
  get liked() {
    return this.#liked;
  }

  // Setter with validation
  set plays(value) {
    if (value < 0) {
      console.log("Error: plays cannot be negative.");
      return;
    }
    this.#plays = value;
  }

  // Instance methods
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

  // Static methods
  static compare(a, b) {
    if (a.plays === b.plays) return null;
    return a.plays > b.plays ? a : b;
  }

  static fromObject(obj) {
    return new Track(obj.title, obj.artist, obj.duration, obj.genre);
  }
}

// Playlist

class Playlist {
  #tracks;

  constructor(name, createdBy) {
    this.name = name;
    this.createdBy = createdBy;
    this.#tracks = [];
  }

  get size() {
    return this.#tracks.length;
  }

  add(track) {
    this.#tracks.push(track);
    console.log(`${track.title} added to ${this.name}.`);
  }

  has(track) {
    return this.#tracks.some((t) => t.id === track.id);
  }

  remove(title) {
    const index = this.#tracks.findIndex((t) => t.title === title);
    if (index === -1) {
      console.log("Track not found.");
      return;
    }
    const [removed] = this.#tracks.splice(index, 1);
    console.log(`${removed.title} removed.`);
  }

  getTotalDuration() {
    let total = 0;
    this.#tracks.forEach((t) => (total += t.duration));
    return `Total: ${formatDuration(total)}`;
  }

  getMostPlayed() {
    let most = this.#tracks[0];
    for (const t of this.#tracks) {
      if (t.plays > most.plays) most = t;
    }
    return most;
  }

  printAll() {
    console.log(`${this.name} — by ${this.createdBy}`);
    this.#tracks.forEach((t) => console.log(t.getInfo()));
  }

  getInfo() {
    return `${this.name} by ${this.createdBy} | ${this.#tracks.length} tracks | ${this.getTotalDuration()}`;
  }
}

// PodcastEpisode

class PodcastEpisode extends Track {
  constructor(title, host, duration, episode) {
    super(title, host, duration, "Podcast");
    this.episode = episode;
  }

  getInfo() {
    return `Ep. ${this.episode} — ${this.title} | hosted by ${this.artist} | ${formatDuration(this.duration)}`;
  }
}

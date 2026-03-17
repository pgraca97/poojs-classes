// soundbase-dados.js é carregado antes deste ficheiro em index.html
// catalogue, formatDuration, formatPlays e getTrackInfo estão disponíveis globalmente

// filter

// Exercício 1 — Filtrar por género "Pop"
const popTracks = catalogue.filter((track) => track.genre === "Pop");
popTracks.forEach((track) => console.log(getTrackInfo(track)));
console.log("Comprimento do catálogo antes:", catalogue.length);
console.log("Comprimento do catálogo depois:", catalogue.length); // inalterado

// Exercício 2 — Filtrar por plays > 10 000
const popularTracks = catalogue.filter((track) => track.plays > 10000);
console.log(`Faixas populares: ${popularTracks.length}`);

// Exercício 3 — Função de filtro reutilizável
const getByGenre = (catalogue, genre) =>
  catalogue.filter((track) => track.genre === genre);

console.log(getByGenre(catalogue, "Jazz").map(getTrackInfo));
console.log(getByGenre(catalogue, "Indie").map(getTrackInfo));
console.log(getByGenre(catalogue, "Classical")); // []

// map

// Exercício 4 — Extrair títulos
const trackTitles = catalogue.map((track) => track.title);
console.log(trackTitles);

// Exercício 5 — Strings de resumo formatadas
const trackSummaries = catalogue.map(
  (track) =>
    `${track.title} — ${track.artist} (${formatDuration(track.duration)})`,
);
trackSummaries.forEach((summary) => console.log(summary));

// Exercício 6 — Catálogo reduzido (título + artista)
const liteCatalogue = catalogue.map(({ title, artist }) => ({ title, artist }));
console.log(liteCatalogue);

// find e findIndex

// Exercício 7 — Encontrar a primeira faixa de Jazz
const jazzTrack = catalogue.find((track) => track.genre === "Jazz");
if (!jazzTrack) {
  console.log("Nenhuma faixa de Jazz encontrada.");
} else {
  console.log(jazzTrack.title);
}

// Exercício 8 — Encontrar por título exato
const findByTitle = (catalogue, title) =>
  catalogue.find((track) => track.title === title) ?? null;

console.log(findByTitle(catalogue, "Vienna")); // objeto
console.log(findByTitle(catalogue, "Nonexistent")); // null

// Exercício 9 — findIndex + mutação direta
const idx = catalogue.findIndex((track) => track.title === "Good Days");
if (idx !== -1) {
  catalogue[idx].plays += 1000;
  console.log(catalogue[idx]);
}

// sort

// Exercício 10 — Ordenar por plays descendente (sort muta — copiar primeiro)
const byPlaysDesc = [...catalogue].sort((a, b) => b.plays - a.plays);
byPlaysDesc.forEach((track) => console.log(`${track.title} — ${track.plays}`));

// Exercício 11 — Ordenar por título A → Z
const byTitleAsc = [...catalogue].sort((a, b) =>
  a.title.localeCompare(b.title),
);
byTitleAsc.forEach((track) => console.log(track.title));

// Exercício 12 — Ordenar por duração ascendente, devolver novo array
const sortByDuration = (catalogue) =>
  [...catalogue].sort((a, b) => a.duration - b.duration);

console.log(sortByDuration(catalogue).map(getTrackInfo));

// Exercícios integradores

// Exercício 13 — Pesquisa por título ou artista (case-insensitive)
const searchTracks = (catalogue, query) => {
  const q = query.toLowerCase();
  return catalogue.filter(
    (track) =>
      track.title.toLowerCase().includes(q) ||
      track.artist.toLowerCase().includes(q),
  );
};

searchTracks(catalogue, "the").forEach((track) =>
  console.log(getTrackInfo(track)),
);
console.log(searchTracks(catalogue, "zzz")); // []

// Exercício 14 — Top N faixas de um género, ordenadas por plays
const getTopTracks = (catalogue, genre, n) =>
  catalogue
    .filter((track) => track.genre === genre)
    .sort((a, b) => b.plays - a.plays)
    .slice(0, n);

getTopTracks(catalogue, "Pop", 3).forEach((track) =>
  console.log(getTrackInfo(track)),
);

// Desafios

// Exercício 15 — Total de plays com reduce
const totalPlays = catalogue.reduce((acc, track) => acc + track.plays, 0);
console.log(`Total plays: ${totalPlays.toLocaleString("pt-PT")}`);

// Exercício 16 — Encadeamento filter + map + sort
const hiphopTitles = catalogue
  .filter((track) => track.genre === "Hip-Hop")
  .map((track) => track.title)
  .sort((a, b) => a.localeCompare(b));

console.log(hiphopTitles);

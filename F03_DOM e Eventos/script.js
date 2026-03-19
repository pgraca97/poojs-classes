// Referências aos elementos do DOM

const appTitle = document.getElementById("app-title");
const trackCountEl = document.getElementById("track-count");
const searchInput = document.getElementById("search-input");
const trackList = document.getElementById("track-list");
const form = document.getElementById("add-track-form");

// Exercício 1

appTitle.textContent = "SoundBase";

// Ambos os seletores referem o mesmo elemento
const appTitleQS = document.querySelector("#app-title");
console.log(appTitleQS.textContent);

// Exercício 2

trackCountEl.textContent = `${catalogue.length} faixas disponíveis`;

// Exercício 3

searchInput.setAttribute("placeholder", "Pesquisar por título ou artista…");
console.log(searchInput.getAttribute("placeholder"));

// Exercício 4

// Atenção: innerHTML interpreta o valor como HTML. Se o título ou artista
// contiver código como <img src=x onerror="alert(1)">, o browser executa-o.
// Isto chama-se XSS (Cross-Site Scripting). Uma alternativa segura está comentada abaixo.

const renderTrack = (track) => `
  <div class="track-card" data-title="${track.title}">
    <h3>${track.title}</h3>
    <p>${track.artist} · ${track.genre} · ${formatDuration(track.duration)}</p>
    <p class="plays">${track.plays.toLocaleString("pt-PT")} plays</p>
    <button class="btn-like">♡ Like</button>
    <button class="btn-remove">Remover</button>
  </div>
`;

// Alternativa segura: createElement + textContent em vez de innerHTML.
// textContent e dataset tratam o valor como texto simples - nunca como HTML.
//
// const renderTrackSafe = (track) => {
//   const card = document.createElement("div");
//   card.className = "track-card";
//   card.dataset.title = track.title;
//
//   const h3 = document.createElement("h3");
//   h3.textContent = track.title;
//
//   const info = document.createElement("p");
//   info.textContent = `${track.artist} · ${track.genre} · ${formatDuration(track.duration)}`;
//
//   const plays = document.createElement("p");
//   plays.className = "plays";
//   plays.textContent = `${track.plays.toLocaleString("pt-PT")} plays`;
//
//   const btnLike = document.createElement("button");
//   btnLike.className = "btn-like";
//   btnLike.textContent = "♡ Like";
//
//   const btnRemove = document.createElement("button");
//   btnRemove.className = "btn-remove";
//   btnRemove.textContent = "Remover";
//
//   card.append(h3, info, plays, btnLike, btnRemove);
//   return card;
// };

// Exercício 5

const renderCatalogue = (tracks) => {
  trackList.innerHTML = tracks.map(renderTrack).join("");
  trackCountEl.textContent = `${tracks.length} faixas disponíveis`;
};

// Com renderTrackSafe, renderCatalogue ficaria:
// const renderCatalogue = (tracks) => {
//   trackList.replaceChildren(...tracks.map(renderTrackSafe));
//   trackCountEl.textContent = `${tracks.length} faixas disponíveis`;
// };

renderCatalogue(catalogue);

// Estado partilhado entre os handlers de pesquisa e de filtro por género.
// Permite combinar os dois filtros sem que um sobreponha o outro.

let activeGenre = "all";
let searchQuery = "";

const getFiltered = () =>
  catalogue
    .filter(
      (t) =>
        !searchQuery ||
        t.title.toLowerCase().includes(searchQuery) ||
        t.artist.toLowerCase().includes(searchQuery),
    )
    .filter((t) => activeGenre === "all" || t.genre === activeGenre);

// Exercício 6 e 12

searchInput.addEventListener("input", (event) => {
  searchQuery = event.target.value.toLowerCase();
  renderCatalogue(getFiltered());
});

// Exercício 7 e 8

trackList.addEventListener("click", (event) => {
  const card = event.target.closest(".track-card");
  if (!card) return;

  const title = card.dataset.title;

  // Exercício 7
  if (event.target.classList.contains("btn-like")) {
    console.log(`Like clicado: ${title}`);

    // Desafio - toggle de like (alínea 13)
    const btn = event.target;
    const liked = btn.dataset.liked === "true";
    btn.dataset.liked = !liked;
    btn.textContent = liked ? "♡ Like" : "♥ Liked";
    btn.classList.toggle("liked", !liked);
  }

  // Exercício 8
  if (event.target.classList.contains("btn-remove")) {
    console.log(`Remover clicado: ${title}`);
    card.remove();

    const index = catalogue.findIndex((track) => track.title === title);
    if (index !== -1) {
      catalogue.splice(index, 1);
    }

    const remaining = trackList.querySelectorAll(".track-card").length;
    trackCountEl.textContent = `${remaining} faixas disponíveis`;
  }
});

// Exercício 9, 10 e 11

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("form-title").value.trim();
  const artist = document.getElementById("form-artist").value.trim();
  const duration = parseInt(document.getElementById("form-duration").value);
  const genre = document.getElementById("form-genre").value.trim();

  console.log("Dados do formulário:", { title, artist, duration, genre });

  // Exercício 10 - validação
  if (!title || !artist || isNaN(duration) || duration <= 0) {
    console.log("Formulário inválido.");
    return;
  }

  // Exercício 11 - criar faixa, adicionar ao catálogo e re-renderizar
  const newTrack = { title, artist, duration, genre, plays: 0 };
  catalogue.push(newTrack);
  renderCatalogue(getFiltered());
  form.reset();
});

// Desafio - botões de filtro por género (alínea 14)

const genreFilters = document.getElementById("genre-filters");

genreFilters.addEventListener("click", (event) => {
  genreFilters
    .querySelectorAll(".btn-filter")
    .forEach((btn) => btn.classList.remove("active"));

  event.target.classList.add("active");
  activeGenre = event.target.dataset.genre;
  renderCatalogue(getFiltered());
});

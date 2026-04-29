import Track from "../models/Track.js";
import Playlist from "../models/Playlist.js";
import { catalogue, GENRES, VIEWS, SORTS } from "../data/soundbase-dados.js";
import {
  renderCards,
  renderTable,
  showModal,
  hideModal,
  renderPlaylist,
  renderEmptyState,
  setActiveView,
  renderRecentlyPlayed,
  renderFilterButtons,
  renderViewButtons,
  renderSortOptions,
  bindFilterChange,
  bindViewChange,
  bindSortChange,
  bindSearchSubmit,
  bindSearchInput,
  bindCardActions,
  bindModalClose,
} from "../views/soundbase-view.js";

// State

let tracks = [];
let myPlaylist;
let currentFilter = "all";
let currentView = "cards";
let currentSort = "default";
let currentSearch = "";
let recentlyPlayed = []; // Desafio

// Private: filter + search + sort

const getFilteredTracks = () => {
  let result = tracks.filter(
    (t) => currentFilter === "all" || t.genre === currentFilter,
  );

  if (currentSearch) {
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(currentSearch) ||
        t.artist.toLowerCase().includes(currentSearch),
    );
  }

  return result.toSorted((a, b) => {
    if (currentSort === "title-asc") return a.title.localeCompare(b.title);
    if (currentSort === "plays-desc") return b.plays - a.plays;
    if (currentSort === "duration-desc") return b.duration - a.duration;
    return 0;
  });
};

// Private: render active view

const render = () => {
  const filtered = getFilteredTracks();

  setActiveView(currentView);

  if (filtered.length === 0) {
    renderEmptyState("No tracks found.", currentView);
    return;
  }

  currentView === "cards" ? renderCards(filtered) : renderTable(filtered);
};

// Desafio: Recently Played

const addToRecentlyPlayed = (track) => {
  if (recentlyPlayed[0]?.id === track.id) return;
  recentlyPlayed = [track, ...recentlyPlayed].slice(0, 5);
  renderRecentlyPlayed(recentlyPlayed);
};

// Desafio: URL params

// replaceState actualiza o URL sem adicionar entrada ao histórico (sem novo item no back/forward)
const syncURL = () => {
  const params = new URLSearchParams();

  if (currentFilter !== "all") params.set("genre", currentFilter);
  if (currentSearch) params.set("q", currentSearch);
  if (currentView !== "cards") params.set("view", currentView);
  if (currentSort !== "default") params.set("sort", currentSort);

  history.replaceState(null, "", `?${params.toString()}`);
};

// Lê o URL antes de registar os event listeners; inicializa o estado com o que estava guardado
const readURL = () => {
  const params = new URLSearchParams(window.location.search);

  const genre = params.get("genre");
  const view = params.get("view");
  const q = params.get("q");
  const sort = params.get("sort");

  // genre, view e sort validam contra valores conhecidos - valores inválidos no URL são ignorados
  if (genre && GENRES.includes(genre)) currentFilter = genre;
  if (view && VIEWS.includes(view)) currentView = view;
  if (params.has("q")) currentSearch = q; // q aceita qualquer string; has() em vez de if(q) para não ignorar uma pesquisa vazia
  if (sort && Object.keys(SORTS).includes(sort)) currentSort = sort;
};

// Única exportação deste módulo: o Controller encapsula o estado; app.js só precisa de arrancar
export const init = () => {
  tracks = catalogue.map((obj) => Track.fromObject(obj));
  myPlaylist = new Playlist("My Playlist", "soundbase_user");

  readURL();
  syncURL();

  renderFilterButtons(currentFilter);
  renderViewButtons(currentView);
  renderSortOptions(currentSort);

  // O Controller passa a sua própria lógica como callback.
  // A View regista o evento e devolve um valor limpo - nunca conhece o estado da aplicação.
  bindFilterChange((genre) => {
    currentFilter = genre;
    syncURL();
    render();
  });

  bindViewChange((view) => {
    currentView = view;
    syncURL();
    render();
  });

  bindSortChange((sort) => {
    currentSort = sort;
    syncURL();
    render();
  });

  bindSearchSubmit((query) => {
    currentSearch = query;
    syncURL();
    render();
  });

  bindSearchInput((query) => {
    currentSearch = query;
    syncURL();
    render();
  });

  bindCardActions(({ action, id }) => {
    const track = tracks.find((t) => t.id === id);
    if (!track) return;

    if (action === "details") showModal(track);

    if (action === "play") {
      track.play();
      addToRecentlyPlayed(track);
    }

    if (action === "add") {
      let shouldAdd = true;
      if (myPlaylist.has(track)) {
        shouldAdd = confirm(
          `A faixa "${track.title}" já está na playlist. Adicionar duplicado?`,
        );
      }
      if (shouldAdd) {
        myPlaylist.add(track);
        renderPlaylist(myPlaylist);
      }
    }
  });

  bindModalClose(hideModal);

  render();
  renderPlaylist(myPlaylist);
};

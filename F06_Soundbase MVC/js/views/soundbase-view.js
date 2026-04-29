import {
  formatDuration,
  formatPlays,
  GENRES,
  VIEWS,
  SORTS
} from "../data/soundbase-dados.js";

// DOM selectors

const catalogueGrid = document.getElementById("catalogue-grid");
const catalogueTable = document.getElementById("catalogue-table-container");
const modalContent = document.getElementById("modal-content");
const modalOverlay = document.getElementById("modal-overlay");
const playlistInfo = document.getElementById("playlist-info");
const recentlyPlayedEl = document.getElementById("recently-played");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("btn-search");
const filterControls = document.getElementById("filter-controls");
const viewControls = document.getElementById("view-controls");
const sortControls = document.getElementById("sort-controls");

// Cards

const renderCard = (track) => `
  <div class="track-card" data-id="${track.id}">
    <div class="card-header">
      <h3>${track.title}</h3>
      <span class="genre-tag">${track.genre}</span>
    </div>
    <p class="artist">${track.artist}</p>
    <p class="meta">${formatDuration(track.duration)} · ${formatPlays(track.plays)} plays</p>
    <div class="card-actions">
      <button class="btn-play" data-id="${track.id}" aria-label="Play ${track.title}">Play</button>
      <button class="btn-details" data-id="${track.id}" aria-label="Details for ${track.title}">Details</button>
      <button class="btn-add" data-id="${track.id}" aria-label="Add ${track.title} to playlist">Add</button>
    </div>
  </div>
`;

export const renderCards = (tracks) => {
  catalogueGrid.innerHTML = tracks.map((t) => renderCard(t)).join("");
};

// Table

const renderRow = (track) => `
  <tr data-id="${track.id}">
    <td>${track.title}</td>
    <td>${track.artist}</td>
    <td>${track.genre}</td>
    <td>${formatDuration(track.duration)}</td>
    <td>${formatPlays(track.plays)}</td>
  </tr>
`;

export const renderTable = (tracks) => {
  catalogueTable.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Artist</th>
          <th>Genre</th>
          <th>Duration</th>
          <th>Plays</th>
        </tr>
      </thead>
      <tbody>
        ${tracks.map((t) => renderRow(t)).join("")}
      </tbody>
    </table>
  `;
};

// Active view

export const setActiveView = (view) => {
  catalogueGrid.classList.toggle("hidden", view !== "cards");
  catalogueTable.classList.toggle("hidden", view === "cards");
};

// Modal

const renderModal = (track) => `
  <div class="modal-card">
    <button class="btn-close" aria-label="Close modal">✕</button>
    <h2>${track.title}</h2>
    <p>Artist: ${track.artist}</p>
    <p>Genre: ${track.genre}</p>
    <p>Duration: ${formatDuration(track.duration)}</p>
    <p>Plays: ${formatPlays(track.plays)}</p>
    <p>Liked: ${track.liked ? "Yes" : "No"}</p>
  </div>
`;

export const showModal = (track) => {
  modalContent.innerHTML = renderModal(track);
  modalOverlay.classList.remove("hidden");
};

export const hideModal = () => {
  modalOverlay.classList.add("hidden");
};

// Playlist

export const renderPlaylist = (playlist) => {
  playlistInfo.classList.toggle("hidden", playlist.size === 0);
  playlistInfo.innerHTML = playlist.getInfo();
};

// Empty state

export const renderEmptyState = (message, view) => {
  const emptyHTML = `
    <div class="empty-state">
      <p>${message}</p>
    </div>
  `;

  if (view === "cards") {
    catalogueGrid.innerHTML = emptyHTML;
    catalogueTable.innerHTML = "";
    return;
  }

  catalogueTable.innerHTML = emptyHTML;
  catalogueGrid.innerHTML = "";
};

// Active button

export const setActiveButton = (container, activeBtn) => {
  container.querySelector("button.active")?.classList.remove("active");
  activeBtn.classList.add("active");
};

// Filter buttons

export const renderFilterButtons = (activeFilter) => {
  filterControls.innerHTML = `
    <button class="btn-filter ${activeFilter === "all" ? "active" : ""}" data-genre="all">All</button>
    ${GENRES.map(
      (g) => `
      <button class="btn-filter ${activeFilter === g ? "active" : ""}" data-genre="${g}">${g}</button>
    `,
    ).join("")}
  `;
};

// View buttons

export const renderViewButtons = (activeView) => {
  viewControls.innerHTML = `
    ${VIEWS.map(
      (v) => `
      <button class="btn-view ${v === activeView ? "active" : ""}" data-view="${v}">
        ${v.charAt(0).toUpperCase() + v.slice(1)}
      </button>
    `,
    ).join("")}
  `;
};

// Sort options

export const renderSortOptions = (activeSort) => {
  sortControls.innerHTML = `
    <option value="default">Default order</option>
    ${Object.entries(SORTS)
      .map(
        ([val, label]) => `
      <option value="${val}" ${val === activeSort ? "selected" : ""}>
        ${label}
      </option>
    `,
      )
      .join("")}
  `;
};

// Search input

const getSearchQuery = () => searchInput.value.trim().toLowerCase();

// Event bindings
// Cada bind* recebe um callback do Controller, invoca-o com um valor limpo (genre, query, etc.)
// e nunca acede ao estado da aplicação - a View não sabe o que acontece a seguir.

export const bindFilterChange = (handler) => {
  filterControls.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btn-filter")) return;
    setActiveButton(filterControls, e.target);
    handler(e.target.dataset.genre);
  });
};

export const bindViewChange = (handler) => {
  viewControls.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btn-view")) return;
    setActiveButton(viewControls, e.target);
    handler(e.target.dataset.view);
  });
};

export const bindSortChange = (handler) => {
  sortControls.addEventListener("change", (e) => {
    handler(e.target.value);
  });
};

export const bindSearchSubmit = (handler) => {
  searchBtn.addEventListener("click", () => {
    handler(getSearchQuery());
  });
};

export const bindSearchInput = (handler) => {
  // "input" só reage quando o campo fica vazio - permite limpar a pesquisa em tempo real
  // sem invocar o handler em cada tecla; a pesquisa efectiva faz-se via Enter ou botão
  searchInput.addEventListener("input", (e) => {
    if (!e.currentTarget.value) handler("");
  });
  searchInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    handler(getSearchQuery());
  });
};

export const bindCardActions = (handler) => {
  catalogueGrid.addEventListener("click", (e) => {
    const id = e.target.dataset?.id;
    if (!id) return;

    if (e.target.classList.contains("btn-details")) handler({ action: "details", id });
    if (e.target.classList.contains("btn-play")) handler({ action: "play", id });
    if (e.target.classList.contains("btn-add")) handler({ action: "add", id });
  });
};

export const bindModalClose = (handler) => {
  modalOverlay.addEventListener("click", (e) => {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains("btn-close")
    )
      handler();
  });
};

// Recently Played (Desafio)

export const renderRecentlyPlayed = (tracks) => {
  if (tracks.length === 0) {
    recentlyPlayedEl.classList.add("hidden");
    return;
  }
  recentlyPlayedEl.classList.remove("hidden");
  recentlyPlayedEl.innerHTML = `
    <h3>Recently Played</h3>
    <ul>
      ${tracks.map((t) => `<li>${t.title} - ${t.artist}</li>`).join("")}
    </ul>
  `;
};

const tracks = catalogue.map((t) => Track.fromObject(t));

console.log(tracks[9].getInfo());

const myPlaylist = new Playlist("My Playlist", "soundbase_user");

console.log(myPlaylist.size);

// Selectors

const catalogueGrid = document.getElementById("catalogue-grid");
const catalogueTable = document.getElementById("catalogue-table-container");
const filterControls = document.getElementById("filter-controls");
const viewControls = document.getElementById("view-controls");
const modalContent = document.getElementById("modal-content");
const modalOverlay = document.getElementById("modal-overlay");
const sortControls = document.getElementById("sort-controls");
const playlistInfo = document.getElementById("playlist-info");

// Render Helpers

const renderCard = (track) => {
  return `
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
};

const renderCards = (tracks) => {
  catalogueGrid.innerHTML = tracks.map((t) => renderCard(t)).join("");
};

const renderRow = (track) => {
  return `
    <tr data-id="${track.id}">
      <td>${track.title}</td>
      <td>${track.artist}</td>
      <td>${track.genre}</td>
      <td>${formatDuration(track.duration)}</td>
      <td>${formatPlays(track.plays)}</td>
    </tr>
  `;
};

const renderTable = (tracks) => {
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

const renderModal = (track) => {
  return `<div class="modal-card">
 <button class="btn-close" aria-label="Close modal">✕</button>
 <h2>${track.title}</h2>
 <p>Artist: ${track.artist}</p>
 <p>Genre: ${track.genre}</p>
 <p>Duration: ${formatDuration(track.duration)}</p>
 <p>Plays: ${formatPlays(track.plays)}</p>
 <p>Liked: ${track.liked ? "Yes" : "No"}</p>
</div>`;
};

const renderPlaylist = (playlist) => {
  playlistInfo.innerHTML = playlist.getInfo();
};

// State

let currentFilter = "all";
let currentView = "cards";
let currentSort = "default";

// Re-renderiza com base no estado atual

const render = () => {
  const filtered = tracks.filter(
    (t) => currentFilter === "all" || t.genre === currentFilter,
  );

  const sorted = filtered.toSorted((a, b) => {
    if (currentSort === "title-asc") return a.title.localeCompare(b.title);
    if (currentSort === "plays-desc") return b.plays - a.plays;
    if (currentSort === "duration-desc") return b.duration - a.duration;
    return 0;
  });

  catalogueGrid.classList.toggle("hidden", currentView !== "cards");
  catalogueTable.classList.toggle("hidden", currentView === "cards");

  currentView === "cards" ? renderCards(sorted) : renderTable(sorted);
};

// Initial Render

renderCards(tracks);
renderPlaylist(myPlaylist);

// Events

filterControls.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-filter")) return;

  e.currentTarget.querySelector(".btn-filter.active")?.classList.remove("active");
  e.target.classList.add("active");

  currentFilter = e.target.dataset.genre;

  render();
});

viewControls.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-view")) return;

  e.currentTarget.querySelector(".btn-view.active")?.classList.remove("active");
  e.target.classList.add("active");

  currentView = e.target.dataset.view;

  render();
});

sortControls.addEventListener("change", (e) => {
  currentSort = e.target.value;
  render();
});

// Modal

catalogueGrid.addEventListener("click", (e) => {
  const id = e.target.dataset?.id;
  const track = tracks.find((t) => t.id === id);

  if (!track) return;

  if (e.target.classList.contains("btn-details")) {
    modalContent.innerHTML = renderModal(track);
    modalOverlay.classList.remove("hidden");
  }

  if (e.target.classList.contains("btn-add")) {
    let shouldAdd = true;

    if (myPlaylist.has(track)) {
      shouldAdd = confirm(
        `A faixa "${track.title}" já está na playlist. Adicionar duplicado?`,
      );
    }

    if (shouldAdd) {
      myPlaylist.add(track);
      renderPlaylist(myPlaylist);
      playlistInfo.classList.toggle("hidden", myPlaylist.size === 0);
    }
  }
});

modalOverlay.addEventListener("click", (e) => {
  if (
    e.target === e.currentTarget ||
    e.target.classList.contains("btn-close")
  ) {
    e.currentTarget.classList.add("hidden");
  }
});

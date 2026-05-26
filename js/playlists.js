/**
 * Playlist management
 */
const NexusPlaylists = (() => {
  function getUserPlaylists() {
    return NexusApp.getStored('nexus_playlists', null) || NexusData.playlists;
  }

  function savePlaylists(playlists) {
    NexusApp.setStored('nexus_playlists', playlists);
  }

  function renderPlaylistCard(pl) {
    return `
      <div class="playlist-card glass-card" data-id="${pl.id}">
        <div class="playlist-thumb">
          <img src="${pl.thumbnail}" alt="" loading="lazy">
          <span class="playlist-count">${pl.count} videos</span>
        </div>
        <div class="playlist-body">
          <h3>${pl.name}</h3>
          <p style="color:var(--text-secondary);font-size:0.85rem">${pl.description}</p>
          <p class="video-meta">${pl.visibility} · ${NexusData.formatViews(pl.plays)} plays</p>
          <div style="margin-top:0.75rem;display:flex;gap:0.5rem">
            <button class="btn btn-sm btn-primary play-pl" data-id="${pl.id}">Play All</button>
            <button class="btn btn-sm btn-outline edit-pl" data-id="${pl.id}">Edit</button>
            <button class="btn btn-sm btn-outline delete-pl" data-id="${pl.id}">Delete</button>
          </div>
        </div>
      </div>`;
  }

  function initPage() {
    const grid = document.getElementById('playlistGrid');
    if (!grid) return;

    const render = () => {
      const playlists = getUserPlaylists();
      grid.innerHTML = playlists.map(renderPlaylistCard).join('');
      bindActions();
    };

    document.getElementById('createPlaylist')?.addEventListener('click', () => {
      const name = prompt('Playlist name:');
      if (!name) return;
      const playlists = getUserPlaylists();
      playlists.unshift({
        id: 'pl-user-' + Date.now(),
        name,
        description: 'Custom playlist',
        thumbnail: NexusData.videos[0].thumbnail,
        videoIds: [],
        count: 0,
        visibility: 'private',
        created: new Date().toISOString().slice(0, 10),
        plays: 0
      });
      savePlaylists(playlists);
      render();
      NexusNotifications.toast('Playlist created', '📋');
    });

    function bindActions() {
      grid.querySelectorAll('.play-pl').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const pl = getUserPlaylists().find((p) => p.id === btn.dataset.id);
          if (pl?.videoIds?.[0]) location.href = 'player.html?id=' + pl.videoIds[0];
        });
      });
      grid.querySelectorAll('.delete-pl').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (!confirm('Delete this playlist?')) return;
          savePlaylists(getUserPlaylists().filter((p) => p.id !== btn.dataset.id));
          render();
        });
      });
      grid.querySelectorAll('.edit-pl').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const name = prompt('New playlist name:');
          if (!name) return;
          const playlists = getUserPlaylists();
          const pl = playlists.find((p) => p.id === btn.dataset.id);
          if (pl) { pl.name = name; savePlaylists(playlists); render(); }
        });
      });
    }

    document.getElementById('sortPlaylists')?.addEventListener('change', (e) => {
      let list = [...getUserPlaylists()];
      if (e.target.value === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
      else if (e.target.value === 'count') list.sort((a, b) => b.count - a.count);
      grid.innerHTML = list.map(renderPlaylistCard).join('');
      bindActions();
    });

    render();
  }

  document.addEventListener('DOMContentLoaded', initPage);

  return { getUserPlaylists, savePlaylists, initPage };
})();

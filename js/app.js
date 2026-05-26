/**
 * NexusStream - Core Application
 */
const NexusApp = (() => {
  const NAV_SECTIONS = [
    { title: 'Main', links: [
      { href: 'index.html', icon: '🏠', label: 'Home' },
      { href: 'dashboard.html', icon: '📊', label: 'Dashboard' },
      { href: 'player.html', icon: '▶️', label: 'Player' },
      { href: 'library.html', icon: '📚', label: 'Library' },
      { href: 'trending.html', icon: '🔥', label: 'Trending' }
    ]},
    { title: 'Collections', links: [
      { href: 'playlists.html', icon: '📋', label: 'Playlists' },
      { href: 'favorites.html', icon: '❤️', label: 'Favorites' },
      { href: 'watch-later.html', icon: '⏰', label: 'Watch Later' },
      { href: 'continue-watching.html', icon: '⏩', label: 'Continue Watching' },
      { href: 'downloads.html', icon: '⬇️', label: 'Downloads' }
    ]},
    { title: 'Discover', links: [
      { href: 'recommendations.html', icon: '✨', label: 'Recommendations' },
      { href: 'categories.html', icon: '🏷️', label: 'Categories' },
      { href: 'search.html', icon: '🔍', label: 'Search' },
      { href: 'gallery.html', icon: '🖼️', label: 'Gallery' }
    ]},
    { title: 'Account', links: [
      { href: 'history.html', icon: '🕐', label: 'Watch History' },
      { href: 'analytics.html', icon: '📈', label: 'Analytics' },
      { href: 'notifications.html', icon: '🔔', label: 'Notifications' },
      { href: 'profile.html', icon: '👤', label: 'Profile' },
      { href: 'settings.html', icon: '⚙️', label: 'Settings' }
    ]},
    { title: 'More', links: [
      { href: 'subtitles.html', icon: '💬', label: 'Subtitles' },
      { href: 'comments.html', icon: '📝', label: 'Comments' },
      { href: 'themes.html', icon: '🎨', label: 'Themes' },
      { href: 'theater.html', icon: '🎬', label: 'Mini Theater' },
      { href: 'security.html', icon: '🔒', label: 'Security' },
      { href: 'about.html', icon: 'ℹ️', label: 'About' },
      { href: 'contact.html', icon: '📧', label: 'Contact' }
    ]}
  ];

  function getPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  function renderSidebar() {
    const page = getPage();
    const isLanding = page === 'index.html' && document.body.classList.contains('landing-page');
    if (isLanding) return '';

    let html = '<aside class="sidebar" id="sidebar"><div class="sidebar-logo">NexusStream</div><nav class="sidebar-nav">';
    NAV_SECTIONS.forEach((sec) => {
      html += `<div class="nav-section"><div class="nav-section-title">${sec.title}</div>`;
      sec.links.forEach((link) => {
        const active = page === link.href ? ' active' : '';
        html += `<a href="${link.href}" class="nav-link${active}"><span class="icon">${link.icon}</span>${link.label}</a>`;
      });
      html += '</div>';
    });
    html += '</nav></aside><div class="sidebar-overlay" id="sidebarOverlay"></div>';
    return html;
  }

  function renderHeader(showSearch = true) {
    const unread = NexusData.notifications.filter((n) => !n.read).length;
    return `
      <header class="top-header">
        <button class="icon-btn menu-toggle" id="menuToggle" aria-label="Menu">☰</button>
        ${showSearch ? `
        <form class="search-bar" action="search.html" method="get">
          <span class="search-icon">🔍</span>
          <input type="search" name="q" placeholder="Search videos, playlists, genres..." id="globalSearch" autocomplete="off">
        </form>` : ''}
        <div class="header-actions">
          <a href="themes.html" class="icon-btn" title="Themes">🎨</a>
          <a href="notifications.html" class="icon-btn notif-btn" title="Notifications">
            🔔
            ${unread > 0 ? `<span class="badge">${unread > 99 ? '99+' : unread}</span>` : ''}
          </a>
          <a href="profile.html" class="icon-btn" title="Profile">👤</a>
        </div>
      </header>`;
  }

  function initLayout(options = {}) {
    const { sidebar = true, header = true, showSearch = true } = options;
    const mount = document.getElementById('app-root');
    if (!mount) return;

    if (sidebar) mount.insertAdjacentHTML('afterbegin', renderSidebar());
    if (header) {
      const main = mount.querySelector('.main-content') || mount;
      const content = main.querySelector('.page-content');
      if (content) content.insertAdjacentHTML('beforebegin', renderHeader(showSearch));
      else main.insertAdjacentHTML('afterbegin', renderHeader(showSearch));
    }

    bindSidebar();
    bindSearch();
    initParticles();
    initReveal();
    NexusThemes?.init?.();
    NexusNotifications?.init?.();
  }

  function bindSidebar() {
    const toggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    toggle?.addEventListener('click', () => {
      sidebar?.classList.toggle('open');
      overlay?.classList.toggle('visible');
    });
    overlay?.addEventListener('click', () => {
      sidebar?.classList.remove('open');
      overlay?.classList.remove('visible');
    });
  }

  function bindSearch() {
    const input = document.getElementById('globalSearch');
    if (!input) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('q')) input.value = params.get('q');
  }

  function initParticles() {
    const container = document.querySelector('.particles');
    if (!container || container.children.length > 0) return;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 15 + 's';
      p.style.animationDuration = 12 + Math.random() * 8 + 's';
      container.appendChild(p);
    }
  }

  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }

  function renderVideoCard(video, opts = {}) {
    const progress = video.progress || opts.progress || 0;
    const href = `player.html?id=${video.id}`;
    return `
      <article class="video-card" data-id="${video.id}" onclick="location.href='${href}'">
        <div class="video-thumb">
          <img src="${video.thumbnail}" alt="" loading="lazy">
          <span class="video-duration">${video.durationFormatted}</span>
          ${video.quality ? `<span class="video-quality">${video.quality}</span>` : ''}
          ${progress > 0 ? `<div class="video-progress-bar"><span style="width:${progress}%"></span></div>` : ''}
        </div>
        <div class="video-info">
          <h3 class="video-title">${video.title}</h3>
          <p class="video-meta">${video.creator} · ${NexusData.formatViews(video.views)} views · ${video.year}</p>
        </div>
      </article>`;
  }

  function renderVideoGrid(videos, limit) {
    const list = limit ? videos.slice(0, limit) : videos;
    return `<div class="video-grid">${list.map((v) => renderVideoCard(v)).join('')}</div>`;
  }

  function renderCarousel(videos, title, linkText = 'See all') {
    const items = videos.slice(0, 20).map((v) => `
      <div class="carousel-item">${renderVideoCard(v)}</div>`).join('');
    return `
      <section class="carousel-section reveal">
        <div class="section-header">
          <h2 class="section-title">${title}</h2>
          <a href="library.html" class="btn btn-sm btn-outline">${linkText}</a>
        </div>
        <div class="carousel-track">${items}</div>
      </section>`;
  }

  function renderStats(stats) {
    return `<div class="stats-grid">${stats.map((s) => `
      <div class="stat-card glass-card">
        <div class="stat-value">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>`).join('')}</div>`;
  }

  function getStored(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  }

  function setStored(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function addToHistory(videoId, progress) {
    const hist = getStored('nexus_history', []);
    const entry = { videoId, progress, watchedAt: new Date().toISOString() };
    const filtered = hist.filter((h) => h.videoId !== videoId);
    filtered.unshift(entry);
    setStored('nexus_history', filtered.slice(0, 200));
  }

  function getFavorites() {
    return getStored('nexus_favorites', NexusData.videos.slice(0, 24).map((v) => v.id));
  }

  function getWatchLater() {
    return getStored('nexus_watch_later', NexusData.videos.slice(24, 48).map((v) => v.id));
  }

  function resolveVideos(ids) {
    return ids.map((id) => NexusData.getVideo(id)).filter(Boolean);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (document.body.dataset.autoInit !== 'false') {
      initLayout({ sidebar: !document.body.classList.contains('landing-page') });
    }
  });

  return {
    initLayout,
    renderVideoCard,
    renderVideoGrid,
    renderCarousel,
    renderStats,
    getStored,
    setStored,
    addToHistory,
    getFavorites,
    getWatchLater,
    resolveVideos,
    getPage
  };
})();

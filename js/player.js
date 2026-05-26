/**
 * Custom Video Player
 */
const NexusPlayer = (() => {
  let video, wrapper, subs = [];
  const SUB_TEXTS = [
    'Welcome to NexusStream premium playback.',
    'Experience cinema-quality streaming.',
    'Subtitles synchronized automatically.',
    'Thank you for watching.'
  ];

  function init() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || NexusData.videos[0].id;
    const data = NexusData.getVideo(id) || NexusData.videos[0];

    video = document.getElementById('mainVideo');
    wrapper = document.getElementById('playerWrapper');
    if (!video) return;

    video.src = data.videoUrl;
    video.poster = data.poster || data.thumbnail;

    document.getElementById('playerTitle').textContent = data.title;
    document.getElementById('playerDesc').textContent = data.description;
    document.getElementById('playerViews').textContent = NexusData.formatViews(data.views) + ' views';
    document.getElementById('playerRating').textContent = '★ ' + data.rating;

    const related = document.getElementById('relatedVideos');
    if (related) {
      const rel = NexusData.videos.filter((v) => v.genre === data.genre && v.id !== data.id).slice(0, 12);
      related.innerHTML = rel.map((v) => NexusApp.renderVideoCard(v)).join('');
    }

    bindControls();
    bindKeyboard();
    bindGestures();
    loadSubtitlePrefs();
    startSubtitleCycle();

    video.addEventListener('timeupdate', () => {
      const pct = (video.currentTime / video.duration) * 100 || 0;
      document.querySelector('.seek-progress').style.width = pct + '%';
      const seek = document.getElementById('seekInput');
      if (seek) seek.value = pct;
      document.getElementById('currentTime').textContent = formatTime(video.currentTime);
      document.getElementById('durationTime').textContent = formatTime(video.duration);
      if (video.currentTime > 5) NexusApp.addToHistory(data.id, Math.round(pct));
    });

    video.addEventListener('loadedmetadata', () => {
      document.getElementById('durationTime').textContent = formatTime(video.duration);
    });

    video.addEventListener('waiting', () => document.getElementById('playerLoading')?.classList.remove('hidden'));
    video.addEventListener('canplay', () => document.getElementById('playerLoading')?.classList.add('hidden'));
    video.addEventListener('play', () => {
      document.getElementById('bigPlay')?.classList.add('hidden');
      document.getElementById('playBtn').textContent = '⏸';
    });
    video.addEventListener('pause', () => {
      document.getElementById('bigPlay')?.classList.remove('hidden');
      document.getElementById('playBtn').textContent = '▶';
    });
  }

  function formatTime(s) {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return m + ':' + String(sec).padStart(2, '0');
  }

  function bindControls() {
    document.getElementById('bigPlay')?.addEventListener('click', togglePlay);
    document.getElementById('playBtn')?.addEventListener('click', togglePlay);
    document.getElementById('rewindBtn')?.addEventListener('click', () => { video.currentTime -= 10; flashGesture('⏪ 10s'); });
    document.getElementById('forwardBtn')?.addEventListener('click', () => { video.currentTime += 10; flashGesture('10s ⏩'); });

    document.getElementById('seekInput')?.addEventListener('input', (e) => {
      const pct = e.target.value;
      video.currentTime = (pct / 100) * video.duration;
    });

    document.getElementById('volumeInput')?.addEventListener('input', (e) => {
      video.volume = e.target.value / 100;
      video.muted = e.target.value == 0;
    });

    document.getElementById('muteBtn')?.addEventListener('click', () => {
      video.muted = !video.muted;
      document.getElementById('muteBtn').textContent = video.muted ? '🔇' : '🔊';
    });

    document.getElementById('fullscreenBtn')?.addEventListener('click', () => {
      if (!document.fullscreenElement) wrapper.requestFullscreen?.();
      else document.exitFullscreen?.();
    });

    document.getElementById('pipBtn')?.addEventListener('click', async () => {
      try {
        if (document.pictureInPictureElement) await document.exitPictureInPicture();
        else await video.requestPictureInPicture();
      } catch { NexusNotifications.toast('PiP not supported', 'ℹ️'); }
    });

    document.getElementById('theaterBtn')?.addEventListener('click', () => wrapper.classList.toggle('theater-mode'));
    document.getElementById('miniBtn')?.addEventListener('click', () => wrapper.classList.toggle('mini-player'));

    document.getElementById('speedBtn')?.addEventListener('click', () => {
      document.getElementById('speedMenu')?.classList.toggle('open');
    });
    document.querySelectorAll('[data-speed]').forEach((btn) => {
      btn.addEventListener('click', () => {
        video.playbackRate = parseFloat(btn.dataset.speed);
        document.querySelectorAll('[data-speed]').forEach((b) => b.classList.toggle('active', b === btn));
        document.getElementById('speedMenu')?.classList.remove('open');
      });
    });

    document.getElementById('subToggle')?.addEventListener('click', () => {
      const overlay = document.getElementById('subtitleOverlay');
      overlay?.classList.toggle('visible');
    });

    document.getElementById('shortcutsBtn')?.addEventListener('click', () => {
      document.getElementById('shortcutsPanel')?.classList.add('open');
    });
    document.getElementById('closeShortcuts')?.addEventListener('click', () => {
      document.getElementById('shortcutsPanel')?.classList.remove('open');
    });

    document.getElementById('bookmarkBtn')?.addEventListener('click', addBookmark);
    document.getElementById('sleepTimerBtn')?.addEventListener('click', setSleepTimer);
    document.getElementById('castBtn')?.addEventListener('click', () => {
      document.getElementById('castBtn')?.classList.toggle('active');
      NexusNotifications.toast('Casting to living room display...', '📺');
    });

    document.getElementById('autoPlayToggle')?.addEventListener('change', (e) => {
      localStorage.setItem('nexus_autoplay', e.target.checked);
    });

    document.getElementById('audioOnlyBtn')?.addEventListener('click', () => {
      wrapper.classList.toggle('audio-only');
      NexusNotifications.toast('Audio-only mode', '🎵');
    });

    let controlsTimer;
    wrapper?.addEventListener('mousemove', () => {
      wrapper.classList.add('controls-visible');
      clearTimeout(controlsTimer);
      controlsTimer = setTimeout(() => wrapper.classList.remove('controls-visible'), 3000);
    });
  }

  function togglePlay() {
    if (video.paused) video.play();
    else video.pause();
  }

  function bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      switch (e.key.toLowerCase()) {
        case ' ': case 'k': e.preventDefault(); togglePlay(); break;
        case 'f': wrapper.requestFullscreen?.(); break;
        case 'm': video.muted = !video.muted; break;
        case 'arrowleft': video.currentTime -= 5; break;
        case 'arrowright': video.currentTime += 5; break;
        case 'arrowup': video.volume = Math.min(1, video.volume + 0.1); break;
        case 'arrowdown': video.volume = Math.max(0, video.volume - 0.1); break;
        case '?': document.getElementById('shortcutsPanel')?.classList.toggle('open'); break;
      }
    });
  }

  function bindGestures() {
    let touchStartX = 0;
    wrapper?.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
    wrapper?.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 60) {
        video.currentTime += dx > 0 ? 10 : -10;
        flashGesture(dx > 0 ? '10s ⏩' : '⏪ 10s');
      }
    });
  }

  function flashGesture(text) {
    const hint = document.getElementById('gestureHint');
    if (!hint) return;
    hint.textContent = text;
    hint.classList.add('show');
    setTimeout(() => hint.classList.remove('show'), 800);
  }

  function loadSubtitlePrefs() {
    try {
      const prefs = JSON.parse(localStorage.getItem('nexus_sub_prefs') || '{}');
      const overlay = document.getElementById('subtitleOverlay');
      if (overlay && prefs.fontSize) overlay.style.setProperty('--sub-size', prefs.fontSize + 'rem');
      if (overlay && prefs.color) overlay.style.setProperty('--sub-color', prefs.color);
    } catch { /* ignore */ }
  }

  function startSubtitleCycle() {
    let i = 0;
    const overlay = document.getElementById('subtitleOverlay');
    setInterval(() => {
      if (!overlay?.classList.contains('visible')) return;
      overlay.textContent = SUB_TEXTS[i % SUB_TEXTS.length];
      i++;
    }, 4000);
  }

  function addBookmark() {
    const bookmarks = JSON.parse(localStorage.getItem('nexus_bookmarks') || '[]');
    bookmarks.push({ time: video.currentTime, label: formatTime(video.currentTime) });
    localStorage.setItem('nexus_bookmarks', JSON.stringify(bookmarks));
    NexusNotifications.toast('Bookmark added at ' + formatTime(video.currentTime), '🔖');
  }

  function setSleepTimer() {
    const mins = parseInt(prompt('Sleep timer (minutes):', '30'), 10);
    if (!mins) return;
    const badge = document.getElementById('sleepBadge');
    if (badge) { badge.textContent = mins + 'm'; badge.style.display = 'inline'; }
    setTimeout(() => { video.pause(); NexusNotifications.toast('Sleep timer ended', '🌙'); }, mins * 60000);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('mainVideo')) init();
  });

  return { init };
})();

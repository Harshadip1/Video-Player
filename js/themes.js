/**
 * Theme customization & persistence
 */
const NexusThemes = (() => {
  const PRESETS = {
    midnight: { primary: '#7C3AED', accent: '#06B6D4', bg: '#0F172A' },
    aurora: { primary: '#e94560', accent: '#0f3460', bg: '#1a1a2e' },
    forest: { primary: '#22C55E', accent: '#14532d', bg: '#0d1f0d' },
    sunset: { primary: '#F59E0B', accent: '#EF4444', bg: '#1c1917' },
    ocean: { primary: '#0284c7', accent: '#06B6D4', bg: '#0c4a6e' },
    light: { theme: 'light', primary: '#7C3AED', accent: '#06B6D4', bg: '#F1F5F9' }
  };

  function apply(settings) {
    const root = document.documentElement;
    if (settings.theme === 'light') {
      document.body.setAttribute('data-theme', 'light');
    } else {
      document.body.removeAttribute('data-theme');
    }
    if (settings.primary) root.style.setProperty('--primary', settings.primary);
    if (settings.accent) root.style.setProperty('--accent', settings.accent);
    if (settings.bg) root.style.setProperty('--bg-primary', settings.bg);
    if (settings.fontSize) root.style.setProperty('--base-font', settings.fontSize + 'px');
  }

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem('nexus_theme') || '{}');
      apply(saved);
      return saved;
    } catch { return {}; }
  }

  function save(settings) {
    const current = load();
    const merged = { ...current, ...settings };
    localStorage.setItem('nexus_theme', JSON.stringify(merged));
    apply(merged);
    return merged;
  }

  function applyPreset(name) {
    const preset = PRESETS[name];
    if (preset) save(preset);
  }

  function initThemePage() {
    const grid = document.getElementById('themePresets');
    if (!grid) return;

    Object.keys(PRESETS).forEach((name) => {
      const card = document.createElement('div');
      card.className = `theme-card theme-preset-${name}`;
      card.innerHTML = `
        <div class="theme-preview"><span></span><span></span><span></span></div>
        <h4>${name.charAt(0).toUpperCase() + name.slice(1)}</h4>`;
      card.addEventListener('click', () => {
        document.querySelectorAll('.theme-card').forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
        applyPreset(name);
        NexusNotifications?.toast?.('Theme applied: ' + name);
      });
      grid.appendChild(card);
    });

    document.getElementById('primaryColor')?.addEventListener('input', (e) => save({ primary: e.target.value }));
    document.getElementById('accentColor')?.addEventListener('input', (e) => save({ accent: e.target.value }));
    document.getElementById('fontSizeRange')?.addEventListener('input', (e) => {
      save({ fontSize: e.target.value });
      const demo = document.getElementById('fontDemo');
      if (demo) demo.style.fontSize = e.target.value + 'px';
    });

    document.querySelectorAll('.accent-swatch').forEach((sw) => {
      sw.addEventListener('click', () => save({ accent: sw.dataset.color }));
    });
  }

  function init() { load(); }

  document.addEventListener('DOMContentLoaded', init);

  return { init, load, save, applyPreset, initThemePage, PRESETS };
})();

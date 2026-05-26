/**
 * Subtitle settings
 */
const NexusSubtitles = (() => {
  const DEFAULT_PREFS = {
    enabled: true,
    language: 'English',
    fontSize: 1.1,
    color: '#FFFFFF',
    bgOpacity: 0.75,
    syncOffset: 0
  };

  function getPrefs() {
    return NexusApp.getStored('nexus_sub_prefs', DEFAULT_PREFS);
  }

  function savePrefs(prefs) {
    NexusApp.setStored('nexus_sub_prefs', { ...getPrefs(), ...prefs });
    applyPreview();
  }

  function applyPreview() {
    const prefs = getPrefs();
    const preview = document.getElementById('subPreview');
    if (!preview) return;
    preview.style.fontSize = prefs.fontSize + 'rem';
    preview.style.color = prefs.color;
    preview.style.background = `rgba(0,0,0,${prefs.bgOpacity})`;
  }

  function initPage() {
    const list = document.getElementById('subtitleTracks');
    if (list) {
      list.innerHTML = NexusData.subtitles.slice(0, 48).map((s) => `
        <div class="glass-card" style="margin-bottom:0.5rem;display:flex;justify-content:space-between;align-items:center">
          <div>
            <strong>${s.label}</strong>
            <p style="font-size:0.85rem;color:var(--text-secondary)">Code: ${s.code}</p>
          </div>
          <button class="btn btn-sm btn-outline select-sub" data-lang="${s.language}">Select</button>
        </div>`).join('');

      list.querySelectorAll('.select-sub').forEach((btn) => {
        btn.addEventListener('click', () => {
          savePrefs({ language: btn.dataset.lang });
          NexusNotifications.toast('Subtitle track: ' + btn.dataset.lang, '💬');
        });
      });
    }

    const prefs = getPrefs();
    document.getElementById('subEnabled') && (document.getElementById('subEnabled').checked = prefs.enabled);
    document.getElementById('fontSizeRange')?.addEventListener('input', (e) => savePrefs({ fontSize: parseFloat(e.target.value) }));
    document.getElementById('subColor')?.addEventListener('input', (e) => savePrefs({ color: e.target.value }));
    document.getElementById('bgOpacity')?.addEventListener('input', (e) => savePrefs({ bgOpacity: e.target.value / 100 }));
    document.getElementById('syncOffset')?.addEventListener('input', (e) => {
      document.getElementById('syncValue').textContent = (e.target.value > 0 ? '+' : '') + e.target.value + 's';
      savePrefs({ syncOffset: parseInt(e.target.value, 10) });
    });

    applyPreview();
  }

  document.addEventListener('DOMContentLoaded', initPage);

  return { getPrefs, savePrefs, initPage };
})();

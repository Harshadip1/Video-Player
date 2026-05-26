/**
 * Analytics dashboard charts (Canvas)
 */
const NexusAnalytics = (() => {
  function drawBarChart(canvasId, data, labelKey, valueKey) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.offsetWidth * 2;
    const h = canvas.height = 280;
    ctx.scale(2, 2);
    const cw = w / 2, ch = h / 2;
    const pad = { t: 20, r: 20, b: 40, l: 50 };
    const max = Math.max(...data.map((d) => d[valueKey]));
    const barW = (cw - pad.l - pad.r) / data.length - 8;

    ctx.clearRect(0, 0, cw, ch);
    data.forEach((d, i) => {
      const barH = ((d[valueKey] / max) * (ch - pad.t - pad.b));
      const x = pad.l + i * (barW + 8);
      const y = ch - pad.b - barH;
      const grad = ctx.createLinearGradient(0, y, 0, ch);
      grad.addColorStop(0, '#7C3AED');
      grad.addColorStop(1, '#06B6D4');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, barW, barH);
      ctx.fillStyle = '#94A3B8';
      ctx.font = '10px Outfit';
      ctx.fillText(d[labelKey], x, ch - 12);
    });
  }

  function drawLineChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.offsetWidth * 2;
    const h = canvas.height = 280;
    ctx.scale(2, 2);
    const cw = w / 2, ch = h / 2;
    const pad = 40;
    const max = Math.max(...data.map((d) => d.views));
    const step = (cw - pad * 2) / (data.length - 1);

    ctx.clearRect(0, 0, cw, ch);
    ctx.beginPath();
    ctx.strokeStyle = '#06B6D4';
    ctx.lineWidth = 2;
    data.forEach((d, i) => {
      const x = pad + i * step;
      const y = ch - pad - (d.views / max) * (ch - pad * 2);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.lineTo(pad + (data.length - 1) * step, ch - pad);
    ctx.lineTo(pad, ch - pad);
    ctx.closePath();
    ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
    ctx.fill();
  }

  function drawPieChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = 200;
    canvas.width = size * 2;
    canvas.height = size * 2;
    ctx.scale(2, 2);
    const total = data.reduce((s, d) => s + d.value, 0);
    const colors = ['#7C3AED', '#06B6D4', '#22C55E', '#F59E0B', '#EF4444', '#A78BFA', '#34D399', '#FBBF24'];
    let start = -Math.PI / 2;
    const cx = size / 2, cy = size / 2, r = 70;

    data.forEach((d, i) => {
      const slice = (d.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, start + slice);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      start += slice;
    });
    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.arc(cx, cy, 40, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawProgressRings() {
    const container = document.getElementById('progressRings');
    if (!container) return;
    const stats = [
      { label: 'Engagement', value: NexusData.analytics.engagement, color: '#7C3AED' },
      { label: 'Retention', value: 72, color: '#06B6D4' },
      { label: 'Completion', value: 58, color: '#22C55E' }
    ];
    container.innerHTML = stats.map((s) => `
      <div class="glass-card" style="text-align:center;padding:1.5rem">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--bg-tertiary)" stroke-width="8"/>
          <circle cx="50" cy="50" r="42" fill="none" stroke="${s.color}" stroke-width="8"
            stroke-dasharray="${s.value * 2.64} 264" stroke-linecap="round" transform="rotate(-90 50 50)"/>
          <text x="50" y="54" text-anchor="middle" fill="var(--text-primary)" font-size="14" font-weight="700">${s.value}%</text>
        </svg>
        <p style="margin-top:0.5rem">${s.label}</p>
      </div>`).join('');
  }

  function initPage() {
    const a = NexusData.analytics;
    drawBarChart('chartWatchTime', a.watchTimeByMonth, 'month', 'hours');
    drawLineChart('chartViews', a.viewsByDay);
    drawPieChart('chartCategories', a.categoryBreakdown);
    drawProgressRings();

    const topList = document.getElementById('topVideosList');
    if (topList) {
      topList.innerHTML = a.topVideos.map((v, i) => `
        <tr>
          <td>${i + 1}</td>
          <td><a href="player.html?id=${v.id}">${v.title}</a></td>
          <td>${NexusData.formatViews(v.views)}</td>
          <td>★ ${v.rating}</td>
        </tr>`).join('');
    }

    const deviceChart = document.getElementById('deviceBreakdown');
    if (deviceChart) {
      deviceChart.innerHTML = a.deviceStats.map((d) => `
        <div style="margin-bottom:0.75rem">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span>${d.name}</span><span>${d.value}%</span>
          </div>
          <div class="progress-track"><span style="width:${d.value}%"></span></div>
        </div>`).join('');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('chartWatchTime')) {
      initPage();
      window.addEventListener('resize', initPage);
    }
  });

  return { initPage, drawBarChart, drawLineChart, drawPieChart };
})();

/**
 * Toast & notification system
 */
const NexusNotifications = (() => {
  let container;

  function ensureContainer() {
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  function toast(message, icon = '✓', duration = 4000) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    ensureContainer().appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 300);
    }, duration);
  }

  function renderList(notifications, containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = notifications.map((n) => `
      <div class="notification-item ${n.read ? '' : 'unread'}" data-id="${n.id}">
        <div class="notification-icon">${n.icon}</div>
        <div>
          <strong>${n.title}</strong>
          <p style="color:var(--text-secondary);font-size:0.9rem">${n.msg}</p>
          <small style="color:var(--text-muted)">${n.time}</small>
        </div>
      </div>`).join('');
  }

  function init() {
    if (Math.random() > 0.7) return;
    setTimeout(() => toast('Welcome back! New recommendations ready.', '✨'), 2000);
  }

  return { toast, renderList, init };
})();

document.addEventListener('DOMContentLoaded', () => {
  const toggle  = document.getElementById('menuToggle');
  const panel   = document.getElementById('sidePanel');
  const overlay = document.getElementById('panelOverlay');
  const closeBtn = document.getElementById('panelClose');

  function openPanel(){
    panel.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closePanel(){
    panel.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggle && panel && overlay) {
    toggle.addEventListener('click', () => {
      panel.classList.contains('open') ? closePanel() : openPanel();
    });
    overlay.addEventListener('click', closePanel);
    if (closeBtn) closeBtn.addEventListener('click', closePanel);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePanel();
    });
  }

  // Podświetl aktywną zakładkę (pasek pod nagłówkiem + panel boczny)
  // na podstawie atrybutu data-page ustawionego na <body>.
  const current = document.body.dataset.page;
  if (current) {
    document.querySelectorAll('a[data-page]').forEach(a => {
      if (a.dataset.page === current) a.classList.add('active');
    });
  }
});

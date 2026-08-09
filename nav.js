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

  /*
    Automatyczne rozpoznawanie orientacji zdjęć w kafelkach (Zamki,
    Pałace, Twierdze, Atrakcje). Zdjęcia pionowe dostają wyższy
    kształt kafelka zamiast być mocno przycinane do proporcji
    poziomych — dzieje się to samo, bez żadnej dodatkowej pracy
    przy dodawaniu zdjęć w admin.html.
  */
  function markOrientation(img, tile){
    function apply(){
      if (img.naturalWidth && img.naturalHeight && img.naturalHeight > img.naturalWidth) {
        tile.classList.add('tile-portrait');
      }
    }
    if (img.complete && img.naturalWidth) apply();
    else img.addEventListener('load', apply);
  }

  function scanTiles(root){
    if (!root.querySelectorAll) return;
    root.querySelectorAll('.voivo-tile img').forEach(img => {
      const tile = img.closest('.voivo-tile');
      if (tile && !tile.dataset.orientChecked) {
        tile.dataset.orientChecked = '1';
        markOrientation(img, tile);
      }
    });
  }

  scanTiles(document);

  // Kafelki na stronach kategorii dogrywają się dynamicznie (klik
  // w województwo / obiekt) — obserwator wyłapuje też te nowe.
  const tileObserver = new MutationObserver(() => scanTiles(document));
  tileObserver.observe(document.body, { childList: true, subtree: true });
});

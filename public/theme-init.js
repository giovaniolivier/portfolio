// Chargé de façon bloquante dans <head>, avant le CSS et React :
// applique le thème et la langue mémorisés pour éviter un flash au chargement.
// Fichier externe (et non script inline) pour respecter la CSP `script-src 'self'`.
(function () {
  try {
    var root = document.documentElement;
    var theme = localStorage.getItem('theme');
    if (theme !== 'light' && theme !== 'dark') {
      theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    if (theme === 'light') root.classList.add('light');
    var lang = localStorage.getItem('lang');
    if (lang === 'fr' || lang === 'en') root.lang = lang;
  } catch (e) {
    // Stockage indisponible : thème sombre et français par défaut.
  }
})();

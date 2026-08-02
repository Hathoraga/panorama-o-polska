/*
  WSPÓLNA BAZA MIEJSC — jedno źródło prawdy dla całej strony.

  Z tego pliku korzystają: zamki.html, palace.html, twierdze.html,
  atrakcje.html (żeby wyświetlić swoje obiekty) oraz index.html
  (żeby pokazać najnowsze zdjęcia w sekcji "Galeria").

  ====================================================================
  JAK DODAĆ NOWE ZDJĘCIE / OBIEKT:
  ====================================================================
  1. Wrzuć plik do images/ — najlepiej dwie wersje: miniaturę (~600px
     szer.) i pełny rozmiar (~1920px szer.), format WebP lub JPG jakość ~80.
  2. Dopisz nowy wpis na KOŃCU tablicy PLACES poniżej (kolejność ma
     znaczenie — ostatnie wpisy = najnowsze, one pokazują się jako
     pierwsze w Galerii na stronie głównej).
  3. Pola:
     - category: jedna z: "zamki", "palace", "twierdze", "atrakcje"
     - voivodeship: dokładna nazwa województwa (patrz lista VOIVODESHIPS)
     - town: nazwa miejscowości
     - name: nazwa obiektu (np. "Zamek w Łańcucie")
     - thumb: ścieżka do miniatury
     - full: ścieżka do zdjęcia w pełnym rozmiarze

  Jeśli dodajesz KOLEJNE zdjęcie do już istniejącego obiektu (ten sam
  town + name), po prostu dopisz nowy wpis z tymi samymi town/name —
  automatycznie trafi do galerii tego samego obiektu.
  ====================================================================
*/

const VOIVODESHIPS = [
  "Dolnośląskie", "Kujawsko-pomorskie", "Lubelskie", "Lubuskie",
  "Łódzkie", "Małopolskie", "Mazowieckie", "Opolskie",
  "Podkarpackie", "Podlaskie", "Pomorskie", "Śląskie",
  "Świętokrzyskie", "Warmińsko-mazurskie", "Wielkopolskie", "Zachodniopomorskie"
];

const CATEGORY_LABELS = {
  zamki:     "Zamki",
  palace:    "Pałace i dwory",
  twierdze:  "Twierdze i podziemia",
  atrakcje:  "Atrakcje"
};

const PLACES = [
  { category: "zamki", voivodeship: "Podkarpackie", town: "Łańcut", name: "Muzeum, hotel, restauracja, park",
    thumb: "images/zamek-lancut-thumb.jpg", full: "images/zamek-lancut.jpg" },
  { category: "palace", voivodeship: "Łódzkie", town: "Piorunów", name: "Hotel SPA***, restauracja, basen",
  thumb: "images/palace-piorunow-thumb.jpg", full: "images/palace-piorunow.jpg" },
  { category: "twierdze", voivodeship: "Małopolskie", town: "Kraków", name: "Kopiec Krakusa, muzeum",
  thumb: "images/twierdze-krakow-thumb.jpg", full: "images/twierdze-krakow.jpg" },
  
  // Kolejne wpisy dopisuj poniżej, np.:
  // { category: "palace", voivodeship: "Mazowieckie", town: "Nieborów", name: "Pałac w Nieborowie",
  //   thumb: "images/nieborow-thumb.jpg", full: "images/nieborow.jpg" },
];

// Grupuje wpisy danej kategorii według województw, łącząc zdjęcia
// tego samego obiektu (ta sama miejscowość + nazwa) w jedną galerię.
function groupByVoivodeship(category) {
  const map = {};
  VOIVODESHIPS.forEach(v => { map[v] = []; });

  PLACES.filter(p => p.category === category).forEach(p => {
    const list = map[p.voivodeship];
    if (!list) return;
    let obj = list.find(o => o.town === p.town && o.name === p.name);
    if (!obj) {
      obj = { town: p.town, name: p.name, photos: [] };
      list.push(obj);
    }
    obj.photos.push({ thumb: p.thumb, full: p.full });
  });

  return map;
}

// Zwraca N ostatnio dodanych zdjęć (ze wszystkich kategorii razem),
// najnowsze pierwsze — do Galerii na stronie głównej.
function getLatestPhotos(count) {
  return PLACES.slice(-count).reverse().map(p => ({
    thumb: p.thumb,
    full: p.full,
    caption: `${p.name} — ${p.town}`,
    categoryLabel: CATEGORY_LABELS[p.category] || "",
    categoryUrl: `${p.category}.html`
  }));
}

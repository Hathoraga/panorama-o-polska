/*
  WSPÓLNA BAZA MIEJSC — jedno źródło prawdy dla całej strony.

  Z tego pliku korzystają: zamki.html, palace.html, twierdze.html,
  atrakcje.html (żeby wyświetlić swoje obiekty), index.html (żeby
  pokazać najnowsze zdjęcia w Galerii i pinezki na Mapie podróży).

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
     - lat, lng: współrzędne geograficzne (do pinezki na mapie).
       Najłatwiej znaleźć: wyszukaj miejscowość w Google Maps, kliknij
       prawym przyciskiem na dokładne miejsce → pierwsza pozycja w menu
       to współrzędne (np. 50.0679, 22.2278) — skopiuj i wklej.
       Jeśli pominiesz te pola, obiekt po prostu nie dostanie pinezki
       na mapie (reszta strony będzie działać normalnie).

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
    thumb: "images/zamek-lancut-thumb.jpg", full: "images/zamek-lancut.jpg", lat: 50.0679, lng: 22.2278 },
  { category: "palace", voivodeship: "Łódzkie", town: "Piorunów", name: "Hotel SPA***, restauracja, basen",
  thumb: "images/palace-piorunow-thumb.jpg", full: "images/palace-piorunow.jpg", lat: 51.7604, lng: 19.0745 },
  { category: "twierdze", voivodeship: "Małopolskie", town: "Kraków", name: "Kopiec Kościuszki, muzeum",
  thumb: "images/twierdze-krakow-thumb.jpg", full: "images/twierdze-krakow.jpg", lat: 50.0647, lng: 19.9450 },
  { category: "palace", voivodeship: "Wielkopolskie", town: "Dobrzyca", name: "Muzeum Ziemiaństwa, park, kawiarnia, hotelik",
  thumb: "images/palace-smilow-thumb.jpg", full: "images/palace-smilow.jpg", lat: 51.8656, lng: 17.6052 },
  { category: "palace", voivodeship: "Wielkopolskie", town: "Śmiełów", name: "Muzeum Adama Mickiewicza, park",
  thumb: "images/palace-smielow-thumb.jpg", full: "images/palace-smielow.jpg", lat: 52.1000, lng: 17.5670 },
  { category: "atrakcje", voivodeship: "Świętokrzyskie", town: "Podzamcze", name: "Centrum Nauki Leonardo Da Vinci",
  thumb: "images/atrakcje-podzamcze-thumb.jpg", full: "images/atrakcje-podzamcze.jpg", lat: 50.7825, lng: 20.4659 }

  // Kolejne wpisy dopisuj poniżej, np.:
  // { category: "palace", voivodeship: "Mazowieckie", town: "Nieborów", name: "Pałac w Nieborowie",
  //   thumb: "images/nieborow-thumb.jpg", full: "images/nieborow.jpg", lat: 52.0672, lng: 20.0994 },
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

// Zwraca listę obiektów z ustawionymi współrzędnymi (lat/lng) —
// do pinezek na Mapie podróży na stronie głównej. Obiekty bez
// współrzędnych są pomijane.
function getMapPoints() {
  return PLACES.filter(p => typeof p.lat === "number" && typeof p.lng === "number").map(p => ({
    lat: p.lat,
    lng: p.lng,
    name: p.name,
    town: p.town,
    categoryLabel: CATEGORY_LABELS[p.category] || "",
    categoryUrl: `${p.category}.html`
  }));
}

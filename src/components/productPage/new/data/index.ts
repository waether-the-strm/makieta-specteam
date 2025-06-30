const techSpecs = [
  {
    label: 'Zasięg nadajnika',
    value: 'Bez ograniczeń (działa przez internet)',
  },
  {
    label: 'Rozdzielczość kamery',
    value:
      'Regulowana w czasie pracy:\n• 1200x900px\n• 1600x1200px\n• 1800x1400px\n• 2000x1600px\n• 2500x1900px (max)',
  },
  { label: 'Czas pracy', value: 'od 4 do 6 godzin (można zwiększyć)' },
  {
    label: 'Rozmiary kamery',
    value: '11mm x 9mm x 7mm (średnica guzika: 11 mm)',
  },
  { label: 'Rozmiary nadajnika', value: '75mm x 30mm x 5mm' },
  {
    label: 'Czas odświeżania',
    value: 'około 2 sekund dla rozdzielczości 1600x1200px',
  },
  {
    label: 'Ogniskowa kamery',
    value: 'Ustawiona na czytanie tekstu z odległości 15 - 40 cm (można ustawić dowolnie większą)',
  },
  {
    label: 'Pole widzenia kamery',
    value: '• z 22cm: 18x24cm\n• z 40cm: 30x42cm\n• z 50cm: 38x51cm',
  },
]

const boxContents = {
  rental: [
    'Mikrokamera (1 szt.)',
    'Mikrosłuchawka z pętlą Bluetooth (1 szt.)',
    'Słuchawka Nano (4 szt.)',
    'Pasywna pętla indukcyjna (1 szt.) [OPCJA]',
    'Ładowarka sieciowa USB (1 szt.)',
    'Przewód zasilania 25cm +/-5cm (1 szt.)',
    'Baterie do mikrosłuchawki (co najmniej 2 szt.)',
    'Powerbank 4h+ (1 szt.)',
    'Guziki podobne do obiektywu (co najmniej 6 szt.)',
    'Etui (1 szt.)',
  ],
  purchase: [
    'Mikrokamera (1 szt.)',
    'Mikrosłuchawka z pętlą Bluetooth (1 szt.)',
    'Słuchawka Nano (4 szt.)',
    'Ładowarka sieciowa USB (1 szt.)',
    'Przewód zasilania 25cm +/-5cm (1 szt.)',
    'Baterie do mikrosłuchawki (8 szt.)',
    'Powerbank 4h+ (1 szt.)',
    'Guziki podobne do obiektywu (6 szt.)',
    'Etui (1 szt.)',
  ],
}

const questions = [
  {
    q: 'Co muszę mieć swojego aby korzystać z zestawu?',
    a: 'Generalnie nic. Potrzebny jest tylko jakikolwiek telefon z dostępem do internetu.',
  },
  {
    q: 'Co muszę mieć przy sobie?',
    a: 'Kamerę, słuchawkę, pętle bluetooth oraz telefon.',
  },
  {
    q: 'Co musi mieć odbiorca?',
    a: 'Komputer z dostępem do internetu i telefon.',
  },
  {
    q: 'Czy muszę instalować jakieś oprogramowanie?',
    a: 'Nie. Do pracy kamery potrzebna jest tylko jakakolwiek przeglądarka internetowa, np. Chrome lub Firefox.',
  },
  {
    q: 'Czy można robić stopklatki przesyłanych zdjęć?',
    a: 'Tak. Służy do tego guzik "Snapshot" na stronie odbiornika. Zapisane stopklatki można otworzyć po kliknięciu ich miniaturki.',
  },
  {
    q: 'Czy jakość obrazu jest zależna od odległości lub stanu rozładowania baterii?',
    a: 'Nie. Jakość obrazu jest zawsze taka sama.',
  },
  {
    q: 'Czy kamera wydaje jakieś dźwięki?',
    a: 'Nie. Nie posiada nawet elementów zdolnych wydawać jakiekolwiek odgłosy.',
  },
  {
    q: 'Czy kamera się nagrzewa?',
    a: 'Raczej nie, aczkolwiek może być delikatnie cieplejsza od temperatury ciała. Zdecydowanie nie powoduje to dyskomfortu użytkowania.',
  },
  {
    q: 'Czy kamera nie ma zbyt krótkiego kabelka?',
    a: 'Nie. Krótki i względnie sztywny kabelek zapewnia doskonałe możliwości manewrowania kamerą co bywa problematyczne przy długim kablu.',
  },
  {
    q: 'Czy kamera dobrze widzi ekran komputera?',
    a: 'Tak, jakość zdjęć ekranu komputera jest taka sama jak zdjęć kartki papieru.',
  },
  {
    q: 'Czy w przypadku zakupu kamery muszę płacić jakiś abonament za użytkowanie serwera?',
    a: 'Obecnie korzystanie z serwera jest bezpłatne.',
  },
  {
    q: 'Czy mogę użyć swojej mikrosłuchawki?',
    a: 'Tak. Słuchawka i kamera to dwa niezależne systemy. Zestaw bez słuchawki jest 50zł tańszy.',
  },
  {
    q: 'Czy istnieje możliwość zakupu samej kamery?',
    a: 'Tak. Zestaw bez słuchawki jest o około 800zł tańszy.',
  },
]

const reviews = [
  {
    name: 'Katarzyna',
    rating: 5,
    text: 'Ten sprzęt jest po prostu zaje****! Nic nie widać i nie słychać!\nZdałam! :)))))',
  },
  { name: 'Piotr Z.', rating: 5, text: 'Zdane! dziękuje!!' },
  {
    name: 'Mmmm',
    rating: 4,
    text: 'Wszystko super. długo działa i troche ciężko słuchawke wyjąć',
  },
  { name: 'Ania', rating: 5, text: 'Super! Wszystko OK\ndziękuje :*' },
  {
    name: 'Anonim',
    rating: 5,
    text: 'Było stresująco ale sie udało! Dzięki za pomoc i cierpliwość do takiego nieogara jak ja 😅',
  },
  {
    name: 'Michał',
    rating: 5,
    text: 'Kamera działa super, wszystko zgodnie z opisem. Polecam!',
  },
  {
    name: 'Krzysztof',
    rating: 4,
    text: 'Działa jak należy, ale instrukcja mogłaby być bardziej szczegółowa.',
  },
  {
    name: 'Ewa',
    rating: 5,
    text: 'Bardzo pomocny sprzęt, dzięki niemu zdałam egzamin!',
  },
]
export { techSpecs, boxContents, questions, reviews }

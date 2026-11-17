// All text, brands, venues and tours for the FITUR 2027 booth site, in one place.
// Spanish drafted by Claude: needs a native read before the show.
// Taglines marked DRAFT are first guesses for Isaac to confirm or rewrite.

export const numbers = {
  properties: { value: '10+', label: { es: 'propiedades', en: 'properties' } },
  events: { value: '40', label: { es: 'espacios para eventos y reuniones', en: 'events and meeting venues' } },
  guests: { value: '320K', label: { es: 'huéspedes al año', en: 'guests a year' } },
};

export const copy = {
  // Positioning: Hibird Hospitality Group (HHG) is the owner and manager. People should remember the name.
  brand: { es: 'Hibird Hospitality Group', en: 'Hibird Hospitality Group' },
  brandLine: { es: 'Propietarios y gestores · Puerto Rico', en: 'Owner and manager · Puerto Rico' },
  hook: {
    es: 'Somos propietarios y gestores de hoteles, espacios y experiencias en Puerto Rico.',
    en: 'We own and manage hotels, venues and experiences across Puerto Rico.',
  },
  promise: {
    es: 'Cuéntanos qué planeas. Hablarás directamente con quienes dirigen la propiedad.',
    en: "Tell us what you're planning. You'll speak directly with the people who run the property.",
  },
  tilesTitle: { es: '¿Qué buscas?', en: 'What are you looking for?' },
  whyTitle: { es: 'Por qué Hibird', en: 'Why Hibird' },
  why1: { es: 'Un solo grupo, más de 10 propiedades en Puerto Rico', en: 'One group, 10+ properties across Puerto Rico' },
  why2: { es: '40 espacios para eventos y reuniones', en: '40 events and meeting venues' },
  why3: { es: 'Somos propietarios y gestores: trato directo, respuestas rápidas', en: 'We own and manage them: direct contact, quick answers' },
  propertiesTitle: { es: 'Hoteles y estancias', en: 'Hotels and stays' },
  offerLabel: { es: 'Oferta FITUR', en: 'FITUR offer' },
  highlightsTitle: { es: 'Lo mejor', en: 'Highlights' },
  roomsLabel: { es: 'habitaciones', en: 'rooms' },
  roomMixTitle: { es: 'Tipos de habitación', en: 'Room mix' },
  meetingsLabel: { es: 'Reuniones y eventos', en: 'Meetings and events' },
  venuesTitle: { es: 'Espacios para eventos y reuniones', en: 'Venues for events and meetings' },
  toursTitle: { es: 'Tours y atracciones', en: 'Tours and attractions' },
  restaurantsTitle: { es: 'Restaurantes', en: 'Restaurants' },
  restaurantsLine: {
    es: 'Restaurantes y bares en nuestros hoteles, incluido El Condado Gastrobar.',
    en: 'Restaurants and bars at our hotels, including El Condado Gastrobar.',
  },
  guideTitle: { es: 'Guía gratuita de Puerto Rico', en: 'Free Puerto Rico guide' },
  guideLine: {
    es: 'Encanto Experiences prepara una guía gratuita para cualquiera que visite la isla.',
    en: 'Encanto Experiences is preparing a free guide for anyone visiting the island.',
  },
  contactHibird: { es: 'Contacta con Hibird', en: 'Contact Hibird' },
  scan: { es: 'Escanea', en: 'Scan' },
  meetTitle: { es: 'Conoce a Hibird Hospitality Group en FITUR', en: 'Meet Hibird Hospitality Group at FITUR' },
  meetLine: {
    es: 'Reserva 15 minutos con el equipo que dirige nuestros hoteles.',
    en: 'Book 15 minutes with the team that runs our hotels.',
  },
};

export const tiles = [
  {
    id: 'sell',
    label: { es: 'Vendo viajes a Puerto Rico', en: 'I sell travel to Puerto Rico' },
    sub: { es: 'Agencia, tour operador, mayorista, DMC', en: 'Agency, tour operator, wholesaler, DMC' },
    order: ['why', 'properties', 'tours', 'venues', 'restaurants'],
  },
  {
    id: 'groups',
    label: { es: 'Organizo grupos y eventos', en: 'I plan groups and events' },
    sub: { es: 'Reuniones, incentivos, bodas, congresos', en: 'Meetings, incentives, weddings, conferences' },
    order: ['venues', 'properties', 'why', 'tours', 'restaurants'],
  },
  {
    id: 'trip',
    label: { es: 'Planeo un viaje', en: "I'm planning a trip" },
    sub: { es: 'Dónde alojarme y qué hacer', en: 'Where to stay and what to do' },
    order: ['properties', 'tours', 'restaurants', 'venues', 'why'],
  },
  {
    id: 'browse',
    label: { es: 'Solo estoy mirando', en: 'Just looking' },
    sub: { es: 'O algo distinto', en: 'Or something else' },
    order: ['properties', 'venues', 'tours', 'restaurants', 'why'],
  },
];

// 10 brands, in the agreed order. `logo: null` means no logo file yet: the screen shows the name.
export const brands = [
  {
    id: 'hibird-hotel', name: 'HiBird Hotel', area: null, kind: 'hotel',
    photo: 'assets/photos/hibird-hotel.webp', logo: 'assets/logos/hibird-hotel.webp',
    line: { es: 'Habitaciones modernas y buena mesa', en: 'Modern rooms and great food' }, // DRAFT
    bestFor: { es: 'Estancias urbanas con diseño', en: 'Design-led city stays' }, // DRAFT
  },
  {
    id: 'condado-plaza', name: 'The Condado Plaza', area: 'Condado', kind: 'hotel',
    photo: 'assets/photos/condado-plaza.webp', logo: 'assets/logos/condado-plaza.webp',
    line: { es: 'Resort frente al mar en Condado', en: 'Condado resort by the sea' }, // DRAFT
    bestFor: { es: 'Resort, reuniones y eventos', en: 'Resort stays, meetings and events' }, // DRAFT
  },
  {
    id: 'abitta', name: 'Abitta', area: null, kind: 'hotel',
    photo: 'assets/photos/abitta.webp', logo: 'assets/logos/abitta.webp',
    line: { es: 'Hotel boutique con personalidad', en: 'Boutique hotel with personality' }, // DRAFT
    bestFor: { es: 'Escapadas boutique', en: 'Boutique getaways' }, // DRAFT
  },
  {
    id: 'holiday-inn', name: 'Holiday Inn Express Condado', area: 'Condado', kind: 'hotel',
    photo: 'assets/photos/holiday-inn.webp', logo: 'assets/logos/holiday-inn.webp',
    line: { es: 'Comodidad IHG, con piscina', en: 'Easy IHG stays, with a pool' }, // DRAFT
    bestFor: { es: 'Viajeros y grupos pequeños', en: 'Travelers and small groups' }, // DRAFT
  },
  {
    id: 'casa-las-ruinas', name: 'Casa Las Ruinas', area: 'Old San Juan', kind: 'hotel',
    photo: 'assets/photos/casa-las-ruinas.webp', logo: 'assets/logos/casa-las-ruinas.webp',
    line: { es: 'Quédate por la historia, Viejo San Juan', en: 'Stay for the story, Old San Juan' },
    bestFor: { es: 'Viejo San Juan, a pie de todo', en: 'Old San Juan, on foot to everything' }, // DRAFT
  },
  {
    id: 'hilton', name: 'Hilton Garden Inn', area: 'Condado', kind: 'hotel',
    photo: 'assets/photos/hilton.webp', logo: 'assets/logos/hilton.webp',
    line: { es: 'Vistas a la laguna y salones', en: 'Lagoon views and meeting rooms' },
    bestFor: { es: 'Grupos, congresos y eventos', en: 'Groups, conferences and events' }, // DRAFT
  },
  {
    id: 'la-mona', name: 'La Mona', area: 'Loíza St.', kind: 'apartments',
    photo: 'assets/photos/la-mona.webp', logo: 'assets/logos/la-mona.webp',
    line: { es: 'Apartamentos cerca de la playa', en: 'Apartments near the beach' }, // DRAFT
    bestFor: { es: 'Estancias largas y familias', en: 'Longer stays and families' }, // DRAFT
  },
  {
    id: 'ashford', name: 'Ashford', area: 'Ashford Ave.', kind: 'apartments',
    photo: 'assets/photos/ashford.webp', logo: null,
    line: { es: 'Apartamentos en la avenida Ashford', en: 'Apartment stays on Ashford Ave.' }, // DRAFT
    bestFor: { es: 'Estancias con cocina y espacio', en: 'Stays with a kitchen and space' }, // DRAFT
  },
  {
    id: 'stay-with-bear', name: 'Stay With Bear', area: null, kind: 'apartments',
    photo: 'assets/photos/stay-with-bear.webp', logo: 'assets/logos/stay-with-bear.webp',
    line: { es: 'Apartamentos y estancias por la isla', en: 'Apartment stays across the island' }, // DRAFT
    bestFor: { es: 'Viajeros independientes', en: 'Independent travelers' }, // DRAFT
  },
  {
    id: 'by-carmen', name: 'By Carmen', area: null, kind: 'hotel',
    photo: null, logo: null, // no photo or logo found yet: Isaac to supply
    line: { es: 'Hospitalidad boutique con carácter', en: 'Boutique hospitality with character' }, // DRAFT
    bestFor: { es: 'Casas y estancias boutique', en: 'Boutique homes and stays' }, // DRAFT
  },
];

// Facts per property. Counts come from our own systems (StayInTouch room roster for HiBird and Casa Las Ruinas,
// the Guesty calendar for La Mona and Ashford), checked 2026-11-17. Highlights come from the property websites.
// Not every property has everything yet: what is missing shows as "To send" in review mode.
const unitRooms = { en: 'rooms', es: 'habitaciones' };
const unitApts = { en: 'apartments', es: 'apartamentos' };
const mix = (n, en, es) => ({ n, en, es });
const FACTS = {
  'hibird-hotel': {
    area: 'Condado',
    line: { es: 'Condado con piscina y beach club', en: 'Condado stay with pool and beach club' },
    bestFor: { es: 'Estancias de negocios y ocio en Condado', en: 'Business and leisure stays in Condado' },
    rooms: { n: 53, unit: unitRooms },
    roomMix: [
      mix(17, 'Standard king rooms', 'Habitaciones king estándar'),
      mix(6, 'King rooms with terrace', 'Habitaciones king con terraza'),
      mix(3, 'Double queen rooms (1 with terrace)', 'Habitaciones doble queen (1 con terraza)'),
      mix(10, 'Studios and studio suites', 'Estudios y suites estudio'),
      mix(5, 'One-bedroom apartments', 'Apartamentos de 1 dormitorio'),
      mix(11, 'Two-bedroom apartments (1 penthouse)', 'Apartamentos de 2 dormitorios (1 penthouse)'),
      mix(1, 'Three-bedroom penthouse', 'Penthouse de 3 dormitorios'),
    ],
    highlights: [
      { en: 'Pool and beach club', es: 'Piscina y beach club' },
      { en: 'PURE restaurant and a Grab & Go market on site', es: 'Restaurante PURE y mercado Grab & Go en el hotel' },
      { en: 'Fitness center', es: 'Gimnasio' },
      { en: 'From standard rooms to three-bedroom penthouses', es: 'Desde habitaciones estándar hasta penthouses de 3 dormitorios' },
    ],
  },
  'casa-las-ruinas': {
    area: 'Old San Juan',
    bestFor: { es: 'Parejas y estancias de bienestar en el Viejo San Juan', en: 'Couples and wellness stays in Old San Juan' },
    rooms: { n: 21, unit: unitRooms },
    roomMix: [
      mix(16, 'Standard rooms', 'Habitaciones estándar'),
      mix(4, 'One-bedroom apartments (2 lofts with balcony, 1 with private terrace)', 'Apartamentos de 1 dormitorio (2 lofts con balcón, 1 con terraza privada)'),
      mix(1, 'Two-bedroom apartment with balcony', 'Apartamento de 2 dormitorios con balcón'),
    ],
    highlights: [
      { en: 'Restored historic hotel, a short walk to Plaza de Armas and the port', es: 'Hotel histórico restaurado, a pocos pasos de la Plaza de Armas y el puerto' },
      { en: 'Rooftop yoga and meditation classes, free for guests', es: 'Clases de yoga y meditación en la azotea, gratis para huéspedes' },
      { en: 'Preferred access to the Las Ruinas Bath House next door', es: 'Acceso preferente al Las Ruinas Bath House, en la puerta de al lado' },
      { en: 'A real front desk, free Wi-Fi and free pet stays', es: 'Recepción real, Wi-Fi gratis y mascotas sin costo' },
    ],
  },
  'la-mona': {
    rooms: { n: 28, unit: unitApts },
    roomMix: [
      mix(23, 'One-bedroom apartments', 'Apartamentos de 1 dormitorio'),
      mix(2, 'Two-bedroom apartments', 'Apartamentos de 2 dormitorios'),
      mix(2, 'Three-bedroom apartments', 'Apartamentos de 3 dormitorios'),
      mix(1, 'Four-bedroom apartment', 'Apartamento de 4 dormitorios'),
    ],
  },
  ashford: {
    rooms: { n: 17, unit: unitApts },
    roomMix: [
      mix(4, 'One-bedroom apartments', 'Apartamentos de 1 dormitorio'),
      mix(6, 'Two-bedroom apartments', 'Apartamentos de 2 dormitorios'),
      mix(6, 'Three-bedroom apartments', 'Apartamentos de 3 dormitorios'),
      mix(1, 'Four-bedroom apartment', 'Apartamento de 4 dormitorios'),
    ],
  },
};
for (const b of brands) Object.assign(b, FACTS[b.id] || {});

// Gallery photos (assets/gallery/<id>-<n>.jpg) and the matching page on hibirdgroup.com, per brand.
const GALLERY_COUNT = {
  'hibird-hotel': 6, 'condado-plaza': 2, abitta: 6, 'holiday-inn': 5, 'casa-las-ruinas': 6,
  hilton: 6, 'la-mona': 6, ashford: 5, 'stay-with-bear': 3, 'by-carmen': 0,
};
const WEB = {
  'hibird-hotel': 'https://www.hibirdgroup.com/properties/hibird-hotel',
  'condado-plaza': 'https://www.hibirdgroup.com/properties/the-condado-plaza',
  abitta: 'https://www.hibirdgroup.com/properties/abitta-boutique-hotel',
  'holiday-inn': 'https://www.hibirdgroup.com/properties/holiday-inn-express',
  'casa-las-ruinas': 'https://www.hibirdgroup.com/properties/casa-las-ruinas',
  hilton: 'https://www.hibirdgroup.com/properties/hilton-garden-inn',
  'la-mona': 'https://www.hibirdgroup.com/properties/la-mona-complex',
  'stay-with-bear': 'https://www.hibirdgroup.com/stay-with-bear',
};
for (const b of brands) {
  b.gallery = Array.from({ length: GALLERY_COUNT[b.id] || 0 }, (_, i) => `assets/gallery/${b.id}-${i + 1}.webp`);
  b.web = WEB[b.id] || null; // Ashford and By Carmen have no page on the Hibird site
}

// Cards load a small thumbnail; the TV and detail views load the full photo.
export const thumbOf = (photo) => (photo ? photo.replace('assets/photos/', 'assets/thumbs/') : null);
for (const b of brands) b.thumb = thumbOf(b.photo);

export const venues = [
  {
    id: 'condado-plaza-venue', name: 'The Condado Plaza',
    photo: 'assets/photos/condado-plaza-view.webp', logo: null,
    line: { es: 'Reuniones y eventos junto al mar', en: 'Meetings and events by the sea' }, // DRAFT
  },
  {
    id: 'hilton-venue', name: 'Hilton Garden Inn',
    photo: 'assets/photos/venue-hilton-ballroom.webp', logo: null,
    line: { es: 'Salón, salas de juntas y jardín', en: 'Ballroom, boardrooms and lawn' },
  },
  {
    // No website exists (Google Maps and Facebook only). Never invent a URL. Inquiries go to Hibird.
    id: 'mira-mar', name: 'Mira Mar Event Center',
    photo: null, logo: null,
    line: { es: 'Grandes espacios para grupos, cerca de todos nuestros hoteles', en: 'Large spaces for groups, close to all our hotels' },
  },
];

// Venue galleries reuse photos already in assets/gallery. Mira Mar has none yet.
venues.find((v) => v.id === 'condado-plaza-venue').gallery = ['assets/gallery/condado-plaza-2.webp', 'assets/gallery/condado-plaza-1.webp'];
venues.find((v) => v.id === 'hilton-venue').gallery = [
  'assets/gallery/hilton-4.webp', 'assets/gallery/hilton-5.webp', 'assets/gallery/hilton-6.webp', 'assets/gallery/hilton-1.webp',
];
venues.find((v) => v.id === 'mira-mar').gallery = [];

export const tours = [
  {
    id: 'glow-kayak', name: 'Glow Kayak', url: 'https://glowkayakpuertorico.com/',
    photo: 'assets/photos/glow-kayak.webp', logo: null,
    line: { es: 'Tours guiados en kayak por la Laguna del Condado', en: 'Guided kayak tours on the Condado Lagoon' },
  },
  {
    id: 'encanto', name: 'Encanto Experiences', url: 'https://www.encantoexperiences.com/',
    photo: 'assets/photos/encanto.webp', logo: null,
    line: { es: 'Tours y una guía gratuita de Puerto Rico', en: 'Tours and a free Puerto Rico guide' },
  },
];

for (const v of venues) v.thumb = thumbOf(v.photo);
for (const x of tours) x.thumb = thumbOf(x.photo);

export const restaurants = {
  photo: 'assets/photos/restaurant-terrace.webp',
  photo2: 'assets/photos/restaurant-plate.webp',
  thumb: 'assets/thumbs/restaurant-terrace.webp',
};

// Form and screen strings.
export const ui = {
  lang: { es: 'English', en: 'Español' },
  formTitle: { es: 'Hablemos', en: "Let's talk" },
  name: { es: 'Nombre', en: 'Name' },
  company: { es: 'Empresa', en: 'Company' },
  email: { es: 'Correo electrónico', en: 'Email' },
  country: { es: 'País', en: 'Country' },
  lookingFor: { es: 'Qué buscas', en: "What you're looking for" },
  markets: { es: 'Mercados que vendes (países)', en: 'Markets you sell (countries)' },
  volume: { es: 'Volumen anual aproximado', en: 'Rough yearly volume' },
  brandsInterest: { es: 'Propiedades que te interesan', en: 'Properties you are interested in' },
  eventType: { es: 'Tipo de evento', en: 'Type of event' },
  groupSize: { es: 'Tamaño del grupo', en: 'Group size' },
  dates: { es: 'Fechas aproximadas', en: 'Rough dates' },
  party: { es: 'Personas', en: 'People' },
  message: { es: 'Mensaje (opcional)', en: 'Message (optional)' },
  wantsGuide: { es: 'Quiero la guía gratuita de Puerto Rico', en: 'Send me the free Puerto Rico guide' },
  meetDay: { es: 'Día preferido en FITUR', en: 'Preferred day at FITUR' },
  meetTime: { es: 'Hora preferida', en: 'Preferred time' },
  consent: {
    es: 'Acepto que Hibird Hospitality Group use mis datos para contactarme sobre esta consulta.',
    en: 'I agree that Hibird Hospitality Group may use my details to contact me about this inquiry.',
  },
  privacy: {
    es: 'Solo usamos estos datos para responderte. Puedes pedir que los borremos en cualquier momento.',
    en: 'We only use these details to reply to you. You can ask us to delete them at any time.',
  },
  send: { es: 'Enviar', en: 'Send' },
  thanks: { es: '¡Gracias! Te contactaremos pronto.', en: "Thank you! We'll be in touch soon." },
  queued: { es: 'Guardado. Se enviará en cuanto haya conexión.', en: "Saved. It will send as soon as there's a connection." },
  required: { es: 'Revisa nombre, correo y la casilla de consentimiento.', en: 'Please check name, email and the consent box.' },
  visitSite: { es: 'Visitar sitio', en: 'Visit site' },
  talk: { es: 'Hablemos', en: 'Talk to us' },
  intentLabel: { es: '¿Cómo prefieres conectar?', en: 'How would you like to connect?' },
  intentMeet: { es: 'Quiero reunirme en FITUR', en: 'Meet at FITUR' },
  intentAfter: { es: 'Conectemos después del evento', en: 'Connect after the event' },
  aboutPrefix: { es: 'Sobre:', en: 'About:' },
  seeMore: { es: 'Ver fotos y más', en: 'See photos and more' },
  talkAbout: { es: 'Hablar sobre esta propiedad', en: 'Talk to us about this property' },
  website: { es: 'Ver en nuestra web', en: 'See on our website' },
  close: { es: 'Cerrar', en: 'Close' },
  prev: { es: 'Anterior', en: 'Previous' },
  next: { es: 'Siguiente', en: 'Next' },
  photos: { es: 'fotos', en: 'photos' },
  contactForVenue: { es: 'Contacta con Hibird para este espacio.', en: 'Contact Hibird about this venue.' },
};

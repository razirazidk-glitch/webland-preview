/**
 * Webland.dk – 15 Eksempler på hjemmesider vi kan bygge
 * Hvert eksempel kan bruges som inspiration til enten erhverv eller private med op til 5 undersider.
 */

const TEMPLATES_DATA = [
  {
    id: "handvaerk-byg",
    image: "images/examples/handvaerk-byg.jpg",
    title: "MesterByg & Håndværk",
    category: "handvaerk",
    target: "Erhverv & Håndværkere",
    badge: "Populær til erhverv",
    accentColor: "#f59e0b", // Amber/Guld
    icon: "hammer",
    shortDesc: "Robust, tillidsskabende design til tømrere, murere, elektrikere og entreprenører.",
    fullDesc: "Dette eksempel er bygget til at konvertere besøgende til konkrete tilbudsforespørgsler. Indeholder før/efter billedsektioner, referencer, kundeanmeldelser og direkte 'Få et uforpligtende tilbud'-formular.",
    pages: [
      { name: "Forside", desc: "Hero-sektion, kerneydelser, referencer og direkte tilbudsknap" },
      { name: "Ydelser", desc: "Oversigt over fagområder (f.eks. tagrenovering, nybyg, service)" },
      { name: "Projekter & Galleri", desc: "Billeder af tidligere arbejde med før/efter fremvisning" },
      { name: "Om virksomheden", desc: "Mesterens profil, værdier, autorisationer og kvalitetssikring" },
      { name: "Kontakt & Tilbud", desc: "Formular til prisforespørgsel, telefonnummer og CVR-info" }
    ],
    highlights: ["Hurtig tilbudsknap", "Billedgalleri før/efter", "Mobilvenlig opkaldsknap", "Autorisations-badges"]
  },
  {
    id: "frisor-skoenhed",
    image: "images/examples/frisor-skoenhed.jpg",
    title: "Aura Frisør & Skønhed",
    category: "sundhed",
    target: "Klinikker & Salonér",
    badge: "Stilren & Æstetisk",
    accentColor: "#ec4899", // Pink/Rose
    icon: "sparkles",
    shortDesc: "Elegant og harmonisk design til frisørsaloner, negleklinikker og kosmetologer.",
    fullDesc: "Skabt til at udstråle velvære, ro og luksus. Gør det nemt for kunder at se behandlinger, priser, før/efter resultater og bestille tid direkte via integreret bookingknap.",
    pages: [
      { name: "Forside", desc: "Velkomst, atmosfærebilleder, fremhævede behandlinger og online booking" },
      { name: "Behandlinger & Priser", desc: "Overskueligt priskatalog med tidsangivelser og beskrivelser" },
      { name: "Om Salon/Klinik", desc: "Mød frisørerne/behandlerne, filosofi og anvendte produkter" },
      { name: "Lookbook & Galleri", desc: "Galleri med hårstyles, negledesign og kunde-makeovers" },
      { name: "Kontakt & Tidsbestilling", desc: "Adresse, åbningstider, parkering og direkte link til booking" }
    ],
    highlights: ["Direkte link til online booking", "Overskuelig prisliste", "Instagram/billedfeed", "Behandler-profiler"]
  },
  {
    id: "restaurant-cafe",
    image: "images/examples/restaurant-cafe.jpg",
    title: "Bistro & Spisehus",
    category: "butik",
    target: "Restauranter & Caféer",
    badge: "Høj konvertering",
    accentColor: "#ef4444", // Rød/Terracotta
    icon: "utensils",
    shortDesc: "Appetitvækkende design til caféer, restauranter, vinbarer og take-away steder.",
    fullDesc: "Sætter maden og stemningen i centrum. Indeholder digitalt menukort med allergener, bordbestillings-integration, åbningstider og anmeldelser fra gæster.",
    pages: [
      { name: "Forside", desc: "Visuel appetitvækker, dagsmenu, bordreservation og anmeldelser" },
      { name: "Menukort", desc: "Opdelt i frokost, aften, drikkevarer, vin og børnemenu" },
      { name: "Om os & Stemning", desc: "Historien bag køkkenet, råvarerne og kokketeamet" },
      { name: "Selskaber & Events", desc: "Muligheder for leje af lokaler, selskabsmenuer og firmafester" },
      { name: "Bordbestilling & Find vej", desc: "Bordreservering, Google Maps, p-forhold og åbningstider" }
    ],
    highlights: ["Digitalt menukort (mobilvenligt)", "Bordbestillings-knap", "Smiley-ordning integration", "Selskabsforespørgsler"]
  },
  {
    id: "advokat-juridisk",
    image: "images/examples/advokat-juridisk.jpg",
    title: "LexConsult Advokatfirma",
    category: "erhverv",
    target: "Advokater & Jurister",
    badge: "Premium B2B",
    accentColor: "#0f766e", // Teal/Mørk petroleum
    icon: "scale",
    shortDesc: "Eksklusiv, autoritativ profil til advokater, jurister og regnskabsrådgivere.",
    fullDesc: "Udstråler høj faglighed, diskretion og juridisk tyngde. Struktureret med klare specialer, partnerprofiler og direkte formular til indledende sagsvurdering.",
    pages: [
      { name: "Forside", desc: "Værdigrundlag, juridiske kompetenceområder og hurtig kontakt" },
      { name: "Specialer & Rådgivning", desc: "Erhvervsret, familieret, ejendomshandler, kontrakter og tvister" },
      { name: "Vores Advokater", desc: "Advokaternes baggrund, beskikkelse, møderet og publikationer" },
      { name: "Priser & Salærberegning", desc: "Gennemskuelig information om salærer, retshjælp og fri proces" },
      { name: "Kontakt & Sagshenvendelse", desc: "Sikker kontaktformular, krypteret mail, telefon og mødelokaler" }
    ],
    highlights: ["Specialevælger", "Diskret sagsforespørgsel", "Advokatbeskikkelser", "Troværdighedsdesign"]
  },
  {
    id: "fysioterapi-sundhed",
    image: "images/examples/fysioterapi-sundhed.jpg",
    title: "Klinik Sundhed & Fysio",
    category: "sundhed",
    target: "Fysioterapeuter & Kiropraktorer",
    badge: "Sundhedsfaglig",
    accentColor: "#0284c7", // Sky blue
    icon: "heart-pulse",
    shortDesc: "Imødekommende og professionel platform for sundhedsklinikker og behandlere.",
    fullDesc: "Fokus på tryghed, sundhedsfaglig ekspertise og nem tidsbestilling. Fremhæver tilskudsmuligheder (f.eks. Danmark og den offentlige sygesikring).",
    pages: [
      { name: "Forside", desc: "Fokus på smertefri hverdag, behandlingsformer og akut tidsbestilling" },
      { name: "Behandlinger", desc: "Fysioterapi, manuel terapi, genoptræning, chokbølge og holdtræning" },
      { name: "Behandlerne", desc: "Sygesikringsautorisation, efteruddannelser og specialer" },
      { name: "Priser & Tilskud", desc: "Oversigt over takster, Sygeforsikring 'danmark' og forsikringsselskaber" },
      { name: "Tidsbestilling & Kontakt", desc: "Klinikkens placering, handikapvenlig adgang og bookinglink" }
    ],
    highlights: ["Sygesikring/danmark information", "Tidsbestilling online", "Behandler-oversigt", "Fysisk tilgængelighedsguide"]
  },
  {
    id: "fitness-coach",
    image: "images/examples/fitness-coach.jpg",
    title: "IronFit & Performance Coach",
    category: "kreativ",
    target: "Personlige Trænere & Fitness",
    badge: "Høj energi",
    accentColor: "#f97316", // Orange
    icon: "dumbbell",
    shortDesc: "Motiverende og dynamisk hjemmeside til personlige trænere, kostvejledere og coaches.",
    fullDesc: "Højt energiniveau med fokus på resultater, transformationshistorier, forløbspakker og ansøgning om et uforpligtende afklaringsopkald.",
    pages: [
      { name: "Forside", desc: "Stærk headline, transformationskarrusel, filosofi og 'Start din rejse'" },
      { name: "Træningsforløb", desc: "1-til-1 forløb, online coaching, vægttab og styrkeløft" },
      { name: "Resultater & Klienter", desc: "Før/efter fotos, vægttabstal og video-testimonials" },
      { name: "Om din Coach", desc: "Certificeringer, sportslig baggrund og tilgang til kost og vaner" },
      { name: "Ansøg om Forløb", desc: "Kvalificeringsformular til uforpligtende screeningssamtale" }
    ],
    highlights: ["Transformationsgalleri", "Forløbs-kalkulator", "Ansøgningsskema", "Video-udtalelser"]
  },
  {
    id: "arkitekt-design",
    image: "images/examples/arkitekt-design.jpg",
    title: "Nordic Arkitektur & Rum",
    category: "erhverv",
    target: "Arkitekter & Designstudier",
    badge: "Minimalistisk",
    accentColor: "#64748b", // Slate
    icon: "compass",
    shortDesc: "Sublim, minimalistisk portfolio til arkitekter, indretningsdesignere og landskabstegnestuer.",
    fullDesc: "Rene linjer, store fotoflader og typografisk præcision. Lader projekterne tale for sig selv med detaljerede case studies og plantegningssektioner.",
    pages: [
      { name: "Forside", desc: "Fullscreen billedflow, udvalgte projekter og tegnestuens manifest" },
      { name: "Projekter & Portfolio", desc: "Filtrér på villaer, erhvervsbyggeri, renovering og interiør" },
      { name: "Ydelser & Proces", desc: "Fra skitseforslag og myndighedsgodkendelse til byggeledelse" },
      { name: "Om Tegnestuen", desc: "Mød arkitekterne, priser, bæredygtighedsprincipper og awards" },
      { name: "Kontakt & Dialog", desc: "Kontoradresse, projekthenvendelser og uforpligtende kaffemøde" }
    ],
    highlights: ["Fuldskærms fotogalleri", "Case-beskrivelser", "Minimalistisk typografi", "Projekt-specifikationer"]
  },
  {
    id: "revisor-bogholderi",
    image: "images/examples/revisor-bogholderi.jpg",
    title: "Tal & Rådgivning Statsautoriseret",
    category: "erhverv",
    target: "Revisorer & Bogholdere",
    badge: "Troværdig B2B",
    accentColor: "#1e3a8a", // Dyb blå
    icon: "calculator",
    shortDesc: "Pålidelig og seriøs hjemmeside til revisionsvirksomheder, bogholdere og skatteeksperter.",
    fullDesc: "Bygget til at skabe tryghed om økonomistyring. Præsenterer faste månedspakker, rådgivningsydelser og nem upload/kontakt for nye klienter.",
    pages: [
      { name: "Forside", desc: "Professionelt overblik, kerneydelser for SMV'er og kontakt" },
      { name: "Ydelser & Pakker", desc: "Årsregnskab, momsindberetning, bogføring, skat og lønadministration" },
      { name: "Faste Priser & Modeller", desc: "Gennemskuelige månedlige abonnementspakker til selvstændige" },
      { name: "Vores Team", desc: "Registrerede/statsautoriserede revisorer og rådgivere" },
      { name: "Kontakt & Kundelogin", desc: "Kontaktinfo, mødebooking og links til regnskabssystemer" }
    ],
    highlights: ["Prispakker til SMV", "Frist-kalender for moms", "Mødebooking", "Sikker henvendelsesformular"]
  },
  {
    id: "butik-showroom",
    image: "images/examples/butik-showroom.jpg",
    title: "LokalButik & Galleri",
    category: "butik",
    target: "Specialbutikker & Showrooms",
    badge: "Lokal handel",
    accentColor: "#10b981", // Emerald
    icon: "shopping-bag",
    shortDesc: "Indbydende digital facade for fysiske butikker, delikatesseforretninger og showrooms.",
    fullDesc: "Kombinerer fysisk butiksfremvisning med digital tilstedeværelse. Viser udvalgte varer, mærker, events og gør det let for kunder at finde butikken.",
    pages: [
      { name: "Forside", desc: "Billeder fra butikken, sæsonens nyheder og velkomst" },
      { name: "Varesortiment & Brands", desc: "Katalog over udvalgte produkter, mærker og unikke varer" },
      { name: "Om Butikken", desc: "Historien om butiksejeren, passionen for håndplukkede produkter" },
      { name: "Arrangementer & Nyheder", desc: "Vinsmagninger, kundeaftener og workshops i butikken" },
      { name: "Besøg Os & Åbningstider", desc: "Adresse, parkering, åbningstider og click & collect henvendelse" }
    ],
    highlights: ["Brand-showcase", "Katalog uden webshop-bøvl", "Eventkalender", "Rutevejledning & åbningstider"]
  },
  {
    id: "fotograf-portfolio",
    image: "images/examples/fotograf-portfolio.jpg",
    title: "Lumiere Foto & Studio",
    category: "kreativ",
    target: "Fotografer & Videografer",
    badge: "Visuelt mesterværk",
    accentColor: "#8b5cf6", // Lilla/Violet
    icon: "camera",
    shortDesc: "Billedbåret portefølje til bryllupsfotografer, erhvervsfotografer og kreative.",
    fullDesc: "Et visuelt lærred der fremhæver dine bedste skud. Hurtig indlæsning, elegante gallerier med lightbox-effekt og enkel forespørgselsformular.",
    pages: [
      { name: "Forside", desc: "Imponerende billedgrid, signatur-stil og hurtig bookingknap" },
      { name: "Portfolio & Serier", desc: "Opdelt i Bryllup, Portrætter, Erhverv og Mode" },
      { name: "Pakker & Investeringer", desc: "Gennemskuelige fotopakker med antal billeder og leveringstid" },
      { name: "Om Fotografen", desc: "Personlig fortælling, udstyr og tilgang bag kameraet" },
      { name: "Book Fotografering", desc: "Dato-forespørgsel og kontaktformular til kommende sessions" }
    ],
    highlights: ["Lightbox billedvisning", "Pakkeoversigt", "Dato-forespørgsel", "Mørkt/lyst luksustema"]
  },
  {
    id: "b2b-konsulent",
    image: "images/examples/b2b-konsulent.jpg",
    title: "Vanguard Management Consult",
    category: "erhverv",
    target: "Management & B2B Konsulenter",
    badge: "C-Level Fokus",
    accentColor: "#1e293b", // Navy/Dark slate
    icon: "briefcase",
    shortDesc: "Strategisk og resultatorienteret platform til konsulenter, rådgivere og interim managers.",
    fullDesc: "Optimeret til at skabe troværdighed over for direktioner og bestyrelser. Fremhæver metoder, cases med målbare KPI'er og thought leadership.",
    pages: [
      { name: "Forside", desc: "Skarp værdiproposition, kernekompetencer og kundeliste" },
      { name: "Rådgivningsydelser", desc: "Strategi, digital transformation, procesoptimering og vækst" },
      { name: "Cases & Dokumenterede Resultater", desc: "Konkrete cases med omsætningsvækst og effektivisering" },
      { name: "Om Konsulenten / Partnerne", desc: "CV, tidligere ledelsesposter, bestyrelsesposter og uddannelse" },
      { name: "Kontakt & Sparringsmøde", desc: "Book 30 minutters uforpligtende strategisk sparringsmøde" }
    ],
    highlights: ["KPI-resultatbokse", "Case studies", "Direkte kalender-booking", "Executive layout"]
  },
  {
    id: "ejendomsmaegler",
    image: "images/examples/ejendomsmaegler.jpg",
    title: "BoligMatch Ejendomsrådgivning",
    category: "erhverv",
    target: "Ejendomsmæglere & Udlejere",
    badge: "Salgsfokuseret",
    accentColor: "#059669", // Skovgrøn
    icon: "home",
    shortDesc: "Moderne og overbevisende hjemmeside til uafhængige ejendomsmæglere og udlejningsejendomme.",
    fullDesc: "Præsenterer boliger med flotte billeder, plantegninger og nøgledata. Giver boligsøgende og sælgere nem adgang til en gratis salgsvurdering.",
    pages: [
      { name: "Forside", desc: "Søg bolig, fremhævede ejendomme og 'Bestil gratis salgsvurdering'" },
      { name: "Aktuelle Boliger til Salg", desc: "Boligoversigt med pris, kvadratmeter, energimærke og fotos" },
      { name: "Sælg din Bolig", desc: "Vores salgsmetode, markedsføringspakke og mæglersalærer" },
      { name: "Om Mæglerteamet", desc: "Mød de lokale mæglere, lokalkendskab og anbefalinger" },
      { name: "Bestil Vurdering & Kontakt", desc: "Formular til vurdering og kontaktinfo på mæglerne" }
    ],
    highlights: ["Bestil gratis vurdering", "Boligkort med filter", "Plantegningsvisning", "Anbefalinger fra boligsælgere"]
  },
  {
    id: "rengoering-service",
    image: "images/examples/rengoering-service.jpg",
    title: "RenGlans Ejendomsservice",
    category: "handvaerk",
    target: "Rengøringsfirmaer & Service",
    badge: "Effektiv & Ren",
    accentColor: "#0ea5e9", // Ren lyseblå
    icon: "sparkle",
    shortDesc: "Frisk og tillidsskabende hjemmeside til erhvervsrengøring, privatrengøring og ejendomsservice.",
    fullDesc: "Understreger pålidelighed, miljøvenlige rengøringsmidler og stabil drift. Nem kontakt og formular til fast serviceaftale.",
    pages: [
      { name: "Forside", desc: "Renhed og tillid, vores services og hurtig prisberegner/forespørgsel" },
      { name: "Erhvervsrengøring", desc: "Kontorrengøring, trappevask, vinduespolering og håndværkerrengøring" },
      { name: "Privatrengøring & Hjemmeservice", desc: "Fast ugentlig rengøring, flytterengøring og håndværkerfradrag" },
      { name: "Kvalitet & Miljøgaranti", desc: "Svanemærkede produkter, fast personale og forsikringsforhold" },
      { name: "Få et Tilbud & Kontakt", desc: "Nem formular med valg af kvadratmeter og rengøringstype" }
    ],
    highlights: ["Forespørgselsberegner", "Miljøcertificeringer", "Dækker både privat & erhverv", "Faste aftaler"]
  },
  {
    id: "musiker-kunstner",
    image: "images/examples/musiker-kunstner.jpg",
    title: "Nordic Sound & Kunst",
    category: "kreativ",
    target: "Kunstnere, Musikere & Kreative",
    badge: "Kreativ & Autentisk",
    accentColor: "#d97706", // Ravngul
    icon: "music",
    shortDesc: "Ekspressiv hjemmeside til musikere, bands, billedkunstnere og performere.",
    fullDesc: "Perfekt platform for kunstnerisk udtryk. Vis dine kunstværker eller musikudgivelser, koncertdatoer og direkte bookingmulighed for spillesteder og arrangører.",
    pages: [
      { name: "Forside", desc: "Seneste release/værk, videoafspiller, bio-intro og tour-datoer" },
      { name: "Værker / Diskografi", desc: "Kunstkatalog med malerier/skulpturer eller albumoversigt med lytte-links" },
      { name: "Koncerter & Udstillinger", desc: "Kommende optrædener, spillesteder og billetlinks" },
      { name: "Biografi & Pressemateriale", desc: "Kunstnerens historie, anmeldelser og download af high-res pressebilleder" },
      { name: "Booking & Købsforespørgsel", desc: "Direkte henvendelse for booking til koncerter eller køb af kunst" }
    ],
    highlights: ["Tour- & udstillingsliste", "Medieafspiller integration", "Pressekit (EPK)", "Købs- & bookingformular"]
  },
  {
    id: "forening-klub",
    image: "images/examples/forening-klub.jpg",
    title: "Klub Liv & Fællesskab",
    category: "kreativ",
    target: "Foreninger, Sportsklubber & Netværk",
    badge: "Fællesskabsfokus",
    accentColor: "#2563eb", // Sportsblå
    icon: "users",
    shortDesc: "Livlig og overskuelig hjemmeside til idrætsforeninger, grundejerforeninger og klubber.",
    fullDesc: "Samler medlemmerne og gør det let for nye at melde sig ind. Indeholder træningstider, holdoversigt, nyheder og sponsorpræsentation.",
    pages: [
      { name: "Forside", desc: "Fællesskab, næste kampe/arrangementer, nyheder og 'Meld dig ind'" },
      { name: "Hold & Træningstider", desc: "Oversigt over aldersgrupper, trænere, lokationer og kontingent" },
      { name: "Arrangementer & Kalender", desc: "Klubstævner, generalforsamling, sommerfester og turneringer" },
      { name: "Om Foreningen & Bestyrelse", desc: "Værdier, vedtægter, bestyrelsesmedlemmer og sponsorer" },
      { name: "Bliv Medlem & Kontakt", desc: "Indmeldelsesformular, prøvetræning og kontakt til formand" }
    ],
    highlights: ["Hold- & holdlederliste", "Indmeldelsesformular", "Sponsorvæg", "Aktivitetskalender"]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = TEMPLATES_DATA;
}

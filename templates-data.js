/**
 * Webland.dk – 25 Eksempler på hjemmesider vi kan bygge
 * Hvert eksempel kan bruges som inspiration til enten erhverv eller private med op til 5 undersider.
 * Opdelt i 5 balancerede kategorier á 5 eksempler:
 * 1. Luksus, Livsstil & Fancy (luksus)
 * 2. Håndværk & Service (handvaerk)
 * 3. Gastronomi & Oplevelser (gastronomi)
 * 4. Sundhed, Velvære & Praksis (sundhed)
 * 5. Erhverv, Finans & B2B (erhverv)
 */

const TEMPLATES_DATA = [
  // =========================================================================
  // KATEGORI 1: LUKSUS, LIVSSTIL & FANCY (5)
  // =========================================================================
  {
    id: "smykkebutik-guld",
    image: "images/examples/smykkebutik-guld.jpg",
    title: "Aurum Fine Jewelry & Diamanter",
    category: "luksus",
    target: "Eksklusive Guldsmede & Smykkedesignere",
    badge: "Fancy Luksus & Guld",
    accentColor: "#d4af37", // Champagne Guld
    icon: "sparkles",
    shortDesc: "Kompromisløst luksusdesign med svungen kursiv typografi, diamantkatalog og privat concierge kontaktformular.",
    fullDesc: "Skabt til eksklusive guldsmede, diamantstudier og bespoke luksusbrands. Indeholder mørk obsidian-baggrund, guldaccenter, detaljeret ædelstens-specifikation (carat, slibning, klarhed), lookbook og direkte formular til privat VIP-tidsbestilling.",
    pages: [
      { name: "Forside", desc: "Hero med svungen kalligrafi, udvalgte diamantsmykker og VIP concierge forespørgsel" },
      { name: "Kollektioner", desc: "Håndlavede ringe, halskæder, armbånd og vielsesringe i 18k guld & platin" },
      { name: "Bespoke & Diamanter", desc: "Specialfremstilling på eget værksted, certificerede diamanter og gemmologi" },
      { name: "Om Guldsmeden", desc: "Mesterens håndværkstradition, bæredygtigt genanvendt guld og atelier" },
      { name: "Privat Tidsbestilling", desc: "Forespørgsel på diskret rådgivning i salonen eller privat fremvisning via formular" }
    ],
    highlights: ["Svungen kursiv luksustypografi", "Privat Concierge kontaktformular", "Diamant & Carat specifikationer", "Højopløseligt smykkegalleri"]
  },
  {
    id: "boutique-hotel",
    image: "images/examples/boutique-hotel.jpg",
    title: "Maison Kyst & Badehotel",
    category: "luksus",
    target: "Boutique Hoteller, B&B & Badehoteller",
    badge: "Eksklusiv Atmosfære",
    accentColor: "#0ea5e9", // Kystblå
    icon: "compass",
    shortDesc: "Stemningsfuldt luksusdesign med havudsigt, værelsesoversigt og direkte værelsesreservation.",
    fullDesc: "Designet til boutique hoteller, badehoteller og gourmetophold. Udstråler ro, sanselighed og luksus med integreret datovælger, suite-oversigt, wellnesspræsentation og gæsteanmeldelser.",
    pages: [
      { name: "Forside", desc: "Panoramisk havudsigt, stemningsvideo, datovælger og opholdspakker" },
      { name: "Værelser & Suiter", desc: "Strandsuiter, badehytter og deluxe værelser med faciliteter og priser" },
      { name: "Gastronomi", desc: "Hotellets restaurant, lokale råvarer og vinkælder" },
      { name: "Spa & Wellness", desc: "Saunagus, opvarmet saltvandspool og kropsbehandlinger" },
      { name: "Reservation & Kontakt", desc: "Direkte forespørgsel via formular, gavekort og kørselsvejledning" }
    ],
    highlights: ["Direkte datovælger", "Suite- & værelseskatalog", "Spa- & menukort", "Gavekort-forespørgsel"]
  },
  {
    id: "frisor-skoenhed",
    image: "images/examples/frisor-skoenhed.jpg",
    title: "Aura Frisør & Luksus Spa",
    category: "luksus",
    target: "Klinikker, Frisørsaloner & Spa",
    badge: "Stilren & Æstetisk",
    accentColor: "#ec4899", // Rose
    icon: "sparkles",
    shortDesc: "Harmonisk luksusdesign med svungne seriffer til frisørsaloner, neglestudier og kosmetologer.",
    fullDesc: "Skabt til at udstråle velvære, ro og luksus. Gør det nemt for kunder at se behandlinger, priser, før/efter resultater og anmode om tid via kontaktformular (eller henvise til dit eksterne system).",
    pages: [
      { name: "Forside", desc: "Velkomst med svungen typografi, atmosfærebilleder og kontaktformular" },
      { name: "Behandlinger & Priser", desc: "Klip, farvning, balayage, kurbehandlinger og herreklip med faste priser" },
      { name: "Team & Stylister", desc: "Præsentation af salonens frisører, specialeområder og erfaring" },
      { name: "Lookbook & Galleri", desc: "Galleri med hårstyles, negledesign og kunde-makeovers" },
      { name: "Kontakt & Tidsbestilling", desc: "Adresse, åbningstider, parkering og formular til tidsforespørgsel" }
    ],
    highlights: ["Formular til tidsforespørgsel", "Overskuelig prisliste", "Instagram lookbook feed", "Behandler-profiler"]
  },
  {
    id: "arkitekt-design",
    image: "images/examples/arkitekt-design.jpg",
    title: "Atelier Nord Arkitekter",
    category: "luksus",
    target: "Arkitekter & Designstudier",
    badge: "Minimalistisk Monograf",
    accentColor: "#94a3b8", // Sten/Krom
    icon: "pencil",
    shortDesc: "Rene linjer, store fotoflader og bygningsspecifikationer til tegnestuer og formgivere.",
    fullDesc: "Lader projekterne tale for sig selv med detaljerede case studies, plantegninger, areal- og energispecifikationer samt arkitekturpriser.",
    pages: [
      { name: "Forside", desc: "Fuldskærms monograf-hero, seneste realiserede villabyggeri og filosofi" },
      { name: "Værker & Projekter", desc: "Arkiv over private boliger, erhvervsbyggeri og transformationer" },
      { name: "Tegnestuen & Metode", desc: "Partnere, bæredygtighedsprincipper og tegnestuens historie" },
      { name: "Plantegninger & Proces", desc: "Fra skitsering og byggetilladelse til færdigt byggeri" },
      { name: "Kontakt", desc: "Mød tegnestuen i København og Aarhus for en indledende samtale" }
    ],
    highlights: ["Fuldskærms fotogalleri", "Plantegningsvisning", "Mies van der Rohe awards", "Bygnings-specifikationer"]
  },
  {
    id: "fotograf-portfolio",
    image: "images/examples/fotograf-portfolio.jpg",
    title: "Lumière Foto & Studio",
    category: "luksus",
    target: "Fotografer & Videografer",
    badge: "Visuelt Mesterværk",
    accentColor: "#e2e8f0", // Platin
    icon: "camera",
    shortDesc: "Cinematisk 4-paneler galleri til bryllups-, mode- og portrætfotografer.",
    fullDesc: "Et visuelt lærred der fremhæver dine bedste skud. Hurtig indlæsning, elegante gallerier med lightbox-effekt og enkel forespørgselsformular.",
    pages: [
      { name: "Forside", desc: "4 fuldskærms fotopaneler med øjeblikkelig adgang til serierne" },
      { name: "Bryllup & Kærlighed", desc: "Dokumentarisk dækning af den store dag med heldagsreportager" },
      { name: "Portræt & Erhverv", desc: "C-level erhvervsportrætter, kunstnerportrætter og LinkedIn branding" },
      { name: "Priser & Pakker", desc: "Transparente pakker, tidsestimater og digitale leverancer" },
      { name: "Forespørgsel & Kontakt", desc: "Dato-forespørgsel via formular og direkte kontaktinfo" }
    ],
    highlights: ["Lightbox billedvisning", "Pakkeoversigt", "Dato-forespørgsel", "4-paneler split layout"]
  },

  // =========================================================================
  // KATEGORI 2: HÅNDVÆRK & SERVICE (5)
  // =========================================================================
  {
    id: "handvaerk-byg",
    image: "images/examples/handvaerk-byg.jpg",
    title: "MesterByg & Tømrer",
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
    id: "rengoering-service",
    image: "images/examples/rengoering-service.jpg",
    title: "Klar & Rent Ejendomsservice",
    category: "handvaerk",
    target: "Rengøringsselskaber & Ejendomsservice",
    badge: "Hurtig Prisberegner",
    accentColor: "#0284c7", // Himmelblå
    icon: "sparkles",
    shortDesc: "Frisk, hygiejnisk design med interaktiv prisberegner til privat- og erhvervsrengøring.",
    fullDesc: "Gør det lynhurtigt for kunder at beregne en vejledende månedspris ud fra kvadratmeter og frekvens, med nem formular til uforpligtende tilbud.",
    pages: [
      { name: "Forside", desc: "Interaktiv 30-sekunders prisberegner, miljøgarantier og gratis prøve" },
      { name: "Erhvervsrengøring", desc: "Kontorrengøring, klinikrengøring, trappevask og håndværkerfradrag" },
      { name: "Privat Rengøring", desc: "Fast assistent, ugentlig eller 14-dages rengøring af private hjem" },
      { name: "Miljø & Svanemærke", desc: "Vores skånsomme kemikaliefrie produkter og bæredygtighedspolitik" },
      { name: "Få et Tilbud & Kontakt", desc: "Forespørgsel på uforpligtende besigtigelse eller tilbud via formular" }
    ],
    highlights: ["Kvadratmeter prisberegner", "Svanemærket badge", "Fast assistent garanti", "Uforpligtende tilbudsformular"]
  },
  {
    id: "auto-vaerksted",
    image: "images/examples/auto-vaerksted.jpg",
    title: "Nordic Auto & Performance",
    category: "handvaerk",
    target: "Autoværksteder, Dækcentre & Bilpleje",
    badge: "Hurtig Serviceformular",
    accentColor: "#ef4444", // Race rød
    icon: "hammer",
    shortDesc: "Moderne, maskulint værkstedsdesign med nummerplade-opslag og online serviceformular.",
    fullDesc: "Bygget til uafhængige autoværksteder og dækcentre. Giver kunden overblik over timepriser, fabriksgaranti, lånebil og direkte online tidsbestilling.",
    pages: [
      { name: "Forside", desc: "Hurtig serviceformular, nummerplade-felt, lånebil og fabriksgaranti" },
      { name: "Ydelser & Syn", desc: "Stort/lille serviceeftersyn, dækskift, bremseservice, aircondition og synstjek" },
      { name: "Specialer & Tuning", desc: "Fejlfinding med avanceret tester, 4-hjulsudmåling og motoroptimering" },
      { name: "Om Værkstedet", desc: "Uddannede mekanikere, moderne værkstedsfaciliteter og godkendt garanti" },
      { name: "Bestil Service & Kontakt", desc: "Kontaktformular til service med dato- og lånebilsvalg" }
    ],
    highlights: ["Online serviceformular", "Lånebils-garanti", "Fabriksgaranti bevares", "Fast pris på dækskift"]
  },
  {
    id: "anlaeg-have",
    image: "images/examples/anlaeg-have.jpg",
    title: "Grønne Linjer Have & Brolægning",
    category: "handvaerk",
    target: "Anlægsgartnere, Brolæggere & Havearkitekter",
    badge: "Flot Før/Efter Galleri",
    accentColor: "#10b981", // Skovgrøn
    icon: "leaf",
    shortDesc: "Naturstærkt design med fokus på billeder af nyanlagte haver, flisebelægninger og terrasser.",
    fullDesc: "Inspirerer husejere og virksomheder til omlægning af udendørsarealer. Viser omfattende før/efter-referencer, havetegninger og nem kontaktformular.",
    pages: [
      { name: "Forside", desc: "Flotte havebilleder, sæsonopgaver, tilbudsformular og anmeldelser" },
      { name: "Brolægning & Terrasser", desc: "Indkørsler, flisearbejde, støttemure og eksklusive træterrasser" },
      { name: "Havedesign & Græs", desc: "Rullegræs, beplantningsplaner, hækklipning og fældning" },
      { name: "Referencer & Galleri", desc: "Filtrerbare billeder af realiserede haveprojekter med før/efter slider" },
      { name: "Få Havebesøg & Tilbud", desc: "Bestil et gratis og uforpligtende konsulentbesøg i haven" }
    ],
    highlights: ["Før/Efter billedgalleri", "Gratis havebesøg formular", "Sæsonguide", "Kvalitetsgaranti på belægning"]
  },
  {
    id: "el-vvs",
    image: "images/examples/el-vvs.jpg",
    title: "Volt & Strøm Aut. Installatør",
    category: "handvaerk",
    target: "Autoriserede El-installatører & VVS",
    badge: "Døgnvagt & Sikkerhed",
    accentColor: "#06b6d4", // Cyan
    icon: "zap",
    shortDesc: "Højteknologisk og tillidsvækkende design med døgnvagts-badge, varmepumper og el-ladere.",
    fullDesc: "Optimeret til el- og VVS-installatører der vil have henvendelser på varmepumper, ladestandere, badeværelsesrenoveringer og akut døgnservice.",
    pages: [
      { name: "Forside", desc: "Akut døgnvagts-banner, kernekompetencer, autorisationslogoer og tilbud" },
      { name: "El-installation & Ladere", desc: "Tavlerenovering, intelligente hjem, belysning og elbil-ladestandere" },
      { name: "VVS & Varmepumper", desc: "Luft-til-vand varmepumper, gulvvarme, fjernvarme og rørinstallation" },
      { name: "Badeværelsesrenovering", desc: "Totalentrepriser på badeværelser med fast pris og tidsplan" },
      { name: "Akut Døgnvagt & Kontakt", desc: "Direkte nødopkaldsknap og formular til planlagte tilbud" }
    ],
    highlights: ["Direkte døgnvagts-opkald", "Grøn energi beregner", "Sikkerhedsgodkendt badge", "Fastpristilbud"]
  },

  // =========================================================================
  // KATEGORI 3: GASTRONOMI & OPLEVELSER (5)
  // =========================================================================
  {
    id: "restaurant-cafe",
    image: "images/examples/restaurant-cafe.jpg",
    title: "Bistro & Gourmet Spisehus",
    category: "gastronomi",
    target: "Restauranter, Caféer & Vinbarer",
    badge: "Høj Konvertering",
    accentColor: "#ef4444", // Terracotta
    icon: "utensils",
    shortDesc: "Appetitvækkende design med svungne seriffer, digitalt menukort og bordreservation.",
    fullDesc: "Sætter maden og stemningen i centrum. Indeholder digitalt menukort med allergener, bordbestillings-integration, åbningstider og anmeldelser fra gæster.",
    pages: [
      { name: "Forside", desc: "Visuel appetitvækker, dagsmenu, bordreservation og anmeldelser" },
      { name: "Menukort", desc: "Opdelt i frokost, aften, drikkevarer, vin og børnemenu" },
      { name: "Om os & Stemning", desc: "Vores historie, kokketeam, råvarer og atmosfærebilleder" },
      { name: "Selskaber & Events", desc: "Fødselsdage, bryllupper, firmafester og private dining" },
      { name: "Bordbestilling & Find vej", desc: "Bordforespørgsel via formular (eller knap til dit eksterne system), åbningstider og kort" }
    ],
    highlights: ["Digitalt menukort", "Bordbestilling knap", "Selskabspakker", "Gavekort & Google Anmeldelser"]
  },
  {
    id: "bageri-kaffebar",
    image: "images/examples/bageri-kaffebar.jpg",
    title: "Korn & Krumme Håndværksbageri",
    category: "gastronomi",
    target: "Bagerier, Kaffebarer & Konditorier",
    badge: "Lunt Håndværk",
    accentColor: "#d97706", // Bagt gylden
    icon: "coffee",
    shortDesc: "Varmt, duftende surdejsdesign med dagens brød-tavle, kaffekort og kagebestilling.",
    fullDesc: "Hyggeligt og lokalt forankret design til artisan-bagerier og specialkaffebarer. Giver kunderne lyst til at kigge forbi og gør det nemt at forudbestille kager og mødebrød.",
    pages: [
      { name: "Forside", desc: "Dagens surdejsbrød og wienerbrød, åbningstider og bageriets hjerte" },
      { name: "Brød & Bagværk", desc: "Surdejsbrød, rugbrød, croissanter og sæsonens kager med meltyper" },
      { name: "Kaffebar & Menu", desc: "Specialristet kaffe, matcha, chai, friskpresset juice og morgenmad" },
      { name: "Kagebestilling & Fest", desc: "Bestil lagkager, kagemænd og mødeforplejning med 24t varsel" },
      { name: "Find Butikken", desc: "Kort, morgenglad åbningstid, parkering og bestillingsafhentning" }
    ],
    highlights: ["Dagens brød status", "Kagebestillingsformular", "Specialkaffe smagsnoter", "Morgen-åbningstider"]
  },
  {
    id: "cocktail-vinbar",
    image: "images/examples/cocktail-vinbar.jpg",
    title: "Velvet & Vine Cocktail Lounge",
    category: "gastronomi",
    target: "Cocktailbarer, Vinbarer & Natklubber",
    badge: "Stemningsfuld Aften",
    accentColor: "#be123c", // Dyb rødvin
    icon: "wine",
    shortDesc: "Dunkel, eksklusiv velour-stemning med cocktailkort, smagninger og VIP bordforespørgsel.",
    fullDesc: "Udviklet til high-end barer og lounges med dæmpet belysning, cocktail-opskrifter, vinkort og arrangementsforespørgsel til vinsmagninger og firmafester.",
    pages: [
      { name: "Forside", desc: "Stemningsfuld hero, ugens signaturcocktail, DJ-aftener og reservation" },
      { name: "Cocktails & Drinks", desc: "Håndrørte cocktails med ingredienser, mocktails og spiritussamling" },
      { name: "Vinkort & Snacks", desc: "Naturvine, klassiske cru-vine og charcuteri-brætter" },
      { name: "Vinsmagning & Private Events", desc: "Forespørgsel på privat bartender, cocktailkursus eller vinsmagning via formular" },
      { name: "Bordreservation & Kontakt", desc: "Reserver bord til i aften, aldersgrænse og dresscode" }
    ],
    highlights: ["Digitalt cocktailkort", "Vinsmagningspakker", "VIP bordforespørgsel", "Eventkalender med DJ's"]
  },
  {
    id: "musiker-kunstner",
    image: "images/examples/musiker-kunstner.jpg",
    title: "Elias Vang // Lydkunst & Koncert",
    category: "gastronomi",
    target: "Musikere, Bands & Scenekunstnere",
    badge: "Lydbølge & Tourliste",
    accentColor: "#e11d48", // Neon rød
    icon: "music",
    shortDesc: "Elektronisk natmørkt design med integreret lydbølgeform, tour-datoer og vinylbestilling.",
    fullDesc: "Giver musikere og scenekunstnere en professionel scene på nettet til koncertforespørgsler, pladelanceringer, pressekit (EPK) og koncertkalender.",
    pages: [
      { name: "Forside", desc: "Fremhævet single release med lydbølge, Spotify-link og næste koncerter" },
      { name: "Releases & Diskografi", desc: "Albumoversigt, vinylkatalog, streamingtjenester og lyrik" },
      { name: "Tour & Koncerter", desc: "Datoer, spillesteder, festivaler og direkte billetkøb med 'Udsolgt'-status" },
      { name: "Biografi & Pressemateriale", desc: "Kunstnerens historie, EPK, anmeldelser og download af pressefotos" },
      { name: "Koncertforespørgsel & Kontakt", desc: "Kontaktformular til koncerter, festivaler og kommercielle samarbejder" }
    ],
    highlights: ["Lydbølgeform afspiller", "Tourliste med billetknapper", "Elektronisk pressekit", "Spotify integration"]
  },
  {
    id: "forening-klub",
    image: "images/examples/forening-klub.jpg",
    title: "Fjordbyens Idrætsforening",
    category: "gastronomi",
    target: "Foreninger, Sportsklubber & Netværk",
    badge: "Fællesskabsfokus",
    accentColor: "#1d4ed8", // Sportsblå
    icon: "users",
    shortDesc: "Energisk idrætsportal med kamp-banner, holdtræning, svømmeskole og sponsorvæg.",
    fullDesc: "Samler medlemmerne og gør det let for nye at melde sig ind. Indeholder træningstider, holdoversigt for alle aldre, næste hjemmekamp og sponsorpræsentation.",
    pages: [
      { name: "Forside", desc: "Fællesskab, næste kampe, live match widget og 'Meld dig ind'" },
      { name: "Hold & Træningstider", desc: "Fodbold, håndbold, svømmeskole og motion med trænere og lokationer" },
      { name: "Aktiviteter & Kalender", desc: "Stævner, klubfester, generalforsamling og turneringer" },
      { name: "Klubhuset & Bestyrelse", desc: "Værdier, vedtægter, bestyrelsesmedlemmer og baneregler" },
      { name: "Bliv Medlem & Sponsor", desc: "Indmeldelsesformular, prøvetræning og sponsoroversigt" }
    ],
    highlights: ["Næste kamp-widget", "4 sportsafdelinger", "Indmeldelsesformular", "Sponsorvæg"]
  },

  // =========================================================================
  // KATEGORI 4: SUNDHED, VELVÆRE & PRAKSIS (5)
  // =========================================================================
  {
    id: "fysioterapi-sundhed",
    image: "images/examples/fysioterapi-sundhed.jpg",
    title: "Klinik Sundhed & Fysio",
    category: "sundhed",
    target: "Fysioterapeuter, Kiropraktorer & Osteopater",
    badge: "Klinisk Tidsbestilling",
    accentColor: "#059669", // Mintgrøn
    icon: "activity",
    shortDesc: "Troværdigt, klinisk design med online tidsbestilling og sygesikringstilskud.",
    fullDesc: "Henvender sig til autoriserede sundhedsfaglige behandlere. Sætter fokus på smertelindring, evidensbaserede behandlinger, tilskud fra 'danmark' og nem formular til tidsbestilling.",
    pages: [
      { name: "Forside", desc: "Kernebehandlinger, hurtig tidsbestilling, patientanmeldelser og akut-tider" },
      { name: "Behandlinger & Ydelser", desc: "Manuel terapi, idrætsfysioterapi, chokbølge og ryghold" },
      { name: "Behandlere & Filosofi", desc: "Mød fysioterapeuterne med specialer, erfaring og uddannelse" },
      { name: "Priser & Tilskud", desc: "Overenskomst med Sygesikringen, 'danmark' takster og forsikringsdækning" },
      { name: "Tidsbestilling & Kontakt", desc: "Tidsbestilling via formular (eller link til journalsystem), handicapvenlig adgang og parkering" }
    ],
    highlights: ["Hurtig tidsbestillings-widget", "Sygesikring tilskuds-tags", "Behandler-specifikation", "Akuttid inden for 24 timer"]
  },
  {
    id: "tandlaege-klinik",
    image: "images/examples/tandlaege-klinik.jpg",
    title: "Tandlægehuset Smil & Implantater",
    category: "sundhed",
    target: "Tandlæger & Specialtandpleje",
    badge: "Tryg Behandling",
    accentColor: "#0284c7", // Tandlægeblå
    icon: "activity",
    shortDesc: "Tillidsvækkende og lys klinikprofil med fokus på tandlægeskræk og akutte tider.",
    fullDesc: "Skabt til at fjerne frygt og gøre tandlægebesøget trygt. Viser klinikteamet, transparente priser, smertefri bedøvelse og nem formular til tidsbestilling af eftersyn.",
    pages: [
      { name: "Forside", desc: "Tryg atmosfære, smertefri behandling, tandlægeskræk-garanti og online tidsbestilling" },
      { name: "Behandlinger", desc: "Almindeligt eftersyn, tandrensning, implantater, tandretning og kroner" },
      { name: "Tandlægeskræk & Tryghed", desc: "Vores særlige omsorgsfulde tilgang til patienter med angst" },
      { name: "Priser & Sygeforsikring", desc: "Faste overenskomstpriser, studierabat og tilskud fra 'danmark'" },
      { name: "Find Klinikken & Akuttid", desc: "Adresse tæt på station, gratis parkering og akuttelefon" }
    ],
    highlights: ["Tandlægeskræk tryghedsgaranti", "Akut smertelindring knap", "Transparent prisliste", "Tidsbestilling via formular"]
  },
  {
    id: "psykolog-terapi",
    image: "images/examples/psykolog-terapi.jpg",
    title: "Psykologhuset Ro & Indsigt",
    category: "sundhed",
    target: "Autoriserede Psykologer & Terapeuter",
    badge: "Fortroligt & Roligt",
    accentColor: "#0d9488", // Salvie / Petrol
    icon: "heart",
    shortDesc: "Diskret, beroligende design i bløde naturtoner med uforpligtende forsamtale.",
    fullDesc: "Udstråler varme, empati og professionel autoritet. Velegnet til psykologer og psykoterapeuter med fokus på stress, angst, parterapi og krisehjælp.",
    pages: [
      { name: "Forside", desc: "Beroligende velkomst, terapeutisk tilgang, trygge rammer og tidsbestilling" },
      { name: "Områder & Specialer", desc: "Hjælp til stress, angst, depression, parterapi og sorgbearbejdning" },
      { name: "Om Psykologen", desc: "Autorisation fra Psykolognævnet, erfaring, etik og tavshedspligt" },
      { name: "Priser & Henvisning", desc: "Ydernummer, lægehenvisning, private sundhedsforsikringer og klippekort" },
      { name: "Bestil Samtale & Kontakt", desc: "Uforpligtende 15-minutters telefonsamtale og klinikadresse" }
    ],
    highlights: ["Diskret kontaktformular", "Lægehenvisnings-info", "Gratis 15-min. afklaring", "Rolige dæmpede farver"]
  },
  {
    id: "fitness-coach",
    image: "images/examples/fitness-coach.jpg",
    title: "IronFit & Performance Coach",
    category: "sundhed",
    target: "Personlige Trænere, Bootcamps & Coaches",
    badge: "Høj Energi & Brutalisme",
    accentColor: "#ccff00", // Neon Acid Yellow
    icon: "activity",
    shortDesc: "Aggressivt, højtydende design med sort baggrund, neonaccenter og vægttabstal.",
    fullDesc: "Henvender sig til trænere og bootcamps der vil have kunden til at handle med det samme. Store transformationstal (-4.200 kg), programmer og forløbsansøgning.",
    pages: [
      { name: "Forside", desc: "Højenergi-hero, dokumenterede resultater, før/efter tal og screening-knap" },
      { name: "Træningsprogrammer", desc: "1:1 personlig træning, online coaching og bootcamps" },
      { name: "Klient Transformationer", desc: "Detaljerede kropsforvandlinger med udtalelser og kropsmål" },
      { name: "Priser & Forløbspakker", desc: "3, 6 og 12 måneders pakker med fuld garanti for fremgang" },
      { name: "Ansøg om Forløb", desc: "Screeningsskema hvor kunden angiver mål, erfaring og motivation" }
    ],
    highlights: ["Transformationstal (-4.200 kg)", "Screeningsformular", "Skråt ribbon-badge", "Sort/neon kontrast"]
  },
  {
    id: "yoga-pilates",
    image: "images/examples/yoga-pilates.jpg",
    title: "Zenith Yoga & Pilates Studio",
    category: "sundhed",
    target: "Yogastudier, Pilates & Mindfulness",
    badge: "Harmoni & Skema",
    accentColor: "#a855f7", // Blød lilla
    icon: "sun",
    shortDesc: "Harmonisk og jordnært design med live holdskema, introtilbud og workshops.",
    fullDesc: "Skabt til yoga-, pilates- og bevægelsesstudier. Gør det nemt at se ugens hold, tilmelde prøvetimer via formular og se priser på klippekort.",
    pages: [
      { name: "Forside", desc: "Zen-æstetik, ugens højdepunkter, holdtilmelding og introtilbud til nye" },
      { name: "Holdplan & Klasser", desc: "Vinyasa, Yin, Reformer Pilates og Hot Yoga med sværhedsgrader" },
      { name: "Instruktører", desc: "Mød vores certificerede undervisere og deres baggrund" },
      { name: "Priser & Medlemskab", desc: "Prøvetime for 99 kr., klippekort og ubegrænset månedsabonnement" },
      { name: "Find Studiet & Kontakt", desc: "Lys oase midt i byen med te-lounge, omklædning og yogamåtter" }
    ],
    highlights: ["Live ugentlig holdplan", "Introtilbud til nye elever", "Klippekort overblik", "Rolig zen-æstetik"]
  },

  // =========================================================================
  // KATEGORI 5: ERHVERV, FINANS & B2B (5)
  // =========================================================================
  {
    id: "advokat-juridisk",
    image: "images/examples/advokat-juridisk.jpg",
    title: "Lind & Partnere Advokatfirma",
    category: "erhverv",
    target: "Advokater, Jurister & Mæglere",
    badge: "Juridisk Autoritet",
    accentColor: "#d97706", // Guld/Rav
    icon: "briefcase",
    shortDesc: "Klassisk elfenbensfarvet autoritetsdesign med Højesterets-segl og sagsvurdering.",
    fullDesc: "Udstråler uangribelig professionalisme, diskretion og juridisk tyngde. Velegnet til advokatfirmaer inden for erhvervsret, fast ejendom, skat og retssager.",
    pages: [
      { name: "Forside", desc: "Juridisk autoritet med svungne seriffer, møderet for Højesteret, sagsvurderingsknap og specialer" },
      { name: "Specialer & Fagområder", desc: "Erhvervsret, M&A, entreprise, retssager og generationsskifte" },
      { name: "Advokaterne", desc: "Partnerprofiler med møderet, udgivelser og bestyrelsesposter" },
      { name: "Salærer & Fri Proces", desc: "Gennemskuelige prismodeller, retshjælp og indledende sagsvurdering" },
      { name: "Kontakt & Mødeforespørgsel", desc: "Kontorer i København, Aarhus og Odense med sikker kontakt" }
    ],
    highlights: ["Møderet for Højesteret segl", "Sagsvurderingsknap", "4 fagsøjler", "Højesterets-statistikker"]
  },
  {
    id: "revisor-bogholderi",
    image: "images/examples/revisor-bogholderi.jpg",
    title: "Tal & Regnskab Statsaut. Revisor",
    category: "erhverv",
    target: "Revisorer, Bogholdere & Finansrådgivere",
    badge: "3-Tier Prisoversigt",
    accentColor: "#2563eb", // Kongeblå
    icon: "briefcase",
    shortDesc: "Moderne FinTech-inspireret design med 3-søjlet prismodel og softwareintegrationer.",
    fullDesc: "Perfekt til revisionsfirmaer og bogholdere der vil tiltrække SMV-kunder med transparente månedspakker og digital integration til e-conomic og Dinero.",
    pages: [
      { name: "Forside", desc: "Overskuelige faste prispakker, regnskabsfordele og softwareintegrationer" },
      { name: "Faste Prispakker", desc: "Solo, SMV Vækst og Erhverv Total med specifikation af bilagsmængder" },
      { name: "Moms & Årsregnskab", desc: "Indberetning til Erhvervsstyrelsen, skatteoptimering og rådgivning" },
      { name: "Løn & Bogføring", desc: "Outsourcing af lønadministration, bilagshåndtering og afstemning" },
      { name: "Klient Login & Kontakt", desc: "Direkte kontakt til din faste revisor og adgang til kundeportal" }
    ],
    highlights: ["3 prispakker med månedstakst", "e-conomic & Dinero integrationer", "Klient login", "Fast revisor garanti"]
  },
  {
    id: "b2b-konsulent",
    image: "images/examples/b2b-konsulent.jpg",
    title: "Vanguard Management Consulting",
    category: "erhverv",
    target: "B2B Konsulenthuse, C-Level & Strategi",
    badge: "C-Level Strategisk",
    accentColor: "#38bdf8", // Lys Cyan
    icon: "briefcase",
    shortDesc: "Dyb marineblå rådgivningsprofil med top KPI-ticker, 3-trins model og SaaS-case.",
    fullDesc: "Positionerer dit konsulenthus som den uundværlige vækstpartner for topledelsen. Viser dokumenterede tal, procesmodeller og formular til 30 min. sparring.",
    pages: [
      { name: "Forside", desc: "KPI-ticker (+38% EBITDA), værditilbud, 3-trins model og kundecase" },
      { name: "Kerneyldelser", desc: "Diagnostisk markedsanalyse, Go-To-Market, prissætning og eksekvering" },
      { name: "Metoden", desc: "Vores datadrevne 90-dages transformationsmodel med målbare milepæle" },
      { name: "Kundecases & ROI", desc: "Dokumenterede resultater fra nordiske tech- og produktionsvirksomheder" },
      { name: "Mødeforespørgsel & Kontakt", desc: "Anmod om et fortroligt 30-minutters strategimøde med en senior partner via formular" }
    ],
    highlights: ["KPI-ticker (+38% EBITDA)", "3-trins rådgivningsmodel", "Nordisk SaaS case", "Senior partner sparring"]
  },
  {
    id: "ejendomsmaegler",
    image: "images/examples/ejendomsmaegler.jpg",
    title: "Dansk Bolig & Liebhaveri",
    category: "erhverv",
    target: "Ejendomsmæglere, Udlejere & Boligselskaber",
    badge: "Skovgrøn Liebhaver",
    accentColor: "#10b981", // Liebhavergrøn
    icon: "home",
    shortDesc: "Eksklusiv skovgrøn liebhaver-æstetik med integreret boligsøger og energimærker.",
    fullDesc: "Præsenterer eksklusive boliger med store fotos, plantegninger og nøgledata. Giver boligsøgende og sælgere nem adgang til en gratis salgsvurdering.",
    pages: [
      { name: "Forside", desc: "Dyb grøn liebhaver-hero med svungne seriffer, ejendomssøger med 3 filtre og fremhævede boliger" },
      { name: "Aktuelle Boliger", desc: "Katalog over villaer, lejligheder og liebhaverejendomme til salg" },
      { name: "Skuffesalg (Diskret)", desc: "Eksklusiv adgang til diskrete bolighandler for registrerede købere" },
      { name: "Bestil Salgsvurdering", desc: "Gratis vurdering af din boligs markedsværdi inden for 48 timer" },
      { name: "Mæglerne & Kontakt", desc: "Mød de statsautoriserede ejendomsmæglere og se vores salgsprocenter" }
    ],
    highlights: ["Interaktiv boligsøgebjælke", "Energimærke-badges (A2020)", "Diskret skuffesalg side", "Gratis salgsvurderingsknap"]
  },
  {
    id: "tech-saas",
    image: "images/examples/tech-saas.jpg",
    title: "NovaTech Cloud & Software",
    category: "erhverv",
    target: "Tech Startups, SaaS & IT-Konsulenter",
    badge: "Dark Mode High-Tech",
    accentColor: "#6366f1", // Indigo
    icon: "globe",
    shortDesc: "Futuristisk dark-mode interface med live terminal, API dokumentation og release notes.",
    fullDesc: "Skræddersyet til softwarevirksomheder, SaaS-platforme og udviklingshuse. Fremviser produktets features med interaktive skærmbilleder, kodeeksempler og live demo-tilmelding.",
    pages: [
      { name: "Forside", desc: "Dark-mode tech hero, interaktiv terminal, feature-grid og gratis demo-knap" },
      { name: "Produkt & Features", desc: "Arkitektur, sikkerhed, enterprise SSO, hastighed og oppetidsgaranti" },
      { name: "API & Dokumentation", desc: "REST API, SDK'er til TypeScript/Python, webhooks og endpoints" },
      { name: "Priser & Planer", desc: "Developer, Pro og Enterprise planer med månedlig/årlig afregning" },
      { name: "Demo-forespørgsel & Kontakt", desc: "Start 14-dages prøveperiode uden kreditkort eller anmod om salgsdemo via formular" }
    ],
    highlights: ["Interaktiv kode-terminal", "API documentation showcase", "99.99% oppetidsbadge", "14 dages gratis prøveperiode"]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = TEMPLATES_DATA;
}

import { LanguageCode } from './languages.config';

export const UI_TRANSLATIONS: Record<
  LanguageCode,
  {
    back: string;
    officialName: string;
    capital: string;
    population: string;
    region: string;
    subregion: string;
    area: string;
    languages: string;
    currencies: string;
    borders: string;
    noBorders: string;
    language: string;
    searchPlaceholder: string;
    regionLabel: string;
    allRegions: string;
    clearFilters: string;
    tableCountry: string;
    tableCapital: string;
    tableRegion: string;
    tablePopulation: string;
    notFound: string;
    countriesLoaded: string;
    countriesError: string;
    invalidCode: string;
    africa: string;
    americas: string;
    asia: string;
    europe: string;
    oceania: string;
    antarctic: string;
    appTitle: string;
    homeTitle: string;
    appDescription: string;
  }
> = {
  eng: {
    back: 'Back',
    officialName: 'Official Name',
    capital: 'Capital',
    population: 'Population',
    region: 'Region',
    subregion: 'Subregion',
    area: 'Area',
    languages: 'Languages',
    currencies: 'Currencies',
    borders: 'Border Countries',
    noBorders: 'No borders',
    language: 'Language',
    searchPlaceholder: 'Search country...',
    regionLabel: 'Region',
    allRegions: 'All Regions',
    clearFilters: 'Clear Filters',
    tableCountry: 'Country',
    tableCapital: 'Capital',
    tableRegion: 'Region',
    tablePopulation: 'Population',
    notFound: 'No country found matching the applied filters.',
    countriesLoaded: 'countries loaded',
    countriesError: 'Could not load countries',
    invalidCode: 'Invalid country code',
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
    appTitle: 'Country Explorer',
    homeTitle: 'Home',
    appDescription: 'Explore countries around the world with detailed information.'
  },

  por: {
    back: 'Voltar',
    officialName: 'Nome Oficial',
    capital: 'Capital',
    population: 'População',
    region: 'Região',
    subregion: 'Sub-região',
    area: 'Área',
    languages: 'Idiomas',
    currencies: 'Moedas',
    borders: 'Países Fronteiriços',
    noBorders: 'Não possui fronteiras',
    language: 'Idioma',
    searchPlaceholder: 'Buscar país...',
    regionLabel: 'Região',
    allRegions: 'Todas as Regiões',
    clearFilters: 'Limpar Filtros',
    tableCountry: 'País',
    tableCapital: 'Capital',
    tableRegion: 'Região',
    tablePopulation: 'População',
    notFound: 'Nenhum país encontrado para os filtros aplicados.',
    countriesLoaded: 'países carregados',
    countriesError: 'Não foi possível carregar os países',
    invalidCode: 'Código de país inválido',
    africa: 'África',
    americas: 'Américas',
    asia: 'Ásia',
    europe: 'Europa',
    oceania: 'Oceania',
    antarctic: 'Antártica',
    appTitle: 'Country Explorer',
    homeTitle: 'Início',
    appDescription: 'Explore países ao redor do mundo com informações detalhadas.'
  },

  spa: {
    back: 'Volver',
    officialName: 'Nombre Oficial',
    capital: 'Capital',
    population: 'Población',
    region: 'Región',
    subregion: 'Subregión',
    area: 'Área',
    languages: 'Idiomas',
    currencies: 'Monedas',
    borders: 'Países Fronterizos',
    noBorders: 'No tiene fronteras',
    language: 'Idioma',
    searchPlaceholder: 'Buscar país...',
    regionLabel: 'Región',
    allRegions: 'Todas las Regiones',
    clearFilters: 'Limpiar Filtros',
    tableCountry: 'País',
    tableCapital: 'Capital',
    tableRegion: 'Región',
    tablePopulation: 'Población',
    notFound: 'No se encontraron países para los filtros aplicados.',
    countriesLoaded: 'países cargados',
    countriesError: 'No se pudieron cargar los países',
    invalidCode: 'Código de país inválido',
    africa: 'África',
    americas: 'Américas',
    asia: 'Asia',
    europe: 'Europa',
    oceania: 'Oceanía',
    antarctic: 'Antártida',
    appTitle: 'Country Explorer',
    homeTitle: 'Inicio',
    appDescription: 'Explora países de todo el mundo con información detallada.'
  },

  fra: {
    back: 'Retour',
    officialName: 'Nom Officiel',
    capital: 'Capitale',
    population: 'Population',
    region: 'Région',
    subregion: 'Sous-région',
    area: 'Superficie',
    languages: 'Langues',
    currencies: 'Devises',
    borders: 'Pays Frontaliers',
    noBorders: 'Pas de frontières',
    language: 'Langue',
    searchPlaceholder: 'Chercher un pays...',
    regionLabel: 'Région',
    allRegions: 'Toutes les Régions',
    clearFilters: 'Effacer les Filtres',
    tableCountry: 'Pays',
    tableCapital: 'Capitale',
    tableRegion: 'Région',
    tablePopulation: 'Population',
    notFound: 'Aucun pays trouvé pour les filtres appliqués.',
    countriesLoaded: 'pays chargés',
    countriesError: 'Impossible de charger les pays',
    invalidCode: 'Code de pays invalide',
    africa: 'Afrique',
    americas: 'Amériques',
    asia: 'Asie',
    europe: 'Europe',
    oceania: 'Océanie',
    antarctic: 'Antarctique',
    appTitle: 'Country Explorer',
    homeTitle: 'Accueil',
    appDescription: 'Explorez les pays du monde entier com des informations détaillées.'
  },

  deu: {
    back: 'Zurück',
    officialName: 'Offizieller Name',
    capital: 'Hauptstadt',
    population: 'Bevölkerung',
    region: 'Region',
    subregion: 'Subregion',
    area: 'Fläche',
    languages: 'Sprachen',
    currencies: 'Währungen',
    borders: 'Nachbarländer',
    noBorders: 'Keine Grenzen',
    language: 'Sprache',
    searchPlaceholder: 'Land suchen...',
    regionLabel: 'Region',
    allRegions: 'Alle Regionen',
    clearFilters: 'Filter löschen',
    tableCountry: 'Land',
    tableCapital: 'Hauptstadt',
    tableRegion: 'Region',
    tablePopulation: 'Bevölkerung',
    notFound: 'Kein Land für die angewendeten Filter gefunden.',
    countriesLoaded: 'Länder geladen',
    countriesError: 'Länder konnten nicht geladen werden',
    invalidCode: 'Ungültiger Ländercode',
    africa: 'Afrika',
    americas: 'Amerikas',
    asia: 'Asien',
    europe: 'Europa',
    oceania: 'Ozeanien',
    antarctic: 'Antarktis',
    appTitle: 'Country Explorer',
    homeTitle: 'Startseite',
    appDescription: 'Entdecken Sie Länder auf der ganzen Welt mit detaillierten Informationen.'
  }
};

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
    language: 'Language'
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
    language: 'Idioma'
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
    language: 'Idioma'
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
    language: 'Langue'
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
    language: 'Sprache'
  }
};

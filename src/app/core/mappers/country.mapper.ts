import { Country } from '../models/country.model';
import { RestCountryApiResponse } from '../models/rest-countries.model';
import { normalizeText } from '../utils/text.utils';

export const mapCountry = (api: RestCountryApiResponse): Country => {
  // Defensive mapping to support both v3.1 and v5 shapes
  const nameObj =
    typeof api.name === 'string'
      ? { common: api.name, official: api.name }
      : api.name ?? { common: '', official: '' };

  const cca3 = api.cca3 ?? api.cca2 ?? (api.ccn3 ? String(api.ccn3) : '');

  const capital = api.capital ?? (api.capitalCity ? [api.capitalCity] : []);

  const flags =
    api.flags ?? (api.flag ? { png: api.flag, svg: api.flag } : { png: '', svg: '' });

  const translations = api.translations ?? {};

  const languages = api.languages ?? {};

  const currencies = api.currencies ?? {};

  const borders = api.borders ?? [];

  const population = api.population ?? 0;

  const region = api.region ?? '';

  const subregion = api.subregion ?? '';

  const area = api.area ?? 0;

  const searchableParts: string[] = [
    normalizeText(nameObj.common),
    normalizeText(nameObj.official),
    normalizeText(capital?.[0] || ''),
  ];

  if (translations && typeof translations === 'object') {
    Object.values(translations).forEach((t: any) => {
      searchableParts.push(normalizeText(t.common || ''));
      searchableParts.push(normalizeText(t.official || ''));
    });
  }

  return {
    name: nameObj,
    cca3,
    capital,
    population,
    region,
    subregion,
    borders,
    flags,
    languages,
    currencies,
    area,
    translations,
    searchableText: searchableParts.join(' | '),
  } as Country;
};

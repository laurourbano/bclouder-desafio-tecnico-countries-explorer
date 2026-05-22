import { Country } from '../models/country.model';
import { RestCountryApiResponse } from '../models/rest-countries.model';
import { normalizeText } from '../utils/text.utils';

export const mapCountry = (api: RestCountryApiResponse): Country => ({
  name: api.name,
  cca3: api.cca3,
  capital: api.capital ?? [],
  population: api.population,
  region: api.region,
  subregion: api.subregion ?? '',
  borders: api.borders ?? [],
  flags: api.flags,
  languages: api.languages ?? {},
  currencies: api.currencies ?? {},
  area: api.area ?? 0,
  translations: api.translations ?? {},
  searchableText: [
    normalizeText(api.name.common),
    normalizeText(api.name.official),
    normalizeText(api.capital?.[0] || ''),
    ...(api.translations
      ? Object.values(api.translations).map(
          (t) => `${normalizeText(t.common)} ${normalizeText(t.official)}`,
        )
      : []),
  ].join(' | '),
});

import { Country } from '../models/country.model';
import { RestCountryApiResponse } from '../models/rest-countries.model';

const normalize = (value: string) =>
  value?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') || '';

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
  code: api.cca3,
  translations: api.translations ?? {},
  searchableText: `${normalize(api.name.common)}|${normalize(api.name.official)}|${normalize(api.capital?.[0] || '')}`
});

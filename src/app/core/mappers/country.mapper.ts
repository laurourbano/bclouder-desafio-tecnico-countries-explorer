export const mapCountry = (api: any): Country => ({
  name: api.name,
  cca3: api.cca3,
  capital: api.capital ?? [],
  population: api.population,
  region: api.region,
  subregion: api.subregion,
  borders: api.borders ?? [],
  flags: api.flags,
  languages: api.languages ?? {},
  currencies: api.currencies ?? {},
  area: api.area ?? 0,
  code: api.cca3,
  translations: api.translations ?? {} 
});

import { Country } from "../models/country.model";

export function mapCountry(apiCountry: any): Country {
  return {
    name: apiCountry.name.common,
    cca3: apiCountry.cca3,
    capital?: apiCountry.capital?.[0] ?? '',
    population: apiCountry.population,
    region: apiCountry.region,
    subregion: apiCountry.subregion,
    flags: apiCountry.flags,
    borders?: apiCountry.borders ?? [],
    area: apiCountry.area,
    currencies: apiCountry.currencies,
    languages: apiCountry.languages
  };
}

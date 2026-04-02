import { mapCountry } from './country.mapper';
import { RestCountryApiResponse } from '../models/rest-countries.model';

describe('CountryMapper', () => {
  const mockApiCountry: RestCountryApiResponse = {
    name: { common: 'Brazil', official: 'Federative Republic of Brazil' },
    cca3: 'BRA',
    capital: ['Brasília'],
    population: 212559417,
    region: 'Americas',
    subregion: 'South America',
    borders: ['ARG', 'BOL', 'COL'],
    flags: { png: 'url_png', svg: 'url_svg' },
    languages: { por: 'Portuguese' },
    currencies: { BRL: { name: 'Brazilian Real', symbol: 'R$' } },
    area: 8515767,
    translations: {
      fra: { official: 'République fédérative du Brésil', common: 'Brésil' },
      spa: { official: 'República Federativa del Brasil', common: 'Brasil' },
    },
  };

  it('should map API country to Country model correctly', () => {
    const result = mapCountry(mockApiCountry);

    expect(result.name.common).toBe('Brazil');
    expect(result.cca3).toBe('BRA');
    expect(result.capital).toEqual(['Brasília']);
    expect(result.population).toBe(212559417);
    expect(result.region).toBe('Americas');
    expect(result.subregion).toBe('South America');
    expect(result.borders).toEqual(['ARG', 'BOL', 'COL']);
    expect(result.flags.png).toBe('url_png');
    expect(result.area).toBe(8515767);
  });

  it('should handle optional missing fields with defaults', () => {
    const minimalCountry: RestCountryApiResponse = {
      name: { common: 'Unknown', official: 'Official Unknown' },
      cca3: 'UNK',
      population: 0,
      region: 'None',
      flags: { png: '', svg: '' },
    };

    const result = mapCountry(minimalCountry);

    expect(result.capital).toEqual([]);
    expect(result.subregion).toBe('');
    expect(result.borders).toEqual([]);
    expect(result.languages).toEqual({});
    expect(result.currencies).toEqual({});
    expect(result.area).toBe(0);
    expect(result.translations).toEqual({});
  });

  it('should generate searchableText with normalized values', () => {
    const result = mapCountry(mockApiCountry);

    // Brasília -> brasilia (due to normalize removing NFD)
    expect(result.searchableText).toContain('brasilia');
    expect(result.searchableText).toContain('brazil');
    expect(result.searchableText).toContain('brasil');
    expect(result.searchableText).toContain('bresil');
  });

  it('should handle missing translations in searchableText', () => {
    const countryNoTrans: RestCountryApiResponse = {
      name: { common: 'Test', official: 'Official Test' },
      cca3: 'TST',
      population: 0,
      region: 'Test',
      flags: { png: '', svg: '' },
      capital: ['Test City']
    };

    const result = mapCountry(countryNoTrans);
    expect(result.searchableText).toBe('test | official test | test city');
  });
});

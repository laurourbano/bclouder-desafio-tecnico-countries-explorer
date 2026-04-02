import { TranslateCountryPipe } from './translate-country.pipe';
import { Country } from '../../core/models/country.model';

describe('TranslateCountryPipe', () => {
  let pipe: TranslateCountryPipe;

  const mockCountry: Partial<Country> = {
    name: { common: 'Brazil', official: 'Federative Republic of Brazil' },
    translations: {
      fra: { common: 'Brésil', official: 'République fédérative du Brésil' },
      spa: { common: 'Brasil', official: 'República Federativa del Brasil' }
    }
  };

  beforeEach(() => {
    pipe = new TranslateCountryPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string if no country provided', () => {
    expect(pipe.transform(null as any, 'eng')).toBe('');
    expect(pipe.transform(undefined, 'eng')).toBe('');
  });

  it('should return common name in English when lang is "eng"', () => {
    expect(pipe.transform(mockCountry as Country, 'eng')).toBe('Brazil');
  });

  it('should return official name in English when type is "official" and lang is "eng"', () => {
    expect(pipe.transform(mockCountry as Country, 'eng', 'official')).toBe('Federative Republic of Brazil');
  });

  it('should return translated common name when lang is not "eng"', () => {
    expect(pipe.transform(mockCountry as Country, 'fra')).toBe('Brésil');
    expect(pipe.transform(mockCountry as Country, 'spa')).toBe('Brasil');
  });

  it('should return translated official name when type is "official" and lang is not "eng"', () => {
    expect(pipe.transform(mockCountry as Country, 'fra', 'official')).toBe('République fédérative du Brésil');
  });

  it('should fallback to English name if translation is missing', () => {
    expect(pipe.transform(mockCountry as Country, 'por' as any)).toBe('Brazil');
  });
});

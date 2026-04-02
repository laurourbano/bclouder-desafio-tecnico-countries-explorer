import { TranslateRegionPipe } from './translate-region.pipe';

describe('TranslateRegionPipe', () => {
  let pipe: TranslateRegionPipe;

  beforeEach(() => {
    pipe = new TranslateRegionPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string if no region provided', () => {
    expect(pipe.transform(null, 'eng')).toBe('');
    expect(pipe.transform(undefined, 'eng')).toBe('');
    expect(pipe.transform('', 'eng')).toBe('');
  });

  it('should translate common regions correctly in English', () => {
    expect(pipe.transform('Americas', 'eng')).toBe('Americas');
    expect(pipe.transform('Europe', 'eng')).toBe('Europe');
    expect(pipe.transform('Africa', 'eng')).toBe('Africa');
  });

  it('should translate common regions correctly in Portuguese', () => {
    expect(pipe.transform('Americas', 'por')).toBe('Américas');
    expect(pipe.transform('Europe', 'por')).toBe('Europa');
    expect(pipe.transform('Africa', 'por')).toBe('África');
  });

  it('should translate common regions correctly in Spanish', () => {
    expect(pipe.transform('Americas', 'spa')).toBe('Américas');
    expect(pipe.transform('Oceania', 'spa')).toBe('Oceanía');
  });

  it('should handle case insensitivity (inputs are lowercased)', () => {
    expect(pipe.transform('AMERICAS', 'eng')).toBe('Americas');
    expect(pipe.transform('europe', 'por')).toBe('Europa');
  });

  it('should return original region if no translation found', () => {
    expect(pipe.transform('Unknown Region', 'eng')).toBe('Unknown Region');
  });

  it('should fallback to English dictionary if language is not supported', () => {
    // Note: TypeScript might complain if we pass an invalid LanguageCode, but we can test runtime behavior
    expect(pipe.transform('Americas', 'invalid' as any)).toBe('Americas');
  });
});

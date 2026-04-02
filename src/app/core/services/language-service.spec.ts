import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language-service';
import { LanguageCode } from '../config/languages.config';

describe('LanguageService', () => {
  let service: LanguageService;
  const storageKey = 'app-language';

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    TestBed.configureTestingModule({
      providers: [LanguageService]
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default language "eng" if nothing in localStorage', () => {
    expect(service.language()).toBe('eng');
  });

  it('should load language from localStorage on initialization', () => {
    localStorage.setItem(storageKey, 'por');
    
    // Inject again to trigger initialization with value in localStorage
    const newService = TestBed.inject(LanguageService);
    // Since it's a singleton provided in root, injecting it again won't re-run the constructor/initialization logic if it was already created.
    // However, in tests, each TestBed.inject(LanguageService) usually returns the same instance unless we reset the module.
    // Let's create a fresh instance for this specific test.
    const instance = new LanguageService();
    expect(instance.language()).toBe('por');
  });

  it('should update language and localStorage when setLanguage is called', () => {
    service.setLanguage('spa');
    expect(service.language()).toBe('spa');
    expect(localStorage.getItem(storageKey)).toBe('spa');
  });

  it('should update language signal', () => {
    service.setLanguage('por');
    expect(service.language()).toBe('por');
  });
});

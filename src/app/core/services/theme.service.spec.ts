import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  const storageKey = 'app-theme';

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark-theme');
    
    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default theme "light" if nothing in localStorage', () => {
    // New class instance will use signal with 'light' as default if LS is empty
    const freshService = new ThemeService();
    expect(freshService.theme()).toBe('light');
    expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
  });

  it('should toggle theme from light to dark', () => {
    expect(service.theme()).toBe('light');
    service.toggleTheme();
    expect(service.theme()).toBe('dark');
    expect(localStorage.getItem(storageKey)).toBe('dark');
    expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
  });

  it('should toggle theme from dark to light', () => {
    localStorage.setItem(storageKey, 'dark');
    const darkService = new ThemeService();
    
    expect(darkService.theme()).toBe('dark');
    darkService.toggleTheme();
    expect(darkService.theme()).toBe('light');
    expect(localStorage.getItem(storageKey)).toBe('light');
    expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
  });

  it('should apply theme on constructor', () => {
    localStorage.setItem(storageKey, 'dark');
    // Force a fresh instance to test constructor
    const instance = new ThemeService();
    expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
  });
});

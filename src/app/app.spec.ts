import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { LanguageService } from './core/services/language-service';
import { ThemeService } from './core/services/theme.service';

describe('App', () => {
  beforeEach(async () => {
    const languageServiceMock = {
      language: () => 'eng'
    };
    const themeServiceMock = {
      theme: () => 'light',
      toggleTheme: () => {}
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: LanguageService, useValue: languageServiceMock },
        { provide: ThemeService, useValue: themeServiceMock }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.app-title')?.textContent).toContain('Country Explorer');
  });
});

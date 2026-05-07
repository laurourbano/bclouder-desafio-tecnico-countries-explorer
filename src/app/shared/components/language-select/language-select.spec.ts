import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSelect } from './language-select';
import { LanguageService } from '../../../core/services/language-service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { signal } from '@angular/core';

describe('LanguageSelect', () => {
  let component: LanguageSelect;
  let fixture: ComponentFixture<LanguageSelect>;
  let languageSignal = signal('eng');

  beforeEach(async () => {
    languageSignal.set('eng');
    const languageServiceMock = {
      language: languageSignal,
      setLanguage: jasmine.createSpy('setLanguage').and.callFake((code: string) => languageSignal.set(code))
    };

    await TestBed.configureTestingModule({
      imports: [LanguageSelect, NoopAnimationsModule],
      providers: [
        { provide: LanguageService, useValue: languageServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct current language label', () => {
    expect(component.currentLangLabel()).toBe('English');
    
    languageSignal.set('por');
    fixture.detectChanges();
    
    expect(component.currentLangLabel()).toBe('Português');
  });

  it('should call setLanguage on service when changing language', () => {
    component.setLanguage('spa');
    expect(languageSignal()).toBe('spa');
  });

  it('should render the current language in the button', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('English');
  });

  it('should list all available languages in the menu', () => {
    // Abrir o menu (simular clique no botão)
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    // Como o menu do Angular Material é renderizado fora do componente (Overlay), 
    // precisamos procurar no documento.
    const menuItems = document.querySelectorAll('.mat-mdc-menu-item');
    // Temos 5 idiomas configurados (eng, por, spa, fra, deu)
    expect(menuItems.length).toBe(5);
    
    const labels = Array.from(menuItems).map(item => item.textContent?.trim() || '');
    expect(labels.some(l => l.includes('English'))).toBeTrue();
    expect(labels.some(l => l.includes('Português'))).toBeTrue();
    expect(labels.some(l => l.includes('Español'))).toBeTrue();
  });
});

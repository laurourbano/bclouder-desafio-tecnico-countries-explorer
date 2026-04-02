import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSelect } from './language-select';
import { LanguageService } from '../../../core/services/language-service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { vi } from 'vitest';
import { signal } from '@angular/core';

describe('LanguageSelect', () => {
  let component: LanguageSelect;
  let fixture: ComponentFixture<LanguageSelect>;
  let languageSignal = signal('eng');

  beforeEach(async () => {
    const languageServiceMock = {
      language: languageSignal,
      setLanguage: vi.fn().mockImplementation((code) => languageSignal.set(code))
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
});

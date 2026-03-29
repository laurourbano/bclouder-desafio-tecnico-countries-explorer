import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MATERIAL_MODULES } from './shared/material/material.config';
import { LanguageService } from './core/services/language-service';
import { LANGUAGES } from './core/config/languages.config';
import { LanguageSelect } from './shared/components/language-select/language-select';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    MATERIAL_MODULES,
    LanguageSelect
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Country Explorer');
  langService = inject(LanguageService);
  themeService = inject(ThemeService);
  languages = LANGUAGES;
  public isDesktop: boolean = window.innerWidth > 865;

}

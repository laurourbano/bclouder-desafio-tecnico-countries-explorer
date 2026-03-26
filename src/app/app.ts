import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MATERIAL_MODULES } from './shared/material/material.config';
import { LanguageService } from './core/services/language-service';
import { LANGUAGES } from './core/config/languages.config';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    MATERIAL_MODULES
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Country Explorer');
  langService = inject(LanguageService);
  languages = LANGUAGES;
  public isDesktop: boolean = window.innerWidth > 865;

}

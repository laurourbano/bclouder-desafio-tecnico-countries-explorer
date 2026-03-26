import { Injectable, signal } from '@angular/core';
import { LanguageCode } from '../config/languages.config';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly storageKey = 'app-language';

  language = signal<LanguageCode>(
    (localStorage.getItem(this.storageKey) as LanguageCode) || 'eng'
  );

  setLanguage(lang: LanguageCode) {
    this.language.set(lang);
    localStorage.setItem(this.storageKey, lang);
  }

}

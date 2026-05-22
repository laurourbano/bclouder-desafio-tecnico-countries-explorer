import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { LanguageService } from '../../../core/services/language-service';
import { LANGUAGES, LanguageCode } from '../../../core/config/languages.config';
import { MATERIAL_MODULES } from '../../material/material.config';

@Component({
  selector: 'app-language-select',
  imports: [MATERIAL_MODULES],
  templateUrl: './language-select.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelect {
  protected readonly langService = inject(LanguageService);
  protected readonly languages = LANGUAGES;

  protected readonly currentLangLabel = computed(() => {
    const code = this.langService.language();
    return this.languages.find((l) => l.code === code)?.label ?? 'English';
  });

  protected setLanguage(code: LanguageCode): void {
    this.langService.setLanguage(code);
  }
}

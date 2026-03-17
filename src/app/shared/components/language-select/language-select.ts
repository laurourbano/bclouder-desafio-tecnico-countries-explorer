import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../core/services/language-service';
import { LANGUAGES } from '../../../core/config/languages.config';
import { MATERIAL_MODULES } from '../../material/material.config';

@Component({
  selector: 'app-language-select',
  imports: [MATERIAL_MODULES],
  templateUrl: './language-select.html'
})
export class LanguageSelect {

  langService = inject(LanguageService);

  languages = LANGUAGES;

}

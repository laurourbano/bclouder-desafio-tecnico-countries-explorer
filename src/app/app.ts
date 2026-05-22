import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MATERIAL_MODULES } from './shared/material/material.config';
import { LanguageSelect } from './shared/components/language-select/language-select';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, MATERIAL_MODULES, LanguageSelect],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = 'Country Explorer';
  protected readonly themeService = inject(ThemeService);
}

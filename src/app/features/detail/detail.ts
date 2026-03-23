import { Component, inject, signal, effect, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountryService } from '../../core/services/country-service';
import { MATERIAL_MODULES } from '../../shared/material/material.config';
import { switchMap } from 'rxjs/operators';
import { KeyValuePipe } from '@angular/common';
import { LanguageService } from '../../core/services/language-service';
import { Country } from '../../core/models/country.model';
import { LANGUAGES } from '../../core/config/languages.config';
import { UI_TRANSLATIONS } from '../../core/config/ui.translations.config';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-detail',
  imports: [RouterModule, MATERIAL_MODULES, KeyValuePipe, DecimalPipe],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail {
  private route = inject(ActivatedRoute);
  private service = inject(CountryService);
  private router = inject(Router);
  protected langService = inject(LanguageService);

  country = signal<Country | null>(null);
  loading = signal<boolean>(true);
  languages = LANGUAGES;

ui = computed(() => {
  const lang = this.langService.language();
  return UI_TRANSLATIONS[lang] ?? UI_TRANSLATIONS['eng'];
});

  translatedOfficialName = computed(() => {

    const country = this.country();
    const lang = this.langService.language();

    if (!country) return '';

    if (lang === 'eng') {
      return country.name?.official;
    }

    return country.translations?.[lang]?.official ?? country.name?.official;

  });

  translatedName = computed(() => {

    const country = this.country();
    const lang = this.langService.language();

    if (!country) return '';

    if (lang === 'eng') {
      return country.name?.common;
    }

    return country.translations?.[lang]?.common ?? country.name?.common;

  });


  constructor() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const cca3 = params.get('cca3');
          this.loading.set(true);
          return this.service.byCca3(cca3!);
        }),
      )
      .subscribe((country) => {
        this.country.set(country);
        this.loading.set(false);
      });
  }

  goToBorder(cca3: string) {
    this.router.navigate(['/countries', cca3]);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}

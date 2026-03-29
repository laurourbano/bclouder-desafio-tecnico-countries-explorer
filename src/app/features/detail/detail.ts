import { Component, inject, signal, computed, DestroyRef, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountryService } from '../../core/services/country-service';
import { MATERIAL_MODULES } from '../../shared/material/material.config';
import { switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyValuePipe, DecimalPipe } from '@angular/common';
import { LanguageService } from '../../core/services/language-service';
import { Country } from '../../core/models/country.model';
import { LANGUAGES } from '../../core/config/languages.config';
import { UI_TRANSLATIONS } from '../../core/config/ui.translations.config';
import { TranslateCountryPipe } from '../../shared/pipes/translate-country.pipe';
import { TranslateRegionPipe } from '../../shared/pipes/translate-region.pipe';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterModule, MATERIAL_MODULES, KeyValuePipe, DecimalPipe, TranslateCountryPipe, TranslateRegionPipe],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Detail implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(CountryService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  protected langService = inject(LanguageService);

  country = signal<Country | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  languages = LANGUAGES;

  ui = computed(() => {
    const lang = this.langService.language();
    return UI_TRANSLATIONS[lang] ?? UI_TRANSLATIONS['eng'];
  });



  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const cca3 = params.get('cca3');
          this.loading.set(true);
          this.error.set(null);
          return this.service.byCca3(cca3!);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (country) => {
          this.country.set(country);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Erro ao buscar país:', err);
          this.error.set('Não foi possível carregar os dados do país.');
          this.loading.set(false);
        },
      });
  }

  goToBorder(cca3: string) {
    this.router.navigate(['/countries', cca3]);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}

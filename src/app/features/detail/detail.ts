import {
  Component,
  inject,
  signal,
  computed,
  DestroyRef,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountryService } from '../../core/services/country-service';
import { MATERIAL_MODULES } from '../../shared/material/material.config';
import { switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyValuePipe, DecimalPipe } from '@angular/common';
import { LanguageService } from '../../core/services/language-service';
import { Country } from '../../core/models/country.model';
import { UI_TRANSLATIONS } from '../../core/config/ui.translations.config';
import { TranslateCountryPipe } from '../../shared/pipes/translate-country.pipe';
import { TranslateRegionPipe } from '../../shared/pipes/translate-region.pipe';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    RouterModule,
    MATERIAL_MODULES,
    KeyValuePipe,
    DecimalPipe,
    TranslateCountryPipe,
    TranslateRegionPipe,
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Detail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(CountryService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly langService = inject(LanguageService);

  protected readonly country = signal<Country | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly ui = computed(() => {
    const lang = this.langService.language();
    return UI_TRANSLATIONS[lang] ?? UI_TRANSLATIONS['eng'];
  });

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const cca3 = params.get('cca3');

          if (!cca3) {
            this.error.set(this.ui().invalidCode);
            this.loading.set(false);
            return EMPTY;
          }

          this.loading.set(true);
          this.error.set(null);
          return this.service.byCca3(cca3);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (country) => {
          this.country.set(country);
          this.loading.set(false);
        },
        error: () => {
          this.error.set(this.ui().countriesError);
          this.loading.set(false);
        },
      });
  }

  protected goToBorder(cca3: string): void {
    this.router.navigate(['/countries', cca3]);
  }

  protected goBack(): void {
    this.router.navigate(['/']);
  }
}

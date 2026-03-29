import { Component, computed, inject, signal, ViewChild, ChangeDetectionStrategy, DestroyRef, OnInit } from '@angular/core';
import { CountryService } from '../../core/services/country-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MATERIAL_MODULES } from '../../shared/material/material.config';
import { RouterModule, Router } from "@angular/router";
import { DecimalPipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Country } from '../../core/models/country.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LanguageService } from '../../core/services/language-service';
import { UI_TRANSLATIONS } from '../../core/config/ui.translations.config';
import { TranslateCountryPipe } from '../../shared/pipes/translate-country.pipe';
import { TranslateRegionPipe } from '../../shared/pipes/translate-region.pipe';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    MATERIAL_MODULES,
    RouterModule,
    DecimalPipe,
    TranslateCountryPipe,
    TranslateRegionPipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home implements OnInit {

  desktopColumns = [
    'flag',
    'name',
    'capital',
    'region',
    'population',
    'actions'
  ];

  mobileColumns = [
    'flag',
    'name'
  ];

  displayedColumns = this.desktopColumns;

  private service = inject(CountryService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private destroyRef = inject(DestroyRef);
  private breakpointObserver = inject(BreakpointObserver);
  langService = inject(LanguageService);

  ui = computed(() => UI_TRANSLATIONS[this.langService.language()] ?? UI_TRANSLATIONS['eng']);


  dataSource = new MatTableDataSource<Country>();

  loading = signal(true);
  totalCountries = signal(0);
  filteredCount = computed(() => this.dataSource.filteredData.length);

  searchControl = new FormControl('');
  regionControl = new FormControl('');

  rawRegions = signal<string[]>([]);
  regions = computed(() => {
    const t = this.ui() as any;
    return this.rawRegions()
      .map(region => {
        const key = region.toLowerCase();
        return {
          value: region,
          label: t[key] || region
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {

    this.service.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: countries => {

          this.dataSource.data = countries;
          this.totalCountries.set(countries.length);
          this.loading.set(false);

          // forçar o sort para corrigir o sort pelo nome
          this.dataSource.sortingDataAccessor = (item: Country, property: string) => {
            switch (property) {
              case 'name':
                return item.name.common;
              case 'capital':
                return item.capital?.[0] || '';
              case 'population':
                return item.population;
              case 'region':
                return item.region;
              default:
                return (item as any)[property];
            }
          };

          const uniqueRegions = Array.from(
            new Set(countries.map(c => c.region).filter(Boolean))
          );
          
          this.rawRegions.set(uniqueRegions);

          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });

          this.toastr.success(`${countries.length} ${this.ui().countriesLoaded}`, 'OK');
        },

        error: () => {
          this.loading.set(false);
          // Substituido pelo error interceptor nativo
        }
      });


    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(val => this.applyFilter(val ?? ''));


    this.regionControl.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => this.applyFilter(this.searchControl.value ?? ''));


    this.dataSource.filterPredicate = (country: Country, filter: string) => {
      const [text, region] = filter.split('|');

      const normalize = (value: string) =>
        value
          ?.toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') || '';

      const search = normalize(text);

      const matchText = !search || !!(country.searchableText && country.searchableText.includes(search));
      const matchRegion = !region || country.region === region;

      return matchText && matchRegion;
    };

    this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.displayedColumns = result.matches ? this.mobileColumns : this.desktopColumns;
      });
  }


  applyFilter(text: string): void {

    const region = this.regionControl.value ?? '';

    this.dataSource.filter = `${text.trim().toLowerCase()}|${region}`;

    this.dataSource.paginator?.firstPage();
  }


  clearFilters(): void {
    this.searchControl.setValue('');
    this.regionControl.setValue('');
  }

  openDetail(country: Country): void {
    const code = country.cca3;

    if (!code) {
      this.toastr.error(this.ui().invalidCode);
      return;
    }

    this.router.navigate(['/countries', code]);
  }

}

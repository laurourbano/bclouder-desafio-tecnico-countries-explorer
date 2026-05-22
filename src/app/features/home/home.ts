import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import {
  Component,
  computed,
  inject,
  signal,
  ViewChild,
  ChangeDetectionStrategy,
  DestroyRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CountryService } from '../../core/services/country-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MATERIAL_MODULES } from '../../shared/material/material.config';
import { RouterModule, Router } from '@angular/router';
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
import { normalizeText } from '../../core/utils/text.utils';

const DESKTOP_COLUMNS = ['flag', 'name', 'capital', 'region', 'population', 'actions'];
const MOBILE_COLUMNS = ['flag', 'name'];

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    MATERIAL_MODULES,
    RouterModule,
    DecimalPipe,
    TranslateCountryPipe,
    TranslateRegionPipe,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(10px)' }),
            stagger(30, [
              animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class Home implements OnInit, AfterViewInit {
  private readonly service = inject(CountryService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  protected readonly langService = inject(LanguageService);

  protected readonly ui = computed(
    () => UI_TRANSLATIONS[this.langService.language()] ?? UI_TRANSLATIONS['eng'],
  );

  protected readonly dataSource = new MatTableDataSource<Country>();
  protected readonly loading = signal(true);
  protected readonly totalCountries = signal(0);
  protected readonly filteredCount = computed(() => this.dataSource.filteredData.length);

  protected readonly searchControl = new FormControl('');
  protected readonly regionControl = new FormControl('');
  protected displayedColumns: string[] = DESKTOP_COLUMNS;

  private readonly rawRegions = signal<string[]>([]);
  protected readonly regions = computed(() => {
    const translations = this.ui() as Record<string, string>;
    return this.rawRegions()
      .map((region) => ({
        value: region,
        label: translations[region.toLowerCase()] || region,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.updateMeta();
    this.configureFilterPredicate();
    this.configureSortingAccessor();
    this.loadCountries();
    this.setupSearchSubscription();
    this.setupRegionSubscription();
    this.setupResponsiveLayout();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private loadCountries(): void {
    this.service
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (countries) => {
          this.dataSource.data = countries;
          this.totalCountries.set(countries.length);
          this.loading.set(false);

          const uniqueRegions = Array.from(new Set(countries.map((c) => c.region).filter(Boolean)));
          this.rawRegions.set(uniqueRegions);

          this.toastr.success(`${countries.length} ${this.ui().countriesLoaded}`, 'OK');
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }

  private configureFilterPredicate(): void {
    this.dataSource.filterPredicate = (country: Country, filter: string) => {
      const [text, region] = filter.split('|');
      const search = normalizeText(text);
      const matchText = !search || !!country.searchableText?.includes(search);
      const matchRegion = !region || country.region === region;
      return matchText && matchRegion;
    };
  }

  private configureSortingAccessor(): void {
    this.dataSource.sortingDataAccessor = (item: Country, property: string): string | number => {
      switch (property) {
        case 'name':
          return item.name.common;
        case 'capital':
          return item.capital[0] || '';
        case 'population':
          return item.population;
        case 'region':
          return item.region;
        default:
          return (item as unknown as Record<string, unknown>)[property] as string | number;
      }
    };
  }

  private setupSearchSubscription(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((val) => this.applyFilter(val ?? ''));
  }

  private setupRegionSubscription(): void {
    this.regionControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.applyFilter(this.searchControl.value ?? ''));
  }

  private setupResponsiveLayout(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.displayedColumns = result.matches ? MOBILE_COLUMNS : DESKTOP_COLUMNS;
      });
  }

  protected applyFilter(text: string): void {
    const region = this.regionControl.value ?? '';
    this.dataSource.filter = `${text.trim().toLowerCase()}|${region}`;
    this.dataSource.paginator?.firstPage();
  }

  protected clearFilters(): void {
    this.searchControl.setValue('');
    this.regionControl.setValue('');
  }

  protected openDetail(country: Country): void {
    if (!country.cca3) {
      this.toastr.error(this.ui().invalidCode);
      return;
    }
    this.router.navigate(['/countries', country.cca3]);
  }

  private updateMeta(): void {
    const translations = this.ui();
    this.titleService.setTitle(`${translations.appTitle} - ${translations.homeTitle || 'Home'}`);
    this.metaService.updateTag({
      name: 'description',
      content: translations.appDescription || 'Explore countries around the world.',
    });
  }
}

import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { CountryService } from '../../core/services/country-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, Subject, takeUntil } from 'rxjs';
import { MATERIAL_MODULES } from '../../shared/material/material.config';
import { RouterModule, Router } from "@angular/router";
import { DecimalPipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Country } from '../../core/models/country.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    MATERIAL_MODULES,
    RouterModule,
    DecimalPipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

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


  dataSource = new MatTableDataSource<Country>();

  loading = signal(true);
  totalCountries = signal(0);
  filteredCount = computed(() => this.dataSource.filteredData.length);

  searchControl = new FormControl('');
  regionControl = new FormControl('');

  regions = signal<{ label: string; value: string }[]>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private destroy$ = new Subject<void>();


  ngOnInit(): void {

    this.service.getAll()
      .pipe(takeUntil(this.destroy$))
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
                return item.capital || '';

              case 'population':
                return item.population;

              case 'region':
                return item.region;

              default:
                return (item as any)[property];
            }
          };
          // Gerar regiões dinamicamente como Rafael sugeriu
          const uniqueRegions = Array.from(
            new Set(countries.map(c => c.region).filter(Boolean))
          );

          const regionMap: Record<string, string> = {
            Africa: 'África',
            Americas: 'Américas',
            Asia: 'Ásia',
            Europe: 'Europa',
            Oceania: 'Oceania',
            Antarctic: 'Antártida'
          };

          const formatted = uniqueRegions
            .map(region => ({
              value: region,
              label: regionMap[region] || region
            }))
            .sort((a, b) => a.label.localeCompare(b.label));

          this.regions.set(formatted);

          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });

          this.toastr.success(`${countries.length} países carregados`, 'Pronto');
        },

        error: () => {
          this.loading.set(false);
          this.toastr.error('Não foi possível carregar os países', 'Erro');
        }
      });


    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(val => this.applyFilter(val ?? ''));


    this.regionControl.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.applyFilter(this.searchControl.value ?? ''));


    this.dataSource.filterPredicate = (country: Country, filter: string) => {
      const [text, region] = filter.split('|');

      const normalize = (value: string) =>
        value
          ?.toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') || '';

      const search = normalize(text);

      const matchText =
        !search ||
        normalize(country.name.common).includes(search) ||
        normalize(country.name.official).includes(search) ||
        normalize(country.capital?.[0] || '').includes(search);

      const matchRegion =
        !region || country.region === region;

      return matchText && matchRegion;
    };

    const checkScreen = () => {
      if (window.innerWidth < 768) {
        this.displayedColumns = this.mobileColumns;
      } else {
        this.displayedColumns = this.desktopColumns;
      }
    };

    checkScreen();

    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler);
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
      this.toastr.error('Código do país inválido');
      return;
    }

    this.router.navigate(['/countries', code]);

  }

  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();
    window.removeEventListener('resize', this.resizeHandler);
  }

  private resizeHandler = () => {
    this.displayedColumns =
      window.innerWidth < 768
        ? this.mobileColumns
        : this.desktopColumns;
  };

}

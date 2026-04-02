import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { CountryService } from '../../core/services/country-service';
import { of, throwError } from 'rxjs';
import { provideRouter, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Country } from '../../core/models/country.model';
import { vi } from 'vitest';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let countryServiceSpy: any;
  let toastrSpy: any;
  let router: Router;
  let breakpointObserverSpy: any;

  const mockCountries: Partial<Country>[] = [
    {
      name: { common: 'Brazil', official: 'Federative Republic of Brazil' },
      cca3: 'BRA',
      region: 'Americas',
      capital: ['Brasília'],
      population: 200000000,
      flags: { png: 'br-png', svg: 'br-svg' },
      searchableText: 'brazil | federative republic of brazil | brasilia'
    },
    {
      name: { common: 'Germany', official: 'Federal Republic of Germany' },
      cca3: 'DEU',
      region: 'Europe',
      capital: ['Berlin'],
      population: 83000000,
      flags: { png: 'de-png', svg: 'de-svg' },
      searchableText: 'germany | federal republic of germany | berlin'
    }
  ];

  beforeEach(async () => {
    countryServiceSpy = {
      getAll: vi.fn().mockReturnValue(of(mockCountries))
    };
    toastrSpy = {
      success: vi.fn(),
      error: vi.fn()
    };
    breakpointObserverSpy = {
      observe: vi.fn().mockReturnValue(of({ matches: false }))
    };
    await TestBed.configureTestingModule({
      imports: [Home, NoopAnimationsModule],
      providers: [
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: BreakpointObserver, useValue: breakpointObserverSpy },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create and load countries on init', () => {
    expect(component).toBeTruthy();
    expect(countryServiceSpy.getAll).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(2);
    expect(component.totalCountries()).toBe(2);
    expect(component.loading()).toBe(false);
    expect(toastrSpy.success).toHaveBeenCalled();
  });

  it('should handle error when loading countries', () => {
    countryServiceSpy.getAll.mockReturnValue(throwError(() => new Error('API Error')));
    // Criamos um novo fixture para testar o OnInit com erro
    const errorFixture = TestBed.createComponent(Home);
    errorFixture.detectChanges();
    expect(errorFixture.componentInstance.loading()).toBe(false);
  });

  it('should filter countries by search text', async () => {
    vi.useFakeTimers();
    component.searchControl.setValue('Brazil');
    vi.advanceTimersByTime(350); // debounceTime(300)
    fixture.detectChanges();

    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].cca3).toBe('BRA');
    vi.useRealTimers();
  });

  it('should filter countries by region', () => {
    component.regionControl.setValue('Europe');
    fixture.detectChanges();

    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].cca3).toBe('DEU');
  });

  it('should clear filters', () => {
    component.searchControl.setValue('Search');
    component.regionControl.setValue('Americas');
    component.clearFilters();

    expect(component.searchControl.value).toBe('');
    expect(component.regionControl.value).toBe('');
  });

  it('should navigate to detail page', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    const country = mockCountries[0] as Country;
    component.openDetail(country);

    expect(navigateSpy).toHaveBeenCalledWith(['/countries', 'BRA']);
  });

  it('should update columns for mobile view', () => {
    breakpointObserverSpy.observe.mockReturnValue(of({ matches: true }));
    // Re-iniciar para pegar o novo valor do breakpoint (ou disparar manualmente se o observer permitir)
    // No nosso ngOnInit o subscribe acontece no início.
    component.ngOnInit();
    expect(component.displayedColumns).toEqual(component.mobileColumns);
  });
  
  it('should correctly sort data by name', () => {
    // Definimos acessores de ordenação no ngOnInit
    const data = component.dataSource.sortingDataAccessor(mockCountries[0] as Country, 'name');
    expect(data).toBe('Brazil');
  });
});

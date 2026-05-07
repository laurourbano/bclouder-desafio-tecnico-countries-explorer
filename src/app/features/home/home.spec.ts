import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { CountryService } from '../../core/services/country-service';
import { of, throwError } from 'rxjs';
import { provideRouter, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Country } from '../../core/models/country.model';


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
      getAll: jasmine.createSpy('getAll').and.returnValue(of(mockCountries))
    };
    toastrSpy = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };
    breakpointObserverSpy = {
      observe: jasmine.createSpy('observe').and.returnValue(of({ matches: false }))
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
    countryServiceSpy.getAll.and.returnValue(throwError(() => new Error('API Error')));
    // Criamos um novo fixture para testar o OnInit com erro
    const errorFixture = TestBed.createComponent(Home);
    errorFixture.detectChanges();
    expect(errorFixture.componentInstance.loading()).toBe(false);
  });

  it('should filter countries by search text', (done) => {
    component.searchControl.setValue('Brazil');
    
    // Using setTimeout to handle debounceTime(300) in a simple way for junior level, 
    // or we could use fakeAsync/tick. Let's use fakeAsync for "ideal coverage" style.
    setTimeout(() => {
      fixture.detectChanges();
      expect(component.dataSource.filteredData.length).toBe(1);
      expect(component.dataSource.filteredData[0].cca3).toBe('BRA');
      done();
    }, 350);
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
    const navigateSpy = spyOn(router, 'navigate');
    const country = mockCountries[0] as Country;
    component.openDetail(country);

    expect(navigateSpy).toHaveBeenCalledWith(['/countries', 'BRA']);
  });

  it('should update columns for mobile view', () => {
    breakpointObserverSpy.observe.and.returnValue(of({ matches: true }));
    // Re-iniciar para pegar o novo valor do breakpoint (ou disparar manualmente se o observer permitir)
    // No nosso ngOnInit o subscribe acontece no início.
    component.ngOnInit();
    expect(component.displayedColumns).toEqual(component.mobileColumns);
  });
  
  it('should correctly sort data by various properties', () => {
    const country = mockCountries[0] as Country;
    
    expect(component.dataSource.sortingDataAccessor(country, 'name')).toBe('Brazil');
    expect(component.dataSource.sortingDataAccessor(country, 'capital')).toBe('Brasília');
    expect(component.dataSource.sortingDataAccessor(country, 'population')).toBe(200000000);
    expect(component.dataSource.sortingDataAccessor(country, 'region')).toBe('Americas');
    expect(component.dataSource.sortingDataAccessor(country, 'cca3')).toBe('BRA');
  });

  it('should handle sorting for country without capital', () => {
    const noCapital = { ...mockCountries[0], capital: undefined } as Country;
    expect(component.dataSource.sortingDataAccessor(noCapital, 'capital')).toBe('');
  });

  it('should handle openDetail without cca3', () => {
    const invalidCountry = { ...mockCountries[0], cca3: '' } as Country;
    component.openDetail(invalidCountry);
    expect(toastrSpy.error).toHaveBeenCalled();
  });

  it('should generate region labels correctly', () => {
    component.rawRegions.set(['Americas', 'Europe']);
    const regions = component.regions();
    expect(regions.length).toBe(2);
    expect(regions[0].label).toBe('Americas'); // Assuming eng default
  });

  it('should filter correctly in filterPredicate', () => {
    const country = mockCountries[0] as Country;
    
    // Test match both
    expect(component.dataSource.filterPredicate(country, 'brazil|Americas')).toBe(true);
    
    // Test match text only
    expect(component.dataSource.filterPredicate(country, 'brazil|')).toBe(true);
    
    // Test match region only
    expect(component.dataSource.filterPredicate(country, '|Americas')).toBe(true);
    
    // Test no match text
    expect(component.dataSource.filterPredicate(country, 'germany|Americas')).toBe(false);
    
    // Test no match region
    expect(component.dataSource.filterPredicate(country, 'brazil|Europe')).toBe(false);
  });
});

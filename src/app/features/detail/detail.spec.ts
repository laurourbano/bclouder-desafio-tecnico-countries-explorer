import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Detail } from './detail';
import { CountryService } from '../../core/services/country-service';
import { ActivatedRoute, Router, RouterModule, convertToParamMap } from '@angular/router';
import { of, throwError, BehaviorSubject } from 'rxjs';
import { Country } from '../../core/models/country.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageService } from '../../core/services/language-service';


class ActivatedRouteStub {
  private paramMapSubject = new BehaviorSubject(convertToParamMap({ cca3: 'BRA' }));
  readonly paramMap = this.paramMapSubject.asObservable();
  readonly snapshot = { paramMap: convertToParamMap({ cca3: 'BRA' }) };
}

class RouterStub {
  navigate = jasmine.createSpy('navigate');
}

describe('Detail', () => {
  let component: Detail;
  let fixture: ComponentFixture<Detail>;
  let countryServiceSpy: any;
  let routerStub: RouterStub;
  let activatedRouteStub: ActivatedRouteStub;

  const mockCountry: Partial<Country> = {
    name: { common: 'Brazil', official: 'Federative Republic of Brazil' },
    cca3: 'BRA',
    region: 'Americas',
    subregion: 'South America',
    capital: ['Brasília'],
    population: 212559417,
    flags: { png: 'url', svg: 'url' },
    borders: ['ARG', 'BOL'],
    languages: { por: 'Portuguese' },
    currencies: { BRL: { name: 'Real', symbol: 'R$' } }
  };

  beforeEach(async () => {
    activatedRouteStub = new ActivatedRouteStub();
    routerStub = new RouterStub();
    countryServiceSpy = {
      byCca3: jasmine.createSpy('byCca3').and.returnValue(of(mockCountry))
    };

    await TestBed.configureTestingModule({
      imports: [Detail, NoopAnimationsModule],
      providers: [
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerStub },
        // Não usar provideRouter([]) aqui — cria router real que sobrescreve o mock
        { provide: RouterModule, useValue: {} }
      ]
    }).compileComponents();

    const langService: LanguageService = TestBed.inject(LanguageService);
    langService.setLanguage('eng');

    fixture = TestBed.createComponent(Detail);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create and load country details', () => {
    expect(component).toBeTruthy();
    expect(countryServiceSpy.byCca3).toHaveBeenCalledWith('BRA');
    expect(component.country()).toEqual(mockCountry as Country);
    expect(component.loading()).toBe(false);
  });

  it('should handle error when loading country', () => {
    countryServiceSpy.byCca3.and.returnValue(throwError(() => new Error('Not Found')));
    component.ngOnInit();
    expect(component.error()).toBe('Não foi possível carregar os dados do país.');
    expect(component.loading()).toBe(false);
  });

  it('should navigate to border country', () => {
    component.goToBorder('ARG');
    expect(routerStub.navigate).toHaveBeenCalledWith(['/countries', 'ARG']);
  });

  it('should navigate back to home', () => {
    component.goBack();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should update UI translations when language changes', () => {
    expect(component.ui().back).toBe('Back');

    component['langService'].setLanguage('por');
    fixture.detectChanges();

    expect(component.ui().back).toBe('Voltar');
  });
});

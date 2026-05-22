import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CountryService } from './country-service';
import { environment } from '../../../environments/environment';
import { RestCountryApiResponse } from '../models/rest-countries.model';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  const mockApiCountries: RestCountryApiResponse[] = [
    {
      name: { common: 'Brazil', official: 'Federative Republic of Brazil' },
      cca3: 'BRA',
      population: 212559417,
      region: 'Americas',
      flags: { png: 'png_url', svg: 'svg_url' },
    },
    {
      name: { common: 'Argentina', official: 'Argentine Republic' },
      cca3: 'ARG',
      population: 45195777,
      region: 'Americas',
      flags: { png: 'png_url', svg: 'svg_url' },
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountryService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should fetch all countries and map them', () => {
      service.getAll().subscribe((countries) => {
        expect(countries.length).toBe(2);
        expect(countries[0].name.common).toBe('Brazil');
        expect(countries[1].name.common).toBe('Argentina');
      });

      const req = httpMock.expectOne((req) => req.url.startsWith(`${apiUrl}/all`));
      expect(req.request.method).toBe('GET');
      req.flush(mockApiCountries);
    });

    it('should use cache on subsequent calls', () => {
      // First call to populate cache
      service.getAll().subscribe();
      const req = httpMock.expectOne((req) => req.url.startsWith(`${apiUrl}/all`));
      req.flush(mockApiCountries);

      // Second call should use cache (no HTTP request)
      service.getAll().subscribe((countries) => {
        expect(countries.length).toBe(2);
      });
      httpMock.expectNone((req) => req.url.startsWith(`${apiUrl}/all`));
    });
  });

  describe('byCca3', () => {
    it('should fetch country by cca3', () => {
      const mockCountry = mockApiCountries[0];
      service.byCca3('BRA').subscribe((country) => {
        expect(country.cca3).toBe('BRA');
        expect(country.name.common).toBe('Brazil');
      });

      const req = httpMock.expectOne((req) => req.url.startsWith(`${apiUrl}/alpha/BRA`));
      expect(req.request.method).toBe('GET');
      req.flush([mockCountry]); // API returns array even for single result in some endpoints or behavior
    });
  });

  describe('search', () => {
    it('should search countries by name', () => {
      service.search('Bra').subscribe((countries) => {
        expect(countries.length).toBe(1);
        expect(countries[0].name.common).toBe('Brazil');
      });

      const req = httpMock.expectOne((req) => req.url.includes('/name/Bra'));
      expect(req.request.method).toBe('GET');
      req.flush([mockApiCountries[0]]);
    });
  });

  describe('byRegion', () => {
    it('should fetch countries by region', () => {
      service.byRegion('Americas').subscribe((countries) => {
        expect(countries.length).toBe(2);
      });

      const req = httpMock.expectOne((req) => req.url.includes('/region/Americas'));
      expect(req.request.method).toBe('GET');
      req.flush(mockApiCountries);
    });
  });

  describe('Error handling', () => {
    it('should handle 404 error', () => {
      service.byCca3('INVALID').subscribe({
        next: () => fail('should have failed with 404 error'),
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });

      const req = httpMock.expectOne((req) => req.url.startsWith(`${apiUrl}/alpha/INVALID`));
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });

    it('should handle 500 error', () => {
      service.getAll().subscribe({
        next: () => fail('should have failed with 500 error'),
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });

      const req = httpMock.expectOne((req) => req.url.startsWith(`${apiUrl}/all`));
      req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
    });
  });
});

import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Country } from '../models/country.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { mapCountry } from '../mappers/country.mapper';
import { RestCountryApiResponse } from '../models/rest-countries.model';

const FIELDS =
  'name,cca3,capital,population,region,subregion,flags,borders,languages,currencies,translations,area';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly apiUrl = environment.apiUrl;
  private readonly countriesCache = signal<Country[] | null>(null);

  constructor(private http: HttpClient) {}

  getAll(): Observable<Country[]> {
    if (this.countriesCache()) {
      return of(this.countriesCache()!);
    }

    // v5 uses the new base path; query params use q for searches. For listing all, call the base endpoint with fields.
    return this.http
      .get<RestCountryApiResponse[]>(`${this.apiUrl}?fields=${FIELDS}`)
      .pipe(
        map((data) => data.map(mapCountry)),
        tap((mapped) => this.countriesCache.set(mapped)),
      );
  }

  search(name: string): Observable<Country[]> {
    // v5 supports q=<term> searches
    return this.http
      .get<RestCountryApiResponse[]>(`${this.apiUrl}?q=${encodeURIComponent(name)}&fields=${FIELDS}`)
      .pipe(map((data) => data.map(mapCountry)));
  }

  byRegion(region: string): Observable<Country[]> {
    // Use q=region:<region> to filter by region in v5
    return this.http
      .get<RestCountryApiResponse[]>(
        `${this.apiUrl}?q=region:${encodeURIComponent(region)}&fields=${FIELDS}`,
      )
      .pipe(map((data) => data.map(mapCountry)));
  }

  byCca3(cca3: string): Observable<Country> {
    // Use q=cca3:<code> to find by code in v5
    return this.http
      .get<RestCountryApiResponse[]>(`${this.apiUrl}?q=cca3:${encodeURIComponent(cca3)}&fields=${FIELDS}`)
      .pipe(map((data) => mapCountry(Array.isArray(data) ? data[0] : data)));
  }
}

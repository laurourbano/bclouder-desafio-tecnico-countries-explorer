import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Country } from '../models/country.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private readonly apiUrl = environment.apiUrl;

  private countriesCache = signal<Country[] | null>(null);

  private readonly fields = 'name,cca3,capital,population,region,subregion,flags,borders';

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Country[]> {
    if (this.countriesCache()) {
      return of(this.countriesCache()!);
    }

    return this.http.get<Country[]>(`${this.apiUrl}/all?fields=${this.fields}`)
    .pipe(
      tap(countries => this.countriesCache.set(countries))
    );
  }
  
}

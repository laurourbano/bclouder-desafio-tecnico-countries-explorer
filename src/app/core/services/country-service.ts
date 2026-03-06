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

  private readonly fields = 'name,cca3,capital,population,region,subregion,flags,borders,area';

  private countriesCache = signal<Country[] | null>(null);

  constructor(private http: HttpClient) { }

  getAll(): Observable<Country[]> {
    if (this.countriesCache()) {
      return of(this.countriesCache()!);
    }

    return this.http
      .get<Country[]>(`${this.apiUrl}/all?fields=${this.fields}`)
      .pipe(tap(data => this.countriesCache.set(data)));
  }

  search(name: string) {
    return this.http.get<Country[]>(
      `${this.apiUrl}/name/${name}?fields=${this.fields}`
    );
  }

  byRegion(region: string) {
    return this.http.get<Country[]>(
      `${this.apiUrl}/region/${region}?fields=${this.fields}`
    );
  }

  byCca3(cca3: string) {
    return this.http.get<any>(
      `${this.apiUrl}/alpha/${cca3}?fields=${this.fields}`
    );
  }


}

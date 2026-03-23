import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Country } from '../models/country.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { mapCountry } from '../mappers/country.mapper';

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private readonly apiUrl = environment.apiUrl;

private readonly fields =
'name,cca3,capital,population,region,subregion,flags,borders,languages,currencies,translations';

private readonly fieldsLimited = 'name,cca3,capital,population,region,subregion,flags,borders,languages,currencies';

  private countriesCache = signal<Country[] | null>(null);

  constructor(private http: HttpClient) { }

getAll(): Observable<Country[]> {

  if (this.countriesCache()) {
    return of(this.countriesCache()!);
  }

  return this.http
    .get<any[]>(`${this.apiUrl}/all?fields=${this.fieldsLimited}`)
    .pipe(
      map(data => data.map(mapCountry)),
      tap(mapped => this.countriesCache.set(mapped))
    );
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
  return this.http.get<Country[]>(
    `${this.apiUrl}/alpha/${cca3}?fields=${this.fields}`
  );
}


}

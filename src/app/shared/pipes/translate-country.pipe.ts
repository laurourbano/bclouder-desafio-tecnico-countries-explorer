import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../../core/models/country.model';
import { LanguageCode } from '../../core/config/languages.config';

@Pipe({
  name: 'translateCountry',
  standalone: true
})
export class TranslateCountryPipe implements PipeTransform {
  transform(country: Country | null | undefined, lang: LanguageCode, type: 'common' | 'official' = 'common'): string {
    if (!country) return '';
    if (lang === 'eng') return country.name?.[type] || '';
    
    return country.translations?.[lang]?.[type] ?? country.name?.[type] ?? '';
  }
}

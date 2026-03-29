import { Pipe, PipeTransform } from '@angular/core';
import { UI_TRANSLATIONS } from '../../core/config/ui.translations.config';
import { LanguageCode } from '../../core/config/languages.config';

@Pipe({
  name: 'translateRegion',
  standalone: true
})
export class TranslateRegionPipe implements PipeTransform {
  transform(region: string | null | undefined, lang: LanguageCode): string {
    if (!region) return '';
    
    const uiDict = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS['eng'];
    const lowerKey = region.toLowerCase() as keyof typeof uiDict;
    
    return (uiDict[lowerKey] as string) || region;
  }
}

import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'app-theme';

  theme = signal<ThemeMode>(
    (localStorage.getItem(this.storageKey) as ThemeMode) || 'light'
  );

  constructor() {
    this.applyTheme(this.theme());
  }

  toggleTheme() {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(newTheme);
    localStorage.setItem(this.storageKey, newTheme);
    this.applyTheme(newTheme);
  }

  private applyTheme(mode: ThemeMode) {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }
}

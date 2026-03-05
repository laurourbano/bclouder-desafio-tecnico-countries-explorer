import { Component, inject, resource } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CountryService } from '../../core/services/country-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { MATERIAL_MODULES } from '../../shared/material/material.config';
import { RouterModule, Router } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    MATERIAL_MODULES,
    RouterModule
],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
 private service = inject(CountryService);
  private router = inject(Router);

  searchControl = new FormControl('');
  regionControl = new FormControl('');

  searchSignal = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      startWith('')
    ),
    { initialValue: '' }
  );

  regionSignal = toSignal(
    this.regionControl.valueChanges.pipe(startWith('')),
    { initialValue: '' }
  );

  countriesResource = resource({
    loader: async () => {
      const search = this.searchSignal();
      const region = this.regionSignal();

      if (search) {
        return firstValueFrom(this.service.search(search));
      }

      if (region) {
        return firstValueFrom(this.service.byRegion(region));
      }

      return firstValueFrom(this.service.getAll());
    }
  });

  displayedColumns = ['flag', 'name', 'population', 'region', 'actions'];

  goToDetail(country: any) {
    this.router.navigate(['/countries', country.cca3]);
  }
}

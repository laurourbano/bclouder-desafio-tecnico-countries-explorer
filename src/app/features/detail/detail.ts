import { Component, inject, signal, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountryService } from '../../core/services/country-service';
import { MATERIAL_MODULES } from '../../shared/material/material.config';
import { switchMap } from 'rxjs/operators';
import { KeyValuePipe } from '@angular/common';


@Component({
  selector: 'app-detail',
  imports: [
    RouterModule,
    MATERIAL_MODULES,
    KeyValuePipe
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail {

  private route = inject(ActivatedRoute);
  private service = inject(CountryService);
  private router = inject(Router);

  country = signal<any>(null);
  loading = signal<boolean>(true);

  constructor() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const cca3 = params.get('cca3');
          this.loading.set(true);
          return this.service.byCca3(cca3!);
        })
      )
      .subscribe(response => {

        const result = Array.isArray(response)
          ? response[0]
          : response;

        this.country.set({ ...result });

        this.loading.set(false);
      });
  }

  goToBorder(cca3: string) {
    this.router.navigate(['/countries', cca3]);
  }

  goBack(){
    this.router.navigate(['/']);
  }
}

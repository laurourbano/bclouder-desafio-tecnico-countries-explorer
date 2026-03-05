import { Component, inject, signal, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountryService } from '../../core/services/country-service';
import { MATERIAL_MODULES } from '../../shared/material/material.config';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-detail',
  imports: [
    RouterModule,
    MATERIAL_MODULES
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
          const code = params.get('code');
          this.loading.set(true);
          return this.service.byCode(code!);
        })
      )
      .subscribe(response => {

        const result = Array.isArray(response)
          ? response[0]
          : response;

        // 🔥 força nova referência
        this.country.set({ ...result });

        this.loading.set(false);
      });
  }

  goToBorder(code: string) {
    this.router.navigate(['/countries', code]);
  }

  goBack(){
    this.router.navigate(['/']);
  }
}

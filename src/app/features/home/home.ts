import { Component, inject } from '@angular/core';
import { CountryService } from '../../core/services/country-service';
import { Country } from '../../core/models/country.model';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  private service = inject(CountryService);

   countries: Country[] = [];

   load(){
    this.service.getAll().subscribe({
      next: (countries) => {
        this.countries = countries;
      },
      error: (error) => {
        console.error('Erro ao carregar países:', error);
      }
    });
   }

   clear(){
    this.countries = [];
    }


}

import { Component, inject, signal } from '@angular/core';
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

   countries = signal<Country[]>([]);

   load(){
    this.service.getAll().subscribe(data => {
        this.countries.set(data);
      },
      error => {
        alert('Erro ao carregar os países: ' + error.message);
      }
    );
   }

   clear(){
    this.countries.set([]);
    }


}

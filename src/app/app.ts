import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Explorador de Países');

  protected readonly menuItems = [
    {
      label: 'Lista de Países',
      route: '/'
    },
    {
      label: 'Saiba Mais',
      route: '/saiba-mais'
    }
  ];

}

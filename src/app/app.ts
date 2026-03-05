import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MATERIAL_MODULES } from './shared/material/material.config';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    MATERIAL_MODULES
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Explorador de Países');
}

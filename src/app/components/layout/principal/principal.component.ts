import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal'; // Adicione esta linha

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MenuComponent, RouterOutlet, MdbModalModule], // Adicione MdbModalModule aqui
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {}
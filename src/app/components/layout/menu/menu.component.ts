import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { LoginService } from '../../../auth/login.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MdbCollapseModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  loginService = inject(LoginService);

  @ViewChild('modalAltera') modalAltera!: TemplateRef<any>; 
  modalService = inject(MdbModalService); 
  modalRef!: MdbModalRef<any>; 

  consultas: any[] = [];
  loadingMinhasConsultas = false;
  erroMinhasConsultas = '';


  modalAlterarSenha() {
    this.modalRef = this.modalService.open(this.modalAltera);
  }

  meuEventoTratamento(usuario: any) {
    this.modalRef.close();
  }
  
  
}
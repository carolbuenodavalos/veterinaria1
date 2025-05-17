import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Vacina } from '../../../../models/vacina';
import { VacinaService } from '../../../../services/vacina';
import { FormsModule } from '@angular/forms';
import { VacinaFormComponent } from '../../../entidades/vacina/vacina-form/vacina-form.component';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vacinas-list',
  standalone: true,
  imports: [CommonModule, FormsModule, VacinaFormComponent, MdbModalModule],
  templateUrl: './vacina-list.component.html',
  styleUrl: './vacina-list.component.scss',
})
export class VacinaListComponent {
  lista: Vacina[] = [];
  pesquisa: string = "";
  vacinaEdit!: Vacina;

  
  @Input("modoModal") modoModal: boolean = false;
  @Output("meuEvento") meuEvento = new EventEmitter();
  vacinaService = inject(VacinaService);
  
  @ViewChild("modalVacinaForm") modalVacinaForm!: TemplateRef<any>;
  modalService = inject(MdbModalService);
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.findAll();
  }

  findAll() {
    this.vacinaService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  delete(vacina: Vacina) {
    Swal.fire({
      title: 'Deseja mesmo deletar?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.vacinaService.deleteById(vacina.id!).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.findAll();
          },
          error: (erro) => {
            Swal.fire(erro.error, '', 'error');
          }
        });
      }
    });
  }

  findByNome() {
    this.vacinaService.findByNome(this.pesquisa).subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  new() {
    this.vacinaEdit = new Vacina();
    this.modalRef = this.modalService.open(this.modalVacinaForm, { modalClass: 'modal-xl' });
  }

  edit(vacina: Vacina) {
    this.vacinaEdit = vacina;
    this.modalRef = this.modalService.open(this.modalVacinaForm, { modalClass: 'modal-xl' });
  }

  meuEventoTratamento(mensagem: any) {
    this.findAll();
    this.modalRef.close();
  }
}
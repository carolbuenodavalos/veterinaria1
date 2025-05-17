import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Consulta } from '../../../../models/consulta';
import { ConsultaService } from '../../../../services/consulta';
import { FormsModule } from '@angular/forms';
import { ConsultaFormComponent } from '../consulta-form/consulta-form.component';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { CommonModule, DatePipe } from '@angular/common';
import { MedicosListComponent } from '../../medico/medico-list/medico-list.component';

@Component({
  selector: 'app-consultas-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ConsultaFormComponent, MdbModalModule],
  providers: [DatePipe],
  templateUrl: './consulta-list.component.html',
  styleUrl: './consulta-list.component.scss',
})
export class ConsultaListComponent {
  lista: Consulta[] = [];
  pesquisa: string = "";
  consultaEdit!: Consulta;

  consultaService = inject(ConsultaService);
  
  @ViewChild("modalConsultaForm") modalConsultaForm!: TemplateRef<any>;
  modalService = inject(MdbModalService);
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.findAll();
  }

  findAll() {
    this.consultaService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  delete(consulta: Consulta) {
    Swal.fire({
      title: 'Deseja mesmo deletar?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.consultaService.deleteById(consulta.id!).subscribe({
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

  findByDescricao() {
    this.consultaService.findByDescricao(this.pesquisa).subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  new() {
    this.consultaEdit = new Consulta();
    this.modalRef = this.modalService.open(this.modalConsultaForm, { modalClass: 'modal-xl' });
  }

  edit(consulta: Consulta) {
    this.consultaEdit = consulta;
    this.modalRef = this.modalService.open(this.modalConsultaForm, { modalClass: 'modal-xl' });
  }

  meuEventoTratamento(mensagem: any) {
    this.findAll();
    this.modalRef.close();
  }
}
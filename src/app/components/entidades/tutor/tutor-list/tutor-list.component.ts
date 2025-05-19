import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Tutor } from '../../../../models/tutor';
import { TutorService } from '../../../../services/tutor';
import { FormsModule } from '@angular/forms';
import { TutorFormComponent } from '../../../entidades/tutor/tutor-form/tutor-form.component';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { LoginService } from '../../../../auth/login.service';

@Component({
  selector: 'app-tutor-list',
  standalone: true,
  imports: [FormsModule, TutorFormComponent, MdbModalModule],
  templateUrl: './tutor-list.component.html',
  styleUrl: './tutor-list.component.scss',
})
export class TutorListComponent {

  lista: Tutor[] = [];
  pesquisa: string = "";
  tutorEdit!: Tutor;

  
  @Input("modoModal") modoModal: boolean = false;
  @Output("meuEvento") meuEvento = new EventEmitter();
  tutorService = inject(TutorService);
  loginService = inject(LoginService);
  
  @ViewChild("modalTutorForm") modalTutorForm!: TemplateRef<any>;
  modalService = inject(MdbModalService);
  modalRef!: MdbModalRef<any>;
  animal: any;

  constructor() {
    this.findAll();
  }

  findAll() {
    this.tutorService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  delete(tutor: Tutor) {
    Swal.fire({
      title: 'Deseja mesmo deletar?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tutorService.deleteById(tutor.id!).subscribe({
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
    this.tutorService.findByNome(this.pesquisa).subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  new() {
    this.tutorEdit = new Tutor();
    this.modalRef = this.modalService.open(this.modalTutorForm, { modalClass: 'modal-xl' });
  }

  edit(tutor: Tutor) {
    this.tutorEdit = tutor;
    this.modalRef = this.modalService.open(this.modalTutorForm, { modalClass: 'modal-xl' });
  }

  meuEventoTratamento(mensagem: any) {
    this.findAll();
    this.modalRef.close();

  }

  meuEventoTratamentoTutor(tutor: Tutor) { // Tipo explícito
    this.animal.tutor = tutor;
    this.modalRef.close();
  }
}
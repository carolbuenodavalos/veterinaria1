import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Consulta } from '../../../../models/consulta';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaService } from '../../../../services/consulta';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Animal } from '../../../../models/animal';
import { AnimalService } from '../../../../services/animal';
import Swal from 'sweetalert2';
import { Medico } from '../../../../models/medico';
import { MedicoService } from '../../../../services/medico';
import { MedicosListComponent } from '../../medico/medico-list/medico-list.component';
import { AnimalListComponent } from '../../animal/animal-list/animal-list.component';

@Component({
  selector: 'app-consulta-form',
  standalone: true,
  imports: [AnimalListComponent, MedicosListComponent, MdbFormsModule, FormsModule],
  templateUrl: './consulta-form.component.html',
  styleUrl: './consulta-form.component.scss'
})
export class ConsultaFormComponent {
  @Input("consulta") consulta: Consulta = new Consulta();
  @Output("meuEvento") meuEvento = new EventEmitter();

  listaAnimais!: Animal[];
  listaMedicos!: Medico[];

  rotaAtiva = inject(ActivatedRoute);
  roteador = inject(Router);
  consultaService = inject(ConsultaService);
  animalService = inject(AnimalService);
  medicoService = inject(MedicoService);

  @ViewChild("modalAnimaisList") modalAnimaisList!: TemplateRef<any>;
  @ViewChild("modalMedicosList") modalMedicosList!: TemplateRef<any>;
  modalService = inject(MdbModalService);
  modalRef!: MdbModalRef<any>;

  constructor() {
    let id = this.rotaAtiva.snapshot.params['id'];
    if (id) {
      this.findById(id);
    }
    this.findAllAnimais();
    this.findAllMedicos();
  }

  findById(id: number) {
    this.consultaService.findById(id).subscribe({
      next: (consulta) => {
        this.consulta = consulta;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  save() {
    if (this.consulta.id! > 0) {
      this.consultaService.update(this.consulta, this.consulta.id!).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['admin/consultas']);
          this.meuEvento.emit("OK");
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        }
      });
    } else {
      this.consultaService.save(this.consulta).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['admin/consultas']);
          this.meuEvento.emit("OK");
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        }
      });
    }
  }

  findAllAnimais() {
    this.animalService.findAll().subscribe({
      next: (lista) => {
        this.listaAnimais = lista;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  findAllMedicos() {
    this.medicoService.findAll().subscribe({
      next: (lista) => {
        this.listaMedicos = lista;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  compareId(a: any, b: any) {
    return a && b ? a.id === b.id : a === b;
  }

  buscarAnimal() {
    this.modalRef = this.modalService.open(this.modalAnimaisList, { modalClass: 'modal-xl' });
  }

  buscarMedico() {
    this.modalRef = this.modalService.open(this.modalMedicosList, { modalClass: 'modal-xl' });
  }

  meuEventoTratamentoAnimal(animal: Animal) {
    this.consulta.animal = animal;
    this.modalRef.close();
  }

  meuEventoTratamentoMedico(medico: Medico) {
    this.consulta.medico = medico;
    this.modalRef.close();
  }
}

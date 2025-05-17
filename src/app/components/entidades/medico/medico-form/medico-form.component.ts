import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Medico } from '../../../../models/medico';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService } from '../../../../services/medico';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './medico-form.component.html',
  styleUrl: './medico-form.component.scss'
})
export class MedicoFormComponent {
  medico: Medico = new Medico();

  rotaAtiva = inject(ActivatedRoute);
  roteador = inject(Router);
  medicoService = inject(MedicoService);

  constructor() {
    let id = this.rotaAtiva.snapshot.params['id'];
    if (id) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.medicoService.findById(id).subscribe({
      next: (medico) => {
        this.medico = medico;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  save() {
    if (this.medico.id! > 0) {
      this.medicoService.update(this.medico, this.medico.id!).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['admin/medicos']);
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        }
      });
    } else {
      this.medicoService.save(this.medico).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['admin/medicos']);
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        }
      });
    }
  }
}
import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Vacina } from '../../../../models/vacina';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VacinaService } from '../../../../services/vacina';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Animal } from '../../../../models/animal';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { AnimalListComponent } from "../../animal/animal-list/animal-list.component";


@Component({
  selector: 'app-vacina-form',
  standalone: true,
  imports: [CommonModule, MdbFormsModule, FormsModule, NgxMaskDirective], // Remova AnimalListComponent
  templateUrl: './vacina-form.component.html',
  styleUrls: ['./vacina-form.component.scss']
})
export class VacinaFormComponent {
  @Input("vacina") vacina: Vacina = new Vacina();
  @Output("meuEvento") meuEvento = new EventEmitter();

  rotaAtiva = inject(ActivatedRoute);
  roteador = inject(Router);
  vacinaService = inject(VacinaService);
  
  findById(id: number) {
    this.vacinaService.findById(id).subscribe({
      next: (vacina) => {
        this.vacina = vacina;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  save() {
    if (this.vacina.id! > 0) {
      this.vacinaService.update(this.vacina, this.vacina.id!).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['admin/vacinas']);
          this.meuEvento.emit("OK");
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        }
      });
    } else {
      this.vacinaService.save(this.vacina).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['admin/vacinas']);
          this.meuEvento.emit("OK");
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        }
      });
    }
  }


  compareId(a: any, b: any) {
    return a && b ? a.id === b.id : a === b;
  }

}


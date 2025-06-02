import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Update the path below if the actual file is named differently or located elsewhere, e.g. '../../services/consulta.service'
import { ConsultaService } from '../../../services/consulta';
import { LoginService } from '../../../auth/login.service';
import { AnimalService } from '../../../services/animal';
import { TutorService } from '../../../services/tutor';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'

  
})
export class DashboardComponent implements OnInit {
  consultaService = inject(ConsultaService);
  loginService = inject(LoginService);
  animalService = inject(AnimalService);
  tutorService = inject(TutorService);

  adminCards = [
    { title: 'Total de Tutores', value: 0, icon: 'fa-users' },
    { title: 'Total de Animais', value: 0, icon: 'fa-paw' },
  ];
  veterinarioCards = [
    { title: 'Consultas Hoje', value: 0, icon: 'fa-calendar-check' },
    { title: 'Próximas Consultas', value: 0, icon: 'fa-clock' }
  ];

  proximasConsultas: any[] = [];

    constructor() {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.animalService.count().subscribe(total => this.adminCards[1].value = total);
    this.tutorService.count().subscribe(total => this.adminCards[0].value = total);
    const medicoId = this.loginService.getIdUsuarioLogado();
    if (medicoId) {
      this.consultaService.getProximasConsultasDoMedico(medicoId).subscribe(consultas => {
        this.proximasConsultas = consultas;
        this.veterinarioCards[2].value = consultas.length;
      });
    }
  }
}
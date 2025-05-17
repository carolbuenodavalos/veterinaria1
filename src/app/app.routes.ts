import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { MenuComponent } from './components/layout/menu/menu.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { AnimalListComponent } from './components/entidades/animal/animal-list/animal-list.component';
import { AnimalFormComponent } from './components/entidades/animal/animal-form/animal-form.component';
import { TutorListComponent } from './components/entidades/tutor/tutor-list/tutor-list.component';
import { TutorFormComponent } from './components/entidades/tutor/tutor-form/tutor-form.component';
import { MedicosListComponent } from './components/entidades/medico/medico-list/medico-list.component';
import { MedicoFormComponent } from './components/entidades/medico/medico-form/medico-form.component';
import { VacinaListComponent } from './components/entidades/vacina/vacina-list/vacina-list.component';
import { VacinaFormComponent } from './components/entidades/vacina/vacina-form/vacina-form.component';
import { ConsultaListComponent } from './components/entidades/consulta/consulta-list/consulta-list.component';
import { ConsultaFormComponent } from './components/entidades/consulta/consulta-form/consulta-form.component';
import { loginGuard } from './auth/login.guard';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full' },
    { path: "login", component: LoginComponent },
    { 
        path: "admin", 
        component: PrincipalComponent, canActivate:[loginGuard], children: [
                 { path: "", redirectTo: "dashboard", pathMatch: "full"},            {path: "dashboard", component: DashboardComponent},
            { path: "menu", component: MenuComponent },
            { path: "animais", component: AnimalListComponent },
            { path: "animais/new", component: AnimalFormComponent },
            { path: "animais/edit/:id", component: AnimalFormComponent },
            { path: "tutores", component: TutorListComponent },
            { path: "tutores/new", component: TutorFormComponent },
            { path: "tutores/edit/:id", component: TutorFormComponent },
            { path: "medicos", component: MedicosListComponent },
            { path: "medicos/new", component: MedicoFormComponent },
            { path: "medicos/edit/:id", component: MedicoFormComponent },
            { path: "vacinas", component: VacinaListComponent },
            { path: "vacinas/new", component: VacinaFormComponent },
            { path: "vacinas/edit/:id", component: VacinaFormComponent },
            { path: "consultas", component: ConsultaListComponent },
            { path: "consultas/new", component: ConsultaFormComponent },
            { path: "consultas/edit/:id", component: ConsultaFormComponent }
        ]
    }
];
import { Component, inject } from '@angular/core';
import { Login } from '../../../auth/login';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MdbFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  login: Login = new Login();

  router = inject(Router);
  loginService = inject(LoginService);

  constructor(){
    this.loginService.removerToken();
  }

  logar() {

    this.loginService.logar(this.login).subscribe({
      next: token => {
        if (token) this.loginService.addToken(token);

        // BLOQUEIOS IGUAIS AO loginGuard
        if (this.loginService.hasRole("ROLE_VETERINARIO")) {
          // Veterinário NÃO pode acessar tutores, médicos, cadastrar vacinas, editar tutores
          this.gerarToast().fire({ icon: "success", title: "Seja bem-vindo!" });
          this.router.navigate(['admin/dashboard']);
        }
        else if (this.loginService.hasRole("ROLE_ADMIN")) {
          // Admin NÃO pode acessar consultas
          this.gerarToast().fire({ icon: "success", title: "Seja bem-vindo!" });
          this.router.navigate(['admin/dashboard']);
        }
        else {
          Swal.fire('Você não tem permissão para acessar essa página!', '', 'error');
          this.router.navigate(['login']);
        }
      },
      error: erro => {
        Swal.fire('Usuário ou senha incorretos!', '', 'error');
      }
    })


  }
  gerarToast() {
    return Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

}

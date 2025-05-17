import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';

export const loginGuard: CanActivateFn = (route, state) => {

  let loginService = inject(LoginService);
  if(loginService.hasRole("ROLE_VETERINARIO") && state.url == "/admin/tutores") {
    alert("Você não tem permissão para acessar essa página.");
    return false;
  }
  return true;
};

import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';

export const loginGuard: CanActivateFn = (route, state) => {

  let loginService = inject(LoginService);
  if(loginService.hasRole("ROLE_VETERINARIO") && state.url == "/admin/tutores") {
    alert("Você não tem permissão para acessar essa página.");
    return false;
  }

  if (loginService.hasRole("ROLE_VETERINARIO") && state.url.startsWith("/admin/medicos")) {
  alert("Você não tem permissão para acessar médicos.");
  return false;
 }

 if (loginService.hasRole("ROLE_ADMIN") && state.url.startsWith("/admin/consultas")) {
  alert("Somente veterinários podem acessar consultas.");
  return false;
}

if (loginService.hasRole("ROLE_VETERINARIO") && state.url === "/admin/vacinas/new") {
  alert("Apenas administradores podem cadastrar vacinas.");
  return false;
}

if (loginService.hasRole("ROLE_VETERINARIO") && state.url.startsWith("/admin/tutores/edit")) {
  alert("Apenas administradores podem editar tutores.");
  return false;
}

  
  return true;
  
};

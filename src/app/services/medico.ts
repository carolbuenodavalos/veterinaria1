import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from '../models/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  http = inject(HttpClient);
  API = 'http://localhost:8080/api/medico';

  constructor() { }

  findAll(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.API + '/findAll');
  }

  findById(id: number): Observable<Medico> {
    return this.http.get<Medico>(this.API + '/findById/' + id);
  }

  findByNome(nome: string): Observable<Medico[]> {
    let par = new HttpParams().set('nome', nome);
    return this.http.get<Medico[]>(this.API + '/findByNome', { params: par });
  }

  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/deleteById/' + id, { responseType: 'text' as 'json' });
  }

  save(medico: Medico): Observable<string> {
    return this.http.post<string>(this.API + '/save', medico, { responseType: 'text' as 'json' });
  }

  update(medico: Medico, id: number): Observable<string> {
    return this.http.put<string>(this.API + '/update/' + id, medico, { responseType: 'text' as 'json' });
  }
}
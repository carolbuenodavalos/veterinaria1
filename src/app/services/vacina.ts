import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacina } from '../models/vacina';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacinaService {
  http = inject(HttpClient);
  API = environment.SERVIDOR+'/api/vacina';

  constructor() { }

  findAll(): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(this.API + '/findAll');
  }

  findById(id: number): Observable<Vacina> {
    return this.http.get<Vacina>(this.API + '/findById/' + id);
  }

  findByNome(nome: string): Observable<Vacina[]> {
    let par = new HttpParams().set('nome', nome);
    return this.http.get<Vacina[]>(this.API + '/findByNome', { params: par });
  }

  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/deleteById/' + id, { responseType: 'text' as 'json' });
  }

  save(vacina: Vacina): Observable<string> {
    return this.http.post<string>(this.API + '/save', vacina, { responseType: 'text' as 'json' });
  }

  update(vacina: Vacina, id: number): Observable<string> {
    return this.http.put<string>(this.API + '/update/' + id, vacina, { responseType: 'text' as 'json' });
  }
}
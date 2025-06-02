import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from '../models/tutor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  http = inject(HttpClient);
  API = environment.SERVIDOR+'/api/tutor';

  constructor() { }

  findAll(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(this.API + '/findAll');
  }

  findById(id: number): Observable<Tutor> {
    return this.http.get<Tutor>(this.API + '/findById/' + id);
  }

  findByNome(nome: string): Observable<Tutor[]> {
    let par = new HttpParams().set('nome', nome);
    return this.http.get<Tutor[]>(this.API + '/findByNome', { params: par });
  }

  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/deleteById/' + id, { responseType: 'text' as 'json' });
  }

  save(tutor: Tutor): Observable<string> {
    return this.http.post<string>(this.API + '/save', tutor, { responseType: 'text' as 'json' });
  }

  update(tutor: Tutor, id: number): Observable<string> {
    return this.http.put<string>(this.API + '/update/' + id, tutor, { responseType: 'text' as 'json' });
  }

  count(): Observable<number> {
    return this.http.get<number>(this.API + '/count');
  }
}
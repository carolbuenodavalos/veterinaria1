import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  http = inject(HttpClient);
  API = environment.SERVIDOR+'/api/animal';

  constructor() { }

  findAll(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.API + '/findAll');
  }

  findById(id: number): Observable<Animal> {
    return this.http.get<Animal>(this.API + '/findById/' + id);
  }

  findByNome(nome: string): Observable<Animal[]> {
    let par = new HttpParams().set('nome', nome);
    return this.http.get<Animal[]>(this.API + '/findByNome', { params: par });
  }

  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/deleteById/' + id, { responseType: 'text' as 'json' });
  }

  save(animal: Animal): Observable<string> {
    return this.http.post<string>(this.API + '/save', animal, { responseType: 'text' as 'json' });
  }

  update(animal: Animal, id: number): Observable<string> {
    return this.http.put<string>(this.API + '/update/' + id, animal, { responseType: 'text' as 'json' });
  }

  count(): Observable<number> {
    return this.http.get<number>(this.API + '/count');
  }
}
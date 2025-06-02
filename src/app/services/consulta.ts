import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  http = inject(HttpClient);
  API = environment.SERVIDOR+'/api/consulta';

  constructor() { }

  findAll(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.API + '/findAll');
  }

  findById(id: number): Observable<Consulta> {
    return this.http.get<Consulta>(this.API + '/findById/' + id);
  }

  findByDescricao(descricao: string): Observable<Consulta[]> {
    let par = new HttpParams().set('descricao', descricao);
    return this.http.get<Consulta[]>(this.API + '/findByDescricao', { params: par });
  }

  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/deleteById/' + id, { responseType: 'text' as 'json' });
  }

  save(consulta: Consulta): Observable<string> {
    return this.http.post<string>(this.API + '/save', consulta, { responseType: 'text' as 'json' });
  }

  update(consulta: Consulta, id: number): Observable<string> {
    return this.http.put<string>(this.API + '/update/' + id, consulta, { responseType: 'text' as 'json' });
  }

  getMinhasConsultas(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:8080/api/consulta/minhas-consultas');
}

getProximasConsultasDoMedico(id: number) {
  return this.http.get<Consulta[]>(this.API + `/medico/${id}/proximas-consultas`);
}
}
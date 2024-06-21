import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Telefone } from '../models/telefone.model';


@Injectable({
  providedIn: 'root',
})
export class TelefoneService {
  private baseUrl = 'http://localhost:8080/telefones';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<Telefone[]> {
    return this.httpClient.get<Telefone[]>(this.baseUrl);
  }

  findById(id: String): Observable<Telefone> {
    return this.httpClient.get<Telefone>(`${this.baseUrl}/${id}`);
  }

  findByIdCliente(idCliente: String): Observable<Telefone[]> {
    return this.httpClient.get<Telefone[]>(
      `${this.baseUrl}/cliente/${idCliente}`
    );
  }

  // insert(telefone: Telefone): Observable<Telefone> {
  //   return this.httpClient.post<Telefone>(`${this.baseUrl}/usuario`, telefone);
  // }

  insert(telefone: Telefone, idCliente: string): Observable<Telefone> {
    return this.httpClient.post<Telefone>(`${this.baseUrl}/cliente/${idCliente}`, telefone);
  }

  update(telefone: Telefone): Observable<Telefone> {
    return this.httpClient.put<Telefone>(
      `${this.baseUrl}/${telefone.id}`,
      telefone
    );
  }

  delete(telefone: Telefone): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${telefone.id}`);
  }
}

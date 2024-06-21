import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca.model';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private baseUrl = 'http://localhost:8080/marca';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<Marca[]> {
    return this.httpClient.get<Marca[]>(this.baseUrl);
  }

  findById(idMarca: string): Observable<Marca> {
    return this.httpClient.get<Marca>(`${this.baseUrl}/${idMarca}`);
  }

  insertMarca(marca: Marca): Observable<Marca> {
    return this.httpClient.post<Marca>(this.baseUrl, marca);
  }

  updateMarca(marca: Marca): Observable<Marca> {
    return this.httpClient.put<Marca>(`${this.baseUrl}/${marca.id}`, marca);
  }

  delete(marca: Marca): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${marca.id}`);
  }

}
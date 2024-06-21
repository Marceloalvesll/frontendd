import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParteBateria } from '../models/partebateria.model';

@Injectable({
  providedIn: 'root'
})
export class ParteBateriaService {
  private baseUrl = 'http://localhost:8080/produto';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<ParteBateria[]> {
    return this.httpClient.get<ParteBateria[]>(this.baseUrl);
  }

  findById(id: string): Observable<ParteBateria> {
   return this.httpClient.get<ParteBateria>(`${this.baseUrl}/${id}`);
  }

  insert(parteBateria: ParteBateria): Observable<ParteBateria> {
    return this.httpClient.post<ParteBateria>(this.baseUrl, parteBateria);
   }

  update(parteBateria: ParteBateria): Observable<ParteBateria> {
   return this.httpClient.put<ParteBateria>(`${this.baseUrl}/${parteBateria.id}`, parteBateria);
   }

  delete(parteBateria: ParteBateria): Observable<any> {
     return this.httpClient.delete<any>(`${this.baseUrl}/${parteBateria.id}`);
  }

}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acessorio } from '../models/acessorio.model';



@Injectable({
  providedIn: 'root'
})
export class AcessorioService {
  private baseUrl = 'http://localhost:8080/acessorio';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<Acessorio[]> {
    return this.httpClient.get<Acessorio[]>(this.baseUrl);
  }

  findById(id: string): Observable<Acessorio> {
    return this.httpClient.get<Acessorio>(`${this.baseUrl}/${id}`);
  }


  insert(acessorio: Acessorio): Observable<Acessorio> {
    const data = {
        nomeAcessorio: acessorio.nomeAcessorio,
      descricao: acessorio.descricao,
      preco: acessorio.preco,
      quantidadeEstoque: acessorio.quantidadeEstoque,
      nomeImagem: acessorio.nomeImagem,
      IdCategoria: acessorio.categoria.id,
      IdMarca: acessorio.marca.id
      
    }
    return this.httpClient.post<Acessorio>(this.baseUrl, data);
  }

  update(acessorio: Acessorio): Observable<Acessorio> {
    const data = {
        nomeAcessorio: acessorio.nomeAcessorio,
        descricao: acessorio.descricao,
        preco: acessorio.preco,
        quantidadeEstoque: acessorio.quantidadeEstoque,
        nomeImagem: acessorio.nomeImagem,
        IdMarca: acessorio.marca.id,
        IdCategoria: acessorio.categoria.id
    }
    return this.httpClient.put<Acessorio>(`${this.baseUrl}/${acessorio.id}`, data);
  }

  delete(acessorio: Acessorio): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${acessorio.id}`);
  }

}
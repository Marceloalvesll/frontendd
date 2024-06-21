import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Baqueta } from '../models/baqueta.model';


@Injectable({
  providedIn: 'root'
})
export class BaquetaService {
  private baseUrl = 'http://localhost:8080/baqueta';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<Baqueta[]> {
    return this.httpClient.get<Baqueta[]>(this.baseUrl);
  }

  findById(id: string): Observable<Baqueta> {
    return this.httpClient.get<Baqueta>(`${this.baseUrl}/${id}`);
  }


  insert(baqueta: Baqueta): Observable<Baqueta> {
    const data = {
      nomeBaqueta: baqueta.nomeBaqueta,
      descricao: baqueta.descricao,
      preco: baqueta.preco,
      quantidadeEstoque: baqueta.quantidadeEstoque,
      nomeImagem: baqueta.nomeImagem,
      IdCategoria: baqueta.categoria.id,
      IdMarca: baqueta.marca.id
      
    }
    return this.httpClient.post<Baqueta>(this.baseUrl, data);
  }

  update(baqueta: Baqueta): Observable<Baqueta> {
    const data = {
      nomeBaqueta: baqueta.nomeBaqueta,
      descricao: baqueta.descricao,
      preco: baqueta.preco,
      quantidadeEstoque: baqueta.quantidadeEstoque,
      nomeImagem: baqueta.nomeImagem,
      IdCategoria: baqueta.categoria.id,
      IdMarca: baqueta.marca.id
    }
    return this.httpClient.put<Baqueta>(`${this.baseUrl}/${baqueta.id}`, data);
  }

  delete(baqueta: Baqueta): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${baqueta.id}`);
  }

}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TamborAvulso } from '../models/tamboravulso.model';


@Injectable({
  providedIn: 'root'
})
export class TamborAvulsoService {
  private baseUrl = 'http://localhost:8080/tamboravulso';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<TamborAvulso[]> {
    return this.httpClient.get<TamborAvulso[]>(this.baseUrl);
  }

  findById(id: string): Observable<TamborAvulso> {
    return this.httpClient.get<TamborAvulso>(`${this.baseUrl}/${id}`);
  }


  insert(tamborAvulso: TamborAvulso): Observable<TamborAvulso> {
    const data = {
      nomeTambor: tamborAvulso.nomeTambor,
      descricao: tamborAvulso.descricao,
      preco: tamborAvulso.preco,
      quantidadeEstoque: tamborAvulso.quantidadeEstoque,
      nomeImagem: tamborAvulso.nomeImagem,
      IdCategoria: tamborAvulso.categoria.id,
      IdMarca: tamborAvulso.marca.id
      
    }
    return this.httpClient.post<TamborAvulso>(this.baseUrl, data);
  }

  update(tamborAvulso: TamborAvulso): Observable<TamborAvulso> {
    const data = {
        nomeTambor: tamborAvulso.nomeTambor,
        descricao: tamborAvulso.descricao,
        preco: tamborAvulso.preco,
        quantidadeEstoque: tamborAvulso.quantidadeEstoque,
        nomeImagem: tamborAvulso.nomeImagem,
        IdCategoria: tamborAvulso.categoria.id,
        IdMarca: tamborAvulso.marca.id
    }
    return this.httpClient.put<TamborAvulso>(`${this.baseUrl}/${tamborAvulso.id}`, data);
  }

  delete(tamborAvulso: TamborAvulso): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${tamborAvulso.id}`);
  }

}
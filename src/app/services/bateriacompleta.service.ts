import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BateriaCompleta } from '../models/bateriacompleta.model';


@Injectable({
  providedIn: 'root'
})
export class BateriaCompletaService {
  private baseUrl = 'http://localhost:8080/bateriacompleta';

  constructor(private httpClient: HttpClient) {  }

  // findAll(): Observable<BateriaCompleta[]> {
  //   return this.httpClient.get<BateriaCompleta[]>(this.baseUrl);
  // }

  // findAlll(pagina: number, tamanhoPagina: number): Observable<BateriaCompleta[]> {
  //   const params = {
  //     page: pagina.toString(),
  //     pageSize: tamanhoPagina.toString()
  //   }
  //   return this.httpClient.get<BateriaCompleta[]>(`${this.baseUrl}`, { params });
  // }

  findAll(page?: number, pageSize?: number): Observable<BateriaCompleta[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<BateriaCompleta[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<BateriaCompleta> {
    return this.httpClient.get<BateriaCompleta>(`${this.baseUrl}/${id}`);
  }

  getUrlImagem(nomeImagem: string): string {
    return `${this.baseUrl}/image/download/${nomeImagem}`;
  }

  uploadImagem(id: number, nomeImagem: string, imagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString());
    formData.append('nomeImagem', imagem.name);
    formData.append('imagem', imagem, imagem.name);

    return this.httpClient.patch<BateriaCompleta>(`${this.baseUrl}/image/upload`, formData);
  }


  insert(bateriaCompleta: BateriaCompleta): Observable<BateriaCompleta> {
    const data = {
      nomeBateria: bateriaCompleta.nomeBateria,
      quantidadeTambor: bateriaCompleta.quantidadeTambor,
      descricao: bateriaCompleta.descricao,
      preco: bateriaCompleta.preco,
      quantidadeEstoque: bateriaCompleta.quantidadeEstoque,
      nomeImagem: bateriaCompleta.nomeImagem,
      IdCategoria: bateriaCompleta.categoria.id,
      IdMarca: bateriaCompleta.marca.id
      
    }
    return this.httpClient.post<BateriaCompleta>(this.baseUrl, data);
  }

  update(bateriaCompleta: BateriaCompleta): Observable<BateriaCompleta> {
    const data = {
        nomeBateria: bateriaCompleta.nomeBateria,
        quantidadeTambor: bateriaCompleta.quantidadeTambor,
        descricao: bateriaCompleta.descricao,
        preco: bateriaCompleta.preco,
        quantidadeEstoque: bateriaCompleta.quantidadeEstoque,
        nomeImagem: bateriaCompleta.nomeImagem,
        IdMarca: bateriaCompleta.marca.id,
        IdCategoria: bateriaCompleta.categoria.id
    }
    return this.httpClient.put<BateriaCompleta>(`${this.baseUrl}/${bateriaCompleta.id}`, data);
  }

  delete(bateriaCompleta: BateriaCompleta): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${bateriaCompleta.id}`);
  }

}
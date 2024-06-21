import { Cliente } from './../models/cliente.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from '../models/endereco.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private baseUrl = 'http://localhost:8080/cliente';


  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.baseUrl);
  }

  findByLogin(login: string): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.baseUrl}/search/login/${login}`);
  }

  // findByLogin(login: string): Observable<Usuario> {
  //   return this.httpClient.get<Usuario>(`${this.baseUrl}/search/login/${login}`);
  // }

  alterarSenha(obj: {antigaSenha: string | null, novaSenha: string | null}){
    if(obj.antigaSenha && obj.novaSenha) 
      return this.httpClient.patch(`${this.baseUrl}/alterar-senha`, obj);
    else throw Error("Preencha os campos corretamente!")
  }

  findById(id: String): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.baseUrl}/${id}`);
  }

  insert(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.baseUrl, cliente);
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(`${this.baseUrl}/${cliente.id}`,cliente);
  }

  delete(cliente: Cliente): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${cliente.id}`);
  }

  getEnderecos(){
    return this.httpClient.get<Endereco[]>(`${this.baseUrl}/enderecos`)
  }
}

import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class AuthClienteService {

  private baseURL: string = 'http://localhost:8080/auth/cliente';
  private tokenKey = 'jwt_token';
  private clienteLogadoKey = 'cliente_logado';
  private clienteLogadoSubject = new BehaviorSubject<Cliente | null>(null);


  constructor(private handler: HttpBackend,
    private localStorageService: LocalStorageService,
    private jwtHelper: JwtHelperService,
    private http: HttpClient) {


    // this.http = new HttpClient(handler);
    this.initClienteLogado();

  }

  // private initClienteLogado() {
  //   const cliente = localStorage.getItem(this.clienteLogadoKey);
  //   if (cliente) {
  //     const clienteLogado = JSON.parse(cliente);
  //     this.setClienteLogado(clienteLogado);
  //     this.clienteLogadoSubject.next(clienteLogado);
  //   }
  // }

  private initClienteLogado() {
    const cliente = this.localStorageService.getItem(this.clienteLogadoKey);
    console.log('Inicializando cliente logado do localStorage:', cliente);
    if (cliente) {

      this.setClienteLogado(cliente);
      this.clienteLogadoSubject.next(cliente);
    }
  }




  login(login: string, senha: string): Observable<any> {
    const params = {
      login: login,
      senha: senha,
      //  perfil: 1 //  
    };

    //{ observe: 'response' } para garantir que a resposta completa seja retornada (incluindo o cabeçalho)
    return this.http.post(`${this.baseURL}`, params, { observe: 'response' }).pipe(
      tap((res: any) => {
        const authToken = res.headers.get('Authorization') ?? '';
        if (authToken) {
          this.setToken(authToken);
          const clienteLogado = res.body;
          // console.log(clienteLogado);
          if (clienteLogado) {
            this.setClienteLogado(clienteLogado);
            this.clienteLogadoSubject.next(clienteLogado);
          }
        }
      })
    );
  }

  setClienteLogado(cliente: Cliente): void {
    this.localStorageService.setItem(this.clienteLogadoKey, cliente);
  }

  setToken(token: string): void {
    this.localStorageService.setItem(this.tokenKey, token);
  }

  getClienteLogado() {
     return this.clienteLogadoSubject.asObservable();
  }

  // getClienteLogado(): Observable<Cliente | null> {
  //   return this.clienteLogadoSubject.asObservable();
  // }

  getToken(): string | null {
    return this.localStorageService.getItem(this.tokenKey);
  }

  removeToken(): void {
    this.localStorageService.removeItem(this.tokenKey);
  }

  removeClienteLogado(): void {
    this.localStorageService.removeItem(this.clienteLogadoKey);
    this.clienteLogadoSubject.next(null);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    // Verifica se o token é nulo ou está expirado
    return !token || this.jwtHelper.isTokenExpired(token);
    // npm install @auth0/angular-jwt
  }

}
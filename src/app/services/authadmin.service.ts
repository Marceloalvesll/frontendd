import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Administrador } from '../models/adminstrador.model';

@Injectable({
  providedIn: 'root'
})
export class AuthadminstradorService {

  private baseURL: string = 'http://localhost:8080/auth/admin';
  private tokenKey = 'jwt_token';
  private AdministradorLogadoKey = 'adminstrador_logado';
  private AdministradorLogadoSubject = new BehaviorSubject<Administrador | null>(null);


  constructor(private handler: HttpBackend,
    private localStorageService: LocalStorageService,
    private jwtHelper: JwtHelperService,
    private http: HttpClient) {


    // this.http = new HttpClient(handler);
    this.initadminstradorLogado();

  }

  // private initadminstradorLogado() {
  //   const adminstrador = localStorage.getItem(this.adminstradorLogadoKey);
  //   if (adminstrador) {
  //     const adminstradorLogado = JSON.parse(adminstrador);
  //     this.setadminstradorLogado(adminstradorLogado);
  //     this.adminstradorLogadoSubject.next(adminstradorLogado);
  //   }
  // }

  private initadminstradorLogado() {
    const adminstrador = this.localStorageService.getItem(this.AdministradorLogadoKey);
    console.log('Inicializando adminstrador logado do localStorage:', adminstrador);
    if (adminstrador) {

      this.setadminstradorLogado(adminstrador);
      this.AdministradorLogadoSubject.next(adminstrador);
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
          const adminstradorLogado = res.body;
          // console.log(adminstradorLogado);
          if (adminstradorLogado) {
            this.setadminstradorLogado(adminstradorLogado);
            this.AdministradorLogadoSubject.next(adminstradorLogado);
          }
        }
      })
    );
  }

  setadminstradorLogado(adminstrador: Administrador): void {
    this.localStorageService.setItem(this.AdministradorLogadoKey, adminstrador);
  }

  setToken(token: string): void {
    this.localStorageService.setItem(this.tokenKey, token);
  }

  getadminstradorLogado() {
     return this.AdministradorLogadoSubject.asObservable();
  }

  // getadminstradorLogado(): Observable<adminstrador | null> {
  //   return this.adminstradorLogadoSubject.asObservable();
  // }

  getToken(): string | null {
    return this.localStorageService.getItem(this.tokenKey);
  }

  removeToken(): void {
    this.localStorageService.removeItem(this.tokenKey);
  }

  removeadminstradorLogado(): void {
    this.localStorageService.removeItem(this.AdministradorLogadoKey);
    this.AdministradorLogadoSubject.next(null);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    // Verifica se o token é nulo ou está expirado
    return !token || this.jwtHelper.isTokenExpired(token);
    // npm install @auth0/angular-jwt
  }

}
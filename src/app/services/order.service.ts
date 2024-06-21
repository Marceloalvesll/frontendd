import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../models/itemcarrinho.model'
import { Observable, map } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { Order } from '../models/order.model';
import { AuthClienteService } from './authcliente.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseURL: string =  'http://localhost:8080/orders';

  constructor(private http: HttpClient, private authService: AuthClienteService) { }

  // save(carrinho: ItemCarrinho[] ): Observable<Order> {
  //   const itens = carrinho.map(item => ({
  //     quantidade: item.quantidade,
  //     preco: item.preco,
  //     idProduct: item.id
  //   }));

  //   const produtos = {
  //     itens: itens
  //   };

  //   return this.http.post<any>(`${this.baseURL}/orders`, produtos);
  // }

  save(carrinho: ItemCarrinho[]): Observable<Order> {
    const itens = carrinho.map(item => ({
      nome: item.nome,
      quantidade: item.quantidade,
      preco: item.preco,
      idProduct: item.id
    }));

    const produtos = {
      itens: itens
    };

    return this.http.post<Order>(`${this.baseURL}`, produtos);
  }

  findAll(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseURL}`);
  }

  getTotalPedidos(): Observable<number> {
    return this.findAll().pipe(map(pedidos => pedidos.length));
  }

  getPedidosPorCliente(idCliente: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseURL}/user/${idCliente}`);
  }

  getPedidoById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseURL}/${id}`);
  }

  // getPedidosPorUsuario(login: string): Observable<Order[]> {
  //   return this.http.get<Order[]>(`${this.baseURL}?login=${login}`);
  // }

  // getPedidosPorUsuario(): Observable<Order[]> {
  //   return this.http.get<Order[]>(`${this.baseURL}`);
  // }

  
}

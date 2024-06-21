// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { LocalStorageService } from './local-storage.service';
// import { ItemCarrinho } from '../models/itemcarrinho.model';


// @Injectable({
//   providedIn: 'root'
// })
// export class CarrinhoService {

//   private carrinhoSubject = new BehaviorSubject<ItemCarrinho[]>([]);
//   carrinho$ = this.carrinhoSubject.asObservable();

//   constructor(private localStorageService: LocalStorageService) {
//     const carrinhoArmazenado = this.localStorageService.getItem('carrinho') || [];
//     this.carrinhoSubject.next(carrinhoArmazenado);
//   }

//   // adicionar(bateriaCompleta: ItemCarrinho): void {
//   //   const carrinhoAtual = this.carrinhoSubject.value;
//   //   const itemExistente = carrinhoAtual.find(item => item.id === bateriaCompleta.id);

//   //   if (itemExistente) {
//   //     itemExistente.quantidade += bateriaCompleta.quantidade || 1;
//   //   } else {
//   //     carrinhoAtual.push({ ...bateriaCompleta });
//   //   }

//   //   this.carrinhoSubject.next(carrinhoAtual);
//   //   this.atualizarArmazenamentoLocal();
//   // }

//   adicionar(item: ItemCarrinho): void {
//     const carrinhoAtual = this.carrinhoSubject.value;
//     const itemExistente = carrinhoAtual.find(i => i.id === item.id);

//     if (itemExistente) {
//       itemExistente.quantidade += item.quantidade || 1;
//     } else {
//       carrinhoAtual.push({ ...item });
//     }

//     this.carrinhoSubject.next(carrinhoAtual);
//     this.atualizarArmazenamentoLocal();
//   }

//   removerTudo(): void {
//     this.localStorageService.removeItem('carrinho');
//     window.location.reload(); // reload na página
//   }

//   remover(item: ItemCarrinho): void {
//     const carrinhoAtual = this.carrinhoSubject.value;
//     const carrinhoAtualizado = carrinhoAtual.filter((i) => i !== item);

//     this.carrinhoSubject.next(carrinhoAtualizado);
//     this.atualizarArmazenamentoLocal();
//   }

//   obter(): ItemCarrinho[] {
//     return this.carrinhoSubject.value;

//   }

//   private atualizarArmazenamentoLocal(): void {
//     localStorage.setItem('carrinho', JSON.stringify(this.carrinhoSubject.value));
//   }
// }

import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject } from 'rxjs';
import { ItemCarrinho } from '../models/itemcarrinho.model';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private carrinhoSubject = new BehaviorSubject<ItemCarrinho[]>([]);
  carrinho$ = this.carrinhoSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const carrinhoArmazenado =
      this.localStorageService.getItem('carrinho') || [];
    this.carrinhoSubject.next(carrinhoArmazenado);
  }

  adicionar(item: ItemCarrinho): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const itemExistente = carrinhoAtual.find((i) => i.id === item.id);

    if (itemExistente) {
      itemExistente.quantidade += item.quantidade || 1;
    } else {
      carrinhoAtual.push({ ...item });
    }

    this.carrinhoSubject.next(carrinhoAtual);
    this.atualizarArmazenamentoLocal();
  }

  remover(item: ItemCarrinho): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const carrinhoAtualizado = carrinhoAtual.filter((i) => i !== item);

    this.carrinhoSubject.next(carrinhoAtualizado);
    this.atualizarArmazenamentoLocal();
  }

  limparCarrinho(): void {
    this.carrinhoSubject.next([]);
    this.localStorageService.removeItem('carrinho');
  }

  private atualizarArmazenamentoLocal(): void {
    this.localStorageService.setItem('carrinho', this.carrinhoSubject.value);
  }

  atualizarItem(item: ItemCarrinho): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const itemIndex = carrinhoAtual.findIndex((i) => i.id === item.id);

    if (itemIndex > -1) {
      carrinhoAtual[itemIndex] = item;
      this.carrinhoSubject.next(carrinhoAtual);
      this.atualizarArmazenamentoLocal();
    }
  }
}
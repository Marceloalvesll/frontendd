// import { Component, OnInit, signal } from '@angular/core';
// import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
// // import { Consulta } from '../../models/consulta.model';
// // import { CarrinhoService } from '../../services/carrinho.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// // import { ConsultaService } from '../../services/consulta.service';
// import { NgFor } from '@angular/common';
// import { MatButton } from '@angular/material/button';
// import { BateriaCompleta } from '../../models/bateriacompleta.model';
// import { BateriaCompletaService } from '../../services/bateriacompleta.service';
// import { CarrinhoService } from '../../services/carrinho.service';
// import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

// // tipo personalizado de dados, como classes e interfaces, porém mais simples.
// type Card = {
//   idBateriaCompleta: number;
//   nomeBateria: string;
//   preco: number;
//   marca: string;
//   categoria: {
//     id: number;
//     nomeCategoria: string;
// };
//   urlImagem: string;
// }

// @Component({
//   selector: 'app-bateriacompleta-card-list',
//   standalone: true,
//   imports: [MatCard, MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, NgFor, MatButton, MatPaginatorModule],
//   templateUrl: './bateriacompleta-card-list.component.html',
//   styleUrl: './bateriacompleta-card-list.component.css'
// })
// export class BateriaCompletaCardListComponent implements OnInit {

//   cards = signal<Card[]> ([]);
//   bateriascompletas: BateriaCompleta[] = [];
//    // variaveis de controle de paginacao
//    totalRecords = 0;
//    pageSize = 2;
//    page = 0;

//   constructor(private bateriaCompletaService: BateriaCompletaService, 
//               private carrinhoService: CarrinhoService,
//               private snackBar: MatSnackBar) {}

//   ngOnInit(): void {
//     this.carregarBateriasCompletas();
//   }

//   carregarBateriasCompletas() {
//     // buscando todos as consultas
//     this.bateriaCompletaService.findAll(this.page, this.pageSize).subscribe(data => {
//       this.bateriascompletas = data;
//       this.carregarCards();

//       this.bateriaCompletaService.count().subscribe(data => {
//         this.totalRecords = data;
//         console.log(this.totalRecords);
//       });
//     });
//   }

//   paginar(event: PageEvent): void {
//     this.page = event.pageIndex;
//     this.pageSize = event.pageSize;
//     this.ngOnInit();
//   }

//   carregarCards() {
//     const cards: Card[] = [];
//     this.bateriascompletas.forEach(bateriaCompleta => {
//       cards.push({
//         idBateriaCompleta: bateriaCompleta.id,
//         nomeBateria: bateriaCompleta.nomeBateria,
//         preco: bateriaCompleta.preco,
//         marca: bateriaCompleta.marca.nomeMarca,
//         categoria: {
//           id: bateriaCompleta.categoria.id,
//           nomeCategoria: bateriaCompleta.categoria.nomeCategoria
//         },
//         urlImagem: this.bateriaCompletaService.getUrlImagem(bateriaCompleta.nomeImagem)
//       });
//     });
//     this.cards.set(cards);
//   }

//   adicionarAoCarrinho(card: Card) {
//     this.showSnackbarTopPosition('Produto adicionado ao carrinho!', 'Fechar');
//     this.carrinhoService.adicionar({
//       id: card.idBateriaCompleta,
//       nome: card.nomeBateria,
//       preco: card.preco,
//       imagemUrl: card.urlImagem,
//       categoria: card.categoria,
//       quantidade: 1,
//     })

//   }

//   showSnackbarTopPosition(content:any, action:any) {
//     this.snackBar.open(content, action, {
//       duration: 2000,
//       verticalPosition: "top", // Allowed values are  'top' | 'bottom'
//       horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
//     });
//   }
// }






import { Component, OnInit, signal } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgFor, CommonModule } from '@angular/common';  // Adicione o CommonModule
import { MatButton } from '@angular/material/button';
import { BateriaCompleta } from '../../models/bateriacompleta.model';
import { BateriaCompletaService } from '../../services/bateriacompleta.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

type Card = {
  idBateriaCompleta: number;
  nomeBateria: string;
  preco: number;
  marca: string;
  categoria: {
    id: number;
    nomeCategoria: string;
  };
  urlImagem: string;
  quantidadeTambor: number;
  descricao: string;
  mostrarDetalhes?: boolean;
}

@Component({
  selector: 'app-bateriacompleta-card-list',
  standalone: true,
  imports: [MatCard, MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, NgFor, MatButton, MatPaginatorModule, CommonModule],  // Adicione o CommonModule aqui
  templateUrl: './bateriacompleta-card-list.component.html',
  styleUrls: ['./bateriacompleta-card-list.component.css']
})
export class BateriaCompletaCardListComponent implements OnInit {

  cards = signal<Card[]>([]);
  bateriascompletas: BateriaCompleta[] = [];
  totalRecords = 0;
  pageSize = 8;
  page = 0;

  constructor(private bateriaCompletaService: BateriaCompletaService, 
              private carrinhoService: CarrinhoService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.carregarBateriasCompletas();
  }

  carregarBateriasCompletas() {
    this.bateriaCompletaService.findAll(this.page, this.pageSize).subscribe(data => {
      this.bateriascompletas = data;
      this.carregarCards();

      this.bateriaCompletaService.count().subscribe(data => {
        this.totalRecords = data;
        console.log(this.totalRecords);
      });
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  carregarCards() {
    const cards: Card[] = [];
    this.bateriascompletas.forEach(bateriaCompleta => {
      cards.push({
        idBateriaCompleta: bateriaCompleta.id,
        nomeBateria: bateriaCompleta.nomeBateria,
        preco: bateriaCompleta.preco,
        marca: bateriaCompleta.marca.nomeMarca,
        categoria: {
          id: bateriaCompleta.categoria.id,
          nomeCategoria: bateriaCompleta.categoria.nomeCategoria
        },
        urlImagem: this.bateriaCompletaService.getUrlImagem(bateriaCompleta.nomeImagem),
        quantidadeTambor: bateriaCompleta.quantidadeTambor,
        descricao: bateriaCompleta.descricao,
        mostrarDetalhes: false
      });
    });
    this.cards.set(cards);
  }

  adicionarAoCarrinho(card: Card) {
    this.showSnackbarTopPosition('Produto adicionado ao carrinho!', 'Fechar');
    this.carrinhoService.adicionar({
      id: card.idBateriaCompleta,
      nome: card.nomeBateria,
      preco: card.preco,
      imagemUrl: card.urlImagem,
      categoria: card.categoria,
      quantidade: 1,
    });
  }

  showSnackbarTopPosition(content: any, action: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }

  toggleDetalhes(id: number) {
    const cards = this.cards();
    const card = cards.find(card => card.idBateriaCompleta === id);
    if (card) {
      card.mostrarDetalhes = !card.mostrarDetalhes;
      this.cards.set(cards);
    }
  }
}
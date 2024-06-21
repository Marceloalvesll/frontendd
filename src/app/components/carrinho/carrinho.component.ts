import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemCarrinho } from '../../models/itemcarrinho.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { Router } from '@angular/router';
import { AuthClienteService } from '../../services/authcliente.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { ClienteService  } from "./../../services/cliente.service";
import { Endereco } from '../../models/endereco.model';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [NgFor,
    NgIf,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormField,
    MatLabel,
    FormsModule,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveFormsModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {
  carrinhoItens: ItemCarrinho[] = [];
  clienteLogado: boolean = false;
  showLoginPanel: boolean = false;
  enderecos: Endereco[] = []
  form = this.fb.group({
    idEndereco: [-1, [Validators.required]],
  })

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router,
    private authClienteService: AuthClienteService,
    private clienteService: ClienteService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.authClienteService.getClienteLogado().subscribe((cliente) => {
      this.clienteLogado = !!cliente;
    });

    this.carrinhoService.carrinho$.subscribe(itens => {
      this.carrinhoItens = itens;
    });

    this.clienteService.getEnderecos().subscribe(enderecos => {
          this.enderecos = enderecos;
          this.form.controls.idEndereco.setValue(enderecos.at(-1)?.id || null)
        });
   
  }  


  // // ngOnInit() {
  //   this.usuarioService.getEnderecos().subscribe(enderecos => {
  //     this.enderecos = enderecos;
  //     this.form.controls.idEndereco.setValue(enderecos.at(-1)?.id || null)
  // //   });


  removerItem(item: ItemCarrinho): void {
    this.carrinhoService.remover(item);
  }


  aumentarQuantidade(item: ItemCarrinho): void {
    item.quantidade += 1;
    this.carrinhoService.atualizarItem(item);
  }

  diminuirQuantidade(item: ItemCarrinho): void {
    if (item.quantidade > 1) {
      item.quantidade -= 1;
      this.carrinhoService.atualizarItem(item);
    }
  }

  toggleLoginPanel(): void {
    this.showLoginPanel = !this.showLoginPanel;
  }

  finalizarCompra(): void {
    this.router.navigate(['/checkout']);
  }

  continuarComprando(): void {
    this.router.navigate(['/produtos']);
  }

  irParaCheckout() {
    this.router.navigate(['/checkout']);
  }

  irParaLogin(): void {
    this.router.navigate(['/login']);
  }

  calcularTotal(): number {
    return this.carrinhoItens.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  }



}
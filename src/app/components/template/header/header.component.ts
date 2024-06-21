import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatBadge } from '@angular/material/badge';

import { LocalStorageService } from '../../../services/local-storage.service';

import { CarrinhoService } from '../../../services/carrinho.service';
import { Subscription } from 'rxjs';
import { MatButton, MatIconButton } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../../services/sidebar.service';
import { Cliente } from '../../../models/cliente.model';
import { AuthClienteService } from '../../../services/authcliente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar, MatIcon, MatBadge, MatButton, MatIconButton, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  clienteLogado: Cliente | null = null;
  private subscription = new Subscription();

  qtdItensCarrinho: number = 0;
  @Input() tipo: number = 0;

  constructor(private sidebarService: SidebarService,
    private carrinhoService: CarrinhoService,
    private authClienteService: AuthClienteService,
    private localStorageService: LocalStorageService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.obterQtdItensCarrinho();
    this.obterClienteLogado();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clickMenu() {
    this.sidebarService.toggle();
  }

  obterQtdItensCarrinho() {
    this.carrinhoService.carrinho$.subscribe(itens => {
      this.qtdItensCarrinho = itens.length
    });
  }

  obterClienteLogado() {
    this.subscription.add(
      this.authClienteService.getClienteLogado().subscribe((cliente) =>
        (this.clienteLogado = cliente))
    );
  }

  editarDados(): void {
    if (this.clienteLogado && this.clienteLogado.login) {
      this.authClienteService.getClienteLogado().subscribe((cliente) => {
        if (cliente && cliente.id) {
          this.router.navigate(['/clientes/edit', cliente.id]);
        }
      });
    }
  }

  deslogar() {
    this.authClienteService.removeToken()
    this.authClienteService.removeClienteLogado();
    this.router.navigateByUrl('/produtos');
  }

  navigateToPerfil(): void {
    this.router.navigate(['/perfil']);
}


navigateToHome(): void {
  this.router.navigate(['/home']);
}

}

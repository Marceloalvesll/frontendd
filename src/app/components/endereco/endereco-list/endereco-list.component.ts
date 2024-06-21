import { EnderecoService } from './../../../services/endereco.service';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Endereco } from '../../../models/endereco.model';

@Component({
  selector: 'app-endereco-list',
  standalone: true,
  imports: [
    NgFor,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './endereco-list.component.html',
  styleUrl: './endereco-list.component.css',
})
export class EnderecoListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'rua',
    'numero',
    'cidade',
    'estado',
    'cep',
    'acao',
  ];
  enderecos: Endereco[] = [];
  isMenuOpen = false; // Adicionado para controlar a visibilidade do menu

  idCliente: String;

  constructor(
    private enderecoService: EnderecoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.idCliente = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    // this.enderecoService.findByIdCliente(this.idCliente).subscribe((data) => {
    //   this.enderecos = data;

      this.enderecoService.findAll().subscribe(data => {
        this.enderecos = data;
    });
  }

  excluirEndereco(endereco: Endereco) {
    this.enderecoService.delete(endereco).subscribe({
      next: () => {
        this.router.navigateByUrl('/enderecos/cliente/' + this.idCliente);
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Erro ao Excluir' + JSON.stringify(err));
      },
    });
  }
  toggleSidebar(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

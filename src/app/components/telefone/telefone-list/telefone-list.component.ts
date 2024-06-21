import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { TelefoneService } from '../../../services/telefone.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Telefone } from '../../../models/telefone.model';

@Component({
  selector: 'app-telefone-list',
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
  templateUrl: './telefone-list.component.html',
  styleUrl: './telefone-list.component.css',
})
export class TelefoneListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'codigoArea', 'numero', 'acao'];
  telefones: Telefone[] = [];
  isMenuOpen = false; // Adicionado para controlar a visibilidade do menu

  idCliente: String;

  constructor(
    private telefoneService: TelefoneService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.idCliente = this.activatedRoute.snapshot.params['id'];
  }

  // é  necessario mostrar o id do cliente quando vamos  mostrar os  telefones
  // ngOnInit(): void {
  //   this.telefoneService.findByIdCliente(this.idCliente).subscribe((data) => {
  //     this.telefones = data;
  //   });
  // }

  ngOnInit(): void {
    this.telefoneService.findAll().subscribe((data) => {
      this.telefones = data;
    });
  }

  excluirTelefone(telefone: Telefone) {
    this.telefoneService.delete(telefone).subscribe({
      next: () => {
        this.router.navigateByUrl('/telefones/cliente/' + this.idCliente);
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

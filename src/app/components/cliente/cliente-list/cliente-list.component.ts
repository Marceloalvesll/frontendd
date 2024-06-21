import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    MatPaginatorModule,

    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
})
export class ClienteListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome','login','cpf','acao'];
  clientes: Cliente[] = [];
  isMenuOpen = false;

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.clienteService.findAll().subscribe((data) => {
      this.clientes = data;
    });
  }

  excluirCliente(cliente: Cliente) {
    this.clienteService.delete(cliente).subscribe({
      next: () => {
        this.router.navigateByUrl('/clientes');
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

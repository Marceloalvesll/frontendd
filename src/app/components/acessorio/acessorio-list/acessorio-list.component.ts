import { Component, OnInit } from '@angular/core';

import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Acessorio } from '../../../models/acessorio.model';
import { AcessorioService } from '../../../services/acessorio.service';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-acessorio-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule, MatMenuModule],
  templateUrl: './acessorio-list.component.html',
  styleUrl: './acessorio-list.component.css'
})

export class AcessorioListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nomeAcessorio', 'descricao', 'preco', 'quantidadeEstoque', 'marca', 'categoria', 'nomeImagem', 'acao'];
  acessorios: Acessorio[] = [];

  constructor(private acessorioService: AcessorioService) {

  }

  ngOnInit(): void {
    this.acessorioService.findAll().subscribe(data => {
      this.acessorios = data;
    })
  }

}
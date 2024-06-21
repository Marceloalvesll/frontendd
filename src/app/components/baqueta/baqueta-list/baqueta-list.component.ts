import { Component, OnInit } from '@angular/core';

import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Baqueta } from '../../../models/baqueta.model';
import { BaquetaService } from '../../../services/baqueta.service';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-baqueta-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule, MatMenuModule],
  templateUrl: './baqueta-list.component.html',
  styleUrl: './baqueta-list.component.css'
})

export class BaquetaListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nomeBaqueta', 'descricao', 'preco', 'quantidadeEstoque', 'marca', 'categoria', 'nomeImagem', 'acao'];
  baquetas: Baqueta[] = [];

  constructor(private baquetaService: BaquetaService) {

  }

  ngOnInit(): void {
    this.baquetaService.findAll().subscribe(data => {
      this.baquetas = data;
    })
  }

}
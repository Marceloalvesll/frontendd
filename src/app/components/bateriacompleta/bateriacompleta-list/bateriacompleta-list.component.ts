import { Component, OnInit } from '@angular/core';

import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BateriaCompleta } from '../../../models/bateriacompleta.model';
import { BateriaCompletaService } from '../../../services/bateriacompleta.service';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-bateriacompleta-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule, MatMenuModule],
  templateUrl: './bateriacompleta-list.component.html',
  styleUrl: './bateriacompleta-list.component.css'
})

export class BateriaCompletaListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nomeBateria', 'quantidadeTambor', 'descricao', 'preco', 'quantidadeEstoque', 'marca', 'categoria', 'nomeImagem', 'acao'];
  bateriasCompleta: BateriaCompleta[] = [];

  constructor(private bateriaCompletaService: BateriaCompletaService) {

  }

  ngOnInit(): void {
    this.bateriaCompletaService.findAll().subscribe(data => {
      this.bateriasCompleta = data;
      
    })
  }

}
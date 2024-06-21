import { Component, OnInit } from '@angular/core';

import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TamborAvulso } from '../../../models/tamboravulso.model';
import { TamborAvulsoService } from '../../../services/tamboravulso.service';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-tamboravulso-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule, MatMenuModule],
  templateUrl: './tamboravulso-list.component.html',
  styleUrl: './tamboravulso-list.component.css'
})

export class TamborAvulsoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nomeTambor', 'descricao', 'preco', 'quantidadeEstoque', 'marca', 'categoria', 'nomeImagem', 'acao'];
  tamboresAvulso: TamborAvulso[] = [];


  constructor(private tamborAvulsoService: TamborAvulsoService) {

  }

  ngOnInit(): void {
    this.tamborAvulsoService.findAll().subscribe(data => {
      this.tamboresAvulso = data;
    })
  }
  

}
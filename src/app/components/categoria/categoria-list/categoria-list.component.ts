import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule, MatMenuModule],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css'
})



export class CategoriaListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nomeCategoria', 'acao'];
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {

  }

  ngOnInit(): void {
    this.categoriaService.findAll().subscribe(data => {
      this.categorias = data;
    })
  }
  }
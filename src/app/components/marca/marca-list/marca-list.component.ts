import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Marca } from '../../../models/marca.model';
import { MarcaService } from '../../../services/marca.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';


@Component({
  selector: 'app-marca-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule, MatMenuModule],
  templateUrl: './marca-list.component.html',
  styleUrl: './marca-list.component.css'
})



export class MarcaListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nomeMarca', 'paisOrigem', 'acao'];
  marcas: Marca[] = [];

  constructor(private marcaService: MarcaService) {

  }

  ngOnInit(): void {
    this.marcaService.findAll().subscribe(data => {
      this.marcas = data;
    })
  }
  }
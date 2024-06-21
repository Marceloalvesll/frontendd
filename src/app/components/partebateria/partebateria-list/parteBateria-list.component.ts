import { Component, OnInit } from '@angular/core';
import { ParteBateria } from '../../../models/partebateria.model';
import { ParteBateriaService } from '../../../services/partebateria.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-parteBateria-list',
  standalone: true,
  imports: [NgFor, MatTableModule],
  templateUrl: './parteBateria-list.component.html',
  styleUrl: './parteBateria-list.component.css'
})

export class ParteBateriaListComponent implements OnInit {
    
    displayedColumns: string[] = ['id', 'nome', 'marca','estoque' , 'preco'];
    partesBateria: ParteBateria[] = [];

  
    constructor(private parteBateriaService: ParteBateriaService) {
  
    }
  
    ngOnInit(): void {
      this.parteBateriaService.findAll().subscribe(data => {
        this.partesBateria = data;
      })
    }

}
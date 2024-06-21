import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ParteBateriaService } from '../../../services/partebateria.service';


@Component({
  selector: 'app-parteBateria-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './parteBateria-form.component.html',
  styleUrl: './parteBateria-form.component.css'
})
export class ParteBateriaFormComponent {
  
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private ParteBateriaService: ParteBateriaService,
              private router: Router) {

    this.formGroup = formBuilder.group({
      nome: ['', Validators.required],
      // marca: ['', Validators.required],
      // quantidadeEstoque: ['', Validators.required],
      // preco: ['', Validators.required]
     
    });

  }

  onSubmit() {
    if (this.formGroup.valid) {
      const novaParte = this.formGroup.value;
      this.ParteBateriaService.insert(novaParte).subscribe({
        next: (parteCadastrada) => {
          this.router.navigateByUrl('/produto');
        },
        error: (err) => {
          console.log('Erro ao salvar' + JSON.stringify(err));
        }
      });
    }
  }

}
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { CategoriaService } from '../../../services/categoria.service';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Categoria } from '../../../models/categoria.model';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              
                private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const categoria: Categoria = activatedRoute.snapshot.data['categoria'];

    this.formGroup = formBuilder.group({
      id: [(categoria && categoria.id) ? categoria.id : null],
      nomeCategoria: [(categoria && categoria.nomeCategoria) ? categoria.nomeCategoria : '', Validators.required]
    });

  }

  salvar() {
    if (this.formGroup.valid) {
      const categoria = this.formGroup.value;
      if (categoria.id ==null) {
        this.categoriaService.insert(categoria).subscribe({
          next: (categoriaCadastrado) => {
            this.router.navigateByUrl('/categorias');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.categoriaService.update(categoria).subscribe({
          next: (categoriaAlterada) => {
            this.router.navigateByUrl('/categorias');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    }
  }
  excluir() {
    if (this.formGroup.valid) {
      const categoria = this.formGroup.value;
      if (categoria.id != null) {
        this.categoriaService.delete(categoria).subscribe({
          next: () => {
            this.router.navigateByUrl('/categorias');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
}

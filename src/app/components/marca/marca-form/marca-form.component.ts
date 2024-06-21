import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MarcaService } from '../../../services/marca.service';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Marca } from '../../../models/marca.model';

@Component({
  selector: 'app-marca-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
  templateUrl: './marca-form.component.html',
  styleUrl: './marca-form.component.css'
})
export class MarcaFormComponent {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              
                private marcaService: MarcaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const marca: Marca = activatedRoute.snapshot.data['marca'];

    this.formGroup = formBuilder.group({
      id: [(marca && marca.id) ? marca.id : null],
      nomeMarca: [(marca && marca.nomeMarca) ? marca.nomeMarca : '', Validators.required],
      paisOrigem: [(marca && marca.paisOrigem) ? marca.paisOrigem : '', Validators.required]
    });

  }

  salvar() {
    if (this.formGroup.valid) {
      const marca = this.formGroup.value;
      if (marca.id ==null) {
        this.marcaService.insertMarca(marca).subscribe({
          next: (marcaCadastrado) => {
            this.router.navigateByUrl('/admin/marcas');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.marcaService.updateMarca(marca).subscribe({
          next: (marcaAlterada) => {
            this.router.navigateByUrl('/admin/marcas');
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
      const marca = this.formGroup.value;
      if (marca.id != null) {
        this.marcaService.delete(marca).subscribe({
          next: () => {
            this.router.navigateByUrl('/admin/marcas');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
}

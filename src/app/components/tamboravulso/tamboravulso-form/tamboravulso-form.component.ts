import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Marca } from '../../../models/marca.model';
import { TamborAvulsoService } from '../../../services/tamboravulso.service';
import { MarcaService } from '../../../services/marca.service';
import { TamborAvulso } from '../../../models/tamboravulso.model';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';



@Component({
  selector: 'app-tamboravulso-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './tamboravulso-form.component.html',
  styleUrl: './tamboravulso-form.component.css'
})
export class TamborAvulsoFormComponent implements OnInit {

  formGroup: FormGroup;
  marcas: Marca[] = [];
  categorias: Categoria[] = [];

  constructor(private formBuilder: FormBuilder,
    private tamborAvulsoService: TamborAvulsoService,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: [null],
      nomeTambor: ['', Validators.required],
      quantidadeTambor: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: ['', Validators.required],
      quantidadeEstoque: ['', Validators.required],
      nomeImagem: ['', Validators.required],
      marca: [null],
      categoria: [null]
    });
  }
  ngOnInit(): void {
    this.marcaService.findAll().subscribe(marcas => {
      this.marcas = marcas;
    });

    this.categoriaService.findAll().subscribe(categorias => {
        this.categorias = categorias;

        this.initializeForm();
      });
  }

  initializeForm() {

    const tamborAvulso: TamborAvulso = this.activatedRoute.snapshot.data['tamborAvulso'];
    console.log(tamborAvulso)
    // selecionando a marca
    const marca = this.marcas
      .find(marca => marca.id === (tamborAvulso?.marca?.id || null)); 

      const categoria = this.categorias
      .find(categoria => categoria.id === (tamborAvulso?.categoria?.id || null)); 

      this.formGroup = this.formBuilder.group({
        id: [(tamborAvulso && tamborAvulso.id) ? tamborAvulso.id : null],
        nomeTambor: [(tamborAvulso && tamborAvulso.nomeTambor) ? tamborAvulso.nomeTambor : '', Validators.required],
        descricao: [(tamborAvulso && tamborAvulso.descricao) ? tamborAvulso.descricao : '', Validators.required],
        preco: [(tamborAvulso && tamborAvulso.preco) ? tamborAvulso.preco : '', Validators.required],
        quantidadeEstoque: [(tamborAvulso && tamborAvulso.quantidadeEstoque) ? tamborAvulso.quantidadeEstoque : '', Validators.required],
        nomeImagem: [(tamborAvulso && tamborAvulso.nomeImagem) ? tamborAvulso.nomeImagem : '', Validators.required],
        marca: [marca],
        categoria: [categoria]
      });
  }

  salvar() {
    if (this.formGroup.valid) {
      const tamborAvulso = this.formGroup.value;
      console.log(tamborAvulso)
      if (tamborAvulso.id ==null) {
        console.log('Marca selecionada:', this.formGroup.value.marca);
        console.log('Categoria selecionada:', this.formGroup.value.categoria);

        this.tamborAvulsoService.insert(tamborAvulso).subscribe({
          next: (tamborAvulsoCadastrado) => {
            this.router.navigateByUrl('/tamboresAvulso');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {  
        this.tamborAvulsoService.update(tamborAvulso).subscribe({
          next: (tamborAvulsoAlterado) => {
            this.router.navigateByUrl('/tamboresAvulso');
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
      const tamborAvulso = this.formGroup.value;
      if (tamborAvulso.id != null) {
        this.tamborAvulsoService.delete(tamborAvulso).subscribe({
          next: () => {
            this.router.navigateByUrl('/tamboresAvulso');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

}
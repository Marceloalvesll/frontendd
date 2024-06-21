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
import { MarcaService } from '../../../services/marca.service';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
import { AcessorioService } from '../../../services/acessorio.service';
import { Acessorio } from '../../../models/acessorio.model';


@Component({
  selector: 'app-acessorio-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatSelectModule],
  templateUrl: './acessorio-form.component.html',
  styleUrl: './acessorio-form.component.css'
})
export class AcessorioFormComponent implements OnInit {

  formGroup: FormGroup;
  marcas: Marca[] = [];
  categorias: Categoria[] = [];

  constructor(private formBuilder: FormBuilder,
    private acessorioService: AcessorioService,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: [null],
      nomeAcessorio: ['', Validators.required],
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

    const acessorio: Acessorio = this.activatedRoute.snapshot.data['acessorio'];

    // selecionando a marca
    const marca = this.marcas
      .find(marca => marca.id === (acessorio?.marca?.id || null));

    const categoria = this.categorias
      .find(categoria => categoria.id === (acessorio?.categoria?.id || null));

    this.formGroup = this.formBuilder.group({
      id: [(acessorio && acessorio.id) ? acessorio.id : null],
      nomeAcessorio: [(acessorio && acessorio.nomeAcessorio) ? acessorio.nomeAcessorio : '', Validators.required],
      descricao: [(acessorio && acessorio.descricao) ? acessorio.descricao : '', Validators.required],
      preco: [(acessorio && acessorio.preco) ? acessorio.preco : '', Validators.required],
      quantidadeEstoque: [(acessorio && acessorio.quantidadeEstoque) ? acessorio.quantidadeEstoque : '', Validators.required],
      nomeImagem: [(acessorio && acessorio.nomeImagem) ? acessorio.nomeImagem : '', Validators.required],
      marca: [marca],
      categoria: [categoria]
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const acessorio = this.formGroup.value;
      if (acessorio.id == null) {
        console.log('Marca selecionada:', this.formGroup.value.marca);
        console.log('Categoria selecionada:', this.formGroup.value.categoria);
        this.acessorioService.insert(acessorio).subscribe({
          next: (acessorioCadastrado) => {
            this.router.navigateByUrl('/acessorios');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.acessorioService.update(acessorio).subscribe({
          next: (acessorioAlterado) => {
            this.router.navigateByUrl('/acessorios');
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
      const acessorio = this.formGroup.value;
      if (acessorio.id != null) {
        this.acessorioService.delete(acessorio).subscribe({
          next: () => {
            this.router.navigateByUrl('/acessorios');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

}
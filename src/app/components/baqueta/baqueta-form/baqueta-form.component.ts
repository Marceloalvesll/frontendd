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
import { BaquetaService } from '../../../services/baqueta.service';
import { Baqueta } from '../../../models/baqueta.model';



@Component({
  selector: 'app-baqueta-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './baqueta-form.component.html',
  styleUrl: './baqueta-form.component.css'
})
export class BaquetaFormComponent implements OnInit {

  formGroup: FormGroup;
  marcas: Marca[] = [];
  categorias: Categoria[] = [];

  constructor(private formBuilder: FormBuilder,
    private baquetaService: BaquetaService,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: [null],
      nomeBaqueta: ['', Validators.required],
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

    const baqueta: Baqueta = this.activatedRoute.snapshot.data['baqueta'];
    console.log(baqueta)
    // selecionando a marca
    const marca = this.marcas
      .find(marca => marca.id === (baqueta?.marca?.id || null)); 

      const categoria = this.categorias
      .find(categoria => categoria.id === (baqueta?.categoria?.id || null)); 

      this.formGroup = this.formBuilder.group({
        id: [(baqueta && baqueta.id) ? baqueta.id : null],
        nomeBaqueta: [(baqueta && baqueta.nomeBaqueta) ? baqueta.nomeBaqueta : '', Validators.required],
        descricao: [(baqueta && baqueta.descricao) ? baqueta.descricao : '', Validators.required],
        preco: [(baqueta && baqueta.preco) ? baqueta.preco : '', Validators.required],
        quantidadeEstoque: [(baqueta && baqueta.quantidadeEstoque) ? baqueta.quantidadeEstoque : '', Validators.required],
        nomeImagem: [(baqueta && baqueta.nomeImagem) ? baqueta.nomeImagem : '', Validators.required],
        marca: [marca],
        categoria: [categoria]
      });
  }

  salvar() {
    if (this.formGroup.valid) {
      const baqueta = this.formGroup.value;
      console.log(baqueta)
      if (baqueta.id ==null) {
        console.log('Marca selecionada:', this.formGroup.value.marca);
        console.log('Categoria selecionada:', this.formGroup.value.categoria);

        this.baquetaService.insert(baqueta).subscribe({
          next: (baquetaCadastrada) => {
            this.router.navigateByUrl('/baquetas');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {  
        this.baquetaService.update(baqueta).subscribe({
          next: (baquetaAlterada) => {
            this.router.navigateByUrl('/baquetas');
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
      const baqueta = this.formGroup.value;
      if (baqueta.id != null) {
        this.baquetaService.delete(baqueta).subscribe({
          next: () => {
            this.router.navigateByUrl('/baquetas');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

}
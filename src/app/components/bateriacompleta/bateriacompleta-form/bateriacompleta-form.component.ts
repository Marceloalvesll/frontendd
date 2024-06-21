import { Location, NgIf } from '@angular/common';
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
import { BateriaCompletaService } from '../../../services/bateriacompleta.service';
import { MarcaService } from '../../../services/marca.service';
import { BateriaCompleta } from '../../../models/bateriacompleta.model';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-bateriacompleta-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule, MatIconModule],
  templateUrl: './bateriacompleta-form.component.html',
  styleUrl: './bateriacompleta-form.component.css'
})
export class BateriaCompletaFormComponent implements OnInit {

  formGroup: FormGroup;
  apiResponse: any = null;

  fileName: string = '';
  selectedFile: File | null = null; 
  imagePreview: string | ArrayBuffer | null = null;

  marcas: Marca[] = [];
  categorias: Categoria[] = [];

  constructor(private formBuilder: FormBuilder,
    private bateriaCompletaService: BateriaCompletaService,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {

    this.formGroup = formBuilder.group({
      id: [null],
      nomeBateria: ['', Validators.required],
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
  
  voltarPagina() {
    this.location.back();
  }

  initializeForm() {

    const bateriaCompleta: BateriaCompleta = this.activatedRoute.snapshot.data['bateriaCompleta'];
    console.log(bateriaCompleta)
    // selecionando a marca
    const marca = this.marcas
      .find(marca => marca.id === (bateriaCompleta?.marca?.id || null)); 

      const categoria = this.categorias
      .find(categoria => categoria.id === (bateriaCompleta?.categoria?.id || null)); 

      this.formGroup = this.formBuilder.group({
        id: [(bateriaCompleta && bateriaCompleta.id) ? bateriaCompleta.id : null],
        nomeBateria: [(bateriaCompleta && bateriaCompleta.nomeBateria) ? bateriaCompleta.nomeBateria : '', Validators.required],
        quantidadeTambor: [(bateriaCompleta && bateriaCompleta.quantidadeTambor) ? bateriaCompleta.quantidadeTambor : '', Validators.required],
        descricao: [(bateriaCompleta && bateriaCompleta.descricao) ? bateriaCompleta.descricao : '', Validators.required],
        preco: [(bateriaCompleta && bateriaCompleta.preco) ? bateriaCompleta.preco : '', Validators.required],
        quantidadeEstoque: [(bateriaCompleta && bateriaCompleta.quantidadeEstoque) ? bateriaCompleta.quantidadeEstoque : '', Validators.required],
        nomeImagem: [(bateriaCompleta && bateriaCompleta.nomeImagem) ? bateriaCompleta.nomeImagem : '', Validators.required],
        marca: [marca],
        categoria: [categoria]
      });
  }

  salvar() {
    if (this.formGroup.valid) {
      const bateriaCompleta = this.formGroup.value;
      console.log(bateriaCompleta)
      if (bateriaCompleta.id ==null) {
        console.log('Marca selecionada:', this.formGroup.value.marca);
        console.log('Categoria selecionada:', this.formGroup.value.categoria);

        this.bateriaCompletaService.insert(bateriaCompleta).subscribe({
          next: (bateriaCompletaCadastrada) => {
            this.uploadImage(bateriaCompletaCadastrada.id);
          //  this.router.navigateByUrl('/admin/bateriasCompleta');
          },
          error: (err) => {
            // Processar erros da API
            this.apiResponse = err.error; 

            // Associar erros aos campos do formulário
            // this.formGroup.get('nomeBateria')?.setErrors({ apiError: this.getErrorMessage('nomeBateria') });
            // this.formGroup.get('quantidadeTambor')?.setErrors({ apiError: this.getErrorMessage('quantidadeTambor') });
            // this.formGroup.get('descricao')?.setErrors({ apiError: this.getErrorMessage('descricao') });
            // this.formGroup.get('preco')?.setErrors({ apiError: this.getErrorMessage('preco') });
            // this.formGroup.get('quantidadeEstoque')?.setErrors({ apiError: this.getErrorMessage('quantidadeEstoque') });

            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {  
        this.bateriaCompletaService.update(bateriaCompleta).subscribe({
          next: (bateriaCompletaAlterada) => {
            this.uploadImage(bateriaCompletaAlterada.id);
            // this.router.navigateByUrl('/admin/bateriasCompleta');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  getErrorMessage(fieldName: string): string {
    const error = this.apiResponse.errors.find((error: any) => error.fieldName === fieldName);
    return error ? error.message : '';
  }

  excluir() {
    if (this.formGroup.valid) {
      const bateriaCompleta = this.formGroup.value;
      if (bateriaCompleta.id != null) {
        this.bateriaCompletaService.delete(bateriaCompleta).subscribe({
          next: () => {
            this.router.navigateByUrl('/admin/bateriasCompleta');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  carregarImagemSelecionada(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
      // carregando image preview
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }

  }

  private uploadImage(bateriaCompletaId: number) {
    if (this.selectedFile) {
      this.bateriaCompletaService.uploadImagem(bateriaCompletaId, this.selectedFile.name, this.selectedFile)
      .subscribe({
        next: () => {
          this.voltarPagina();
        },
        error: err => {
          console.log('Erro ao fazer o upload da imagem');
          // tratar o erro
        }
      })
    } else {
      this.voltarPagina();
    }
  }

}


import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { TelefoneService } from '../../../services/telefone.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { dddValidator, telefoneValidator } from '../../utils/validators';

@Component({
  selector: 'app-telefone-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatIcon

  ],
  templateUrl: './telefone-form.component.html',
  styleUrls: ['./telefone-form.component.css'],
})
export class TelefoneFormComponent implements OnInit {
  formGroup: FormGroup;
  isMenuOpen = false;
  idCliente: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private telefoneService: TelefoneService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.formGroup = this.formBuilder.group({
      codigoArea: ['', [Validators.required, dddValidator()]],
    numero: ['', [Validators.required, telefoneValidator()]],
    });
  }

  ngOnInit(): void {
    this.idCliente = this.activatedRoute.snapshot.paramMap.get('idCliente');
  }



  salvarTelefone() {
    if (this.formGroup.valid && this.idCliente !== null) {
      const telefone = { ...this.formGroup.value, idCliente: +this.idCliente };
      this.telefoneService.insert(telefone, this.idCliente).subscribe({
        next: (telefoneCadastrado) => {
          this.router.navigateByUrl('/perfil');
          this.snackBar.open('Telefone adicionado com sucesso!', 'Fechar', { duration: 3000 });
        },
        error: (err) => {
          console.log('Erro ao Incluir' + JSON.stringify(err));
        },
      });
    }
  }


  excluirTelefone() {
    if (this.formGroup.valid) {
      const telefone = this.formGroup.value;
      if (telefone.id != null) {
        this.telefoneService.delete(telefone.id).subscribe({
          next: () => {
            this.router.navigateByUrl('/perfil');
            this.snackBar.open('Telefone excluido com sucesso!', 'Fechar', { duration: 3000 });
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          },
        });
      }
    }
  }

  toggleSidebar(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

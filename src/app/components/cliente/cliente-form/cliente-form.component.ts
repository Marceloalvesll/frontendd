import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    const cliente: Cliente = this.activatedRoute.snapshot.data['cliente'];

    this.formGroup = this.formBuilder.group({
      id: [cliente && cliente.id ? cliente.id : null],
      nome: [cliente && cliente.nome ? cliente.nome : '', Validators.required],
      login: [
        cliente && cliente.login ? cliente.login : '',
        Validators.required,
      ],
      senha: [
        cliente && cliente.senha ? cliente.senha : '',
        Validators.required,
      ],
      cpf: [cliente && cliente.cpf ? cliente.cpf : '', Validators.required],
    });
  }



  salvarCliente() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {
      const cliente = this.formGroup.value;
      if (cliente.id == null) {
        this.clienteService.insert(cliente).subscribe({
          next: (ClienteCadastrado) => {
            this.router.navigateByUrl('/home');
            this.snackBar.open('Cliente cadastrado com sucesso!', 'Fechar', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
            this.tratarErros(err);
          },
        });
      } else {
        this.clienteService.update(cliente).subscribe({
          next: (clienteAlterado) => {
            this.router.navigateByUrl('/home');
            this.snackBar.open('Cliente atualizado com sucesso!', 'Fechar', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
            this.tratarErros(err);
          },
        });
      }
    }
  }

  excluirCliente() {
    if (this.formGroup.valid) {
      const cliente = this.formGroup.value;
      if (cliente.id != null) {
        this.clienteService.delete(cliente).subscribe({
          next: () => {
            this.router.navigateByUrl('/clientes');
            this.snackBar.open('Usuário excluído com sucesso!', 'Fechar', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          },
        });
      }
    }
  }

  tratarErros(error: HttpErrorResponse) {
    if (error.status === 400) {
      // erros relacionados a campos
      if (error.error?.errors) {
        error.error.errors.forEach((validationError: any) => {
          // obs: o fieldName tem o mesmo valor da api
          const formControl = this.formGroup.get(validationError.fieldName);
          console.log(validationError);
          if (formControl) {
            console.log(formControl);
            formControl.setErrors({ apiError: validationError.message });
          }
        });
      }
    } else if (error.status < 400) {
      // Erro genérico não relacionado a um campo específico.
      this.snackBar.open(
        error.error?.message || 'Erro genérico no envio do formulário.',
        'Fechar',
        {
          duration: 3000,
        }
      );
    } else if (error.status >= 500) {
      this.snackBar.open(
        'Erro interno do servidor. Por favor, tente novamente mais tarde.',
        'Fechar',
        {
          duration: 3000,
        }
      );
    }
  }

  errorMessages: { [controlName: string]: { [errorName: string]: string } } = {
    nome: {
      required: 'O nome deve ser informado.',
    },
    login: {
      required: 'O login deve ser informado.',
    },
    senha: {
      required: 'A senha deve ser informada.',
    },
    cpf: {
      required: 'O CPF deve ser informado.',
    },
    perfil: {
      required: 'O perfil deve ser informado.',
    },
  };

  getErrorMessage(
    controlName: string,
    errors: ValidationErrors | null | undefined
  ): string {
    if (!errors) {
      return '';
    }
    // retorna a mensagem de erro
    for (const errorName in errors) {
      if (
        errors.hasOwnProperty(errorName) &&
        this.errorMessages[controlName][errorName]
      ) {
        return this.errorMessages[controlName][errorName];
      }
    }

    return 'Login já existe , coloque outro.)';
  }
}

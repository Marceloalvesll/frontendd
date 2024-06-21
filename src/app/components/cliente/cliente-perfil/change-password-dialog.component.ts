import { Component } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatDialogRef} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {ClienteService} from "../../../services/cliente.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-change-password',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.css'
})
export class ChangePasswordDialogComponent {
  form = this.fb.group({
    antigaSenha: ["", [Validators.required, Validators.minLength(8)]],
    novaSenha: ["", [Validators.required, Validators.minLength(8)]],
  })
  constructor(protected dialogRef: MatDialogRef<ChangePasswordDialogComponent>, private service: ClienteService, private fb: FormBuilder, private snackBar: MatSnackBar) {

  }

  save() {
    this.service.alterarSenha(this.form.value as {antigaSenha: string | null, novaSenha: string | null}).subscribe({
      next: result => {
        this.dialogRef.close();
        this.showSnackbarTopPosition('Senha alterada com Sucesso', 'Fechar', 2000);
      }
    })
  }


  showSnackbarTopPosition(content: any, action: any, duration: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });


}

 }

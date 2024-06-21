import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador para DDD (considerando que DDDs válidos são de 11 a 99)
export function dddValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validDDD = /^[1-9][1-9]$/.test(control.value);
    return validDDD ? null : { invalidDDD: true };
  };
}

// Validador para número de telefone (considerando que deve ter 8 ou 9 dígitos)
export function telefoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validTelefone = /^[2-9][0-9]{7,8}$/.test(control.value);
    return validTelefone ? null : { invalidTelefone: true };
  };
}


  
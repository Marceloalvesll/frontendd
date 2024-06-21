import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ItemCarrinho } from '../../models/itemcarrinho.model';
import { Order } from '../../models/order.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Cliente } from '../../models/cliente.model';
import { AuthClienteService } from '../../services/authcliente.service';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  carrinhoItems: ItemCarrinho[] = [];
  paymentForm!: FormGroup;
  clienteLogado: Cliente | null = null;
  totalCarrinho: number = 0;

  constructor(
    private carrinhoService: CarrinhoService,
    private orderService: OrderService,
    private authClienteService: AuthClienteService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(items => {
      this.carrinhoItems = items;
      this.calcularTotalCarrinho();
    });

    this.paymentForm = this.formBuilder.group({
      paymentMethod: ['card', Validators.required],
      cardNumber: ['', Validators.required],
      cardName: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required]
    });

    this.authClienteService.getClienteLogado().subscribe(cliente => {
      this.clienteLogado = cliente;
    });
    this.setupCardValidators();
  }

  setupCardValidators() {
    this.paymentForm.get('paymentMethod')!.valueChanges.subscribe(method => {
      if (method === 'card') {
        this.paymentForm.get('cardNumber')!.setValidators([Validators.required]);
        this.paymentForm.get('cardName')!.setValidators([Validators.required]);
        this.paymentForm.get('expiryDate')!.setValidators([Validators.required]);
        this.paymentForm.get('cvv')!.setValidators([Validators.required]);
      } 
    });
  }

  calcularTotalCarrinho() {
    this.totalCarrinho = this.carrinhoItems.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  }

  onCheckout() {
    if (this.paymentForm.invalid && this.paymentForm.get('paymentMethod')!.value === 'card') {
      this.showSnackbar('Por favor, preencha todas as informações de pagamento corretamente.', 'Fechar');
      return;
    }

    if (this.carrinhoItems.length === 0) {
      this.showSnackbar('Seu carrinho está vazio.', 'Fechar');
      return;
    }

    this.orderService.save(this.carrinhoItems).subscribe({
      next: (order: Order) => {
        this.showSnackbar('Pedido realizado com sucesso!', 'Fechar');
        this.carrinhoService.limparCarrinho();
        this.router.navigate(['/produtos']); // ou outra rota, conforme necessário
      },
      error: (err) => {
        console.error(err);
        this.showSnackbar('Erro ao realizar o pedido. Tente novamente.', 'Fechar');
      }
    });
  }

  updateCardDisplay() {
    const cardNumber = this.paymentForm.get('cardNumber')?.value || 'XXXX XXXX XXXX XXXX';
    const cardName = this.paymentForm.get('cardName')?.value || 'NOME NO CARTÃO';
    const expiryDate = this.paymentForm.get('expiryDate')?.value || 'MM/AA';

    document.getElementById('cardNumberDisplay')!.innerText = this.formatCardNumber(cardNumber);
    document.getElementById('cardNameDisplay')!.innerText = cardName.toUpperCase();
    document.getElementById('expiryDateDisplay')!.innerText = expiryDate;
  }

  formatCardNumber(cardNumber: string): string {
    return cardNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  }

  showSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}

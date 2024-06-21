import { Component, OnInit } from '@angular/core';
// import { Order } from '../../../models/order.models';
// import { Cliente } from '../../../models/cliente.model';
import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../../../services/auth.service';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

// import { Endereco } from '../../../models/endereco.models';
// import { Telefone } from '../../../models/telefone.models';


// import { ClienteService } from '../../../services/cliente.service';
import { EnderecoService } from '../../../services/endereco.service';
import { TelefoneService } from '../../../services/telefone.service';
import { FormGroup, Validators } from '@angular/forms';
// import { Address } from '../../../models/adress.models';
// import { Phone } from '../../../models/phone.models';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { AddressService } from '../../../services/address.service';
// import { PhoneService } from '../../../services/phone.service';
// import { AddressModalComponent } from '../../addressmodal/addressmodal.component';
// import { PhoneModalComponent } from '../../phonemodal/phonemodal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Cliente } from '../../../models/cliente.model';
import { Order } from '../../../models/order.model';
import { AuthClienteService } from '../../../services/authcliente.service';
import { ClienteService } from '../../../services/cliente.service';
import { ChangePasswordDialogComponent } from './change-password-dialog.component';

@Component({
  selector: 'app-cliente-perfil',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatTooltip,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './cliente-perfil.component.html',
  styleUrl: './cliente-perfil.component.css'
})
export class ClientePerfilComponent implements OnInit {
  cliente: Cliente | null = null;
  pedidos: Order[] = [];
  protected readonly open = open;
  protected readonly DialogChangePasswordComponent = ChangePasswordDialogComponent;

//   selectedAddress: Address | null = null;
//   selectedPhone: Phone | null = null;

  constructor(
    private authClienteService: AuthClienteService,
    private orderService: OrderService,
    private clienteService: ClienteService,
    private router: Router,
    // private addressService: AddressService,
    // private phoneService: PhoneService,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.authClienteService.getClienteLogado().subscribe(cliente => {
      this.cliente = cliente;
      if (cliente) {
        this.carregarPedidos(cliente.id);
        this.carregarCliente(cliente.login);
      }
    });
  }

  carregarCliente(login: string): void {
    this.clienteService.findByLogin(login).subscribe(cliente => {
      this.cliente = cliente;
    });
  }

  carregarPedidos(idCliente: number): void {
    this.orderService.getPedidosPorCliente(idCliente).subscribe((pedidos) => {
      this.pedidos = pedidos;
    });
  }

  


  editarDados(): void {
    if (this.cliente && this.cliente.login) {
      this.clienteService.findByLogin(this.cliente.login).subscribe((cliente) => {
        if (cliente && cliente.id) {
          this.router.navigate(['/perfil/edit', cliente.id]);
        }
      });
    }
  }

  // editarDados(): void {
  //   if (this.cliente && this.cliente.id) {
  //     this.router.navigate(['/clientes/edit', this.cliente.id]);
  //   }
  // }

  verDetalhes(pedidoId: number): void {
    this.router.navigate(['/orders', pedidoId]);
  }

  voltarParaPrincipal(): void {
    this.router.navigate(['/']);
  }

//   selectAddress(): void {
//     const dialogRef = this.dialog.open(AddressModalComponent, {
//       width: '300px',
//       data: {}
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.selectedAddress = result;
//       }
//     });
//   }

//   selectPhone(): void {
//     const dialogRef = this.dialog.open(PhoneModalComponent, {
//       width: '300px',
//       data: {}
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.selectedPhone = result;
//       }
//     });
//   }

}
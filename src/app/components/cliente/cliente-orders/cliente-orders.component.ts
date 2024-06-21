import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
// import { Order } from '../../../models/order.models';
import { OrderService } from '../../../services/order.service';
// import { Usuario } from '../../../models/usuario.model';
// import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Order } from '../../../models/order.model';
import { Cliente } from '../../../models/cliente.model';
import { AuthClienteService } from '../../../services/authcliente.service';

@Component({
    selector: 'app-cliente-orders',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        RouterModule
    ],
    templateUrl: './cliente-orders.component.html',
    styleUrl: './cliente-orders.component.css'
})
export class ClienteOrdersComponent implements OnInit {

    pedidos: Order[] = [];
    displayedColumns: string[] = ['id', 'dataHora', 'totalPedido'];
    cliente: Cliente | null = null;

    constructor(
        private orderService: OrderService,
        private authClienteService: AuthClienteService,
        private router: Router) { }

    ngOnInit(): void {
        // this.carregarPedidos();
        this.obterClienteLogado();
    }

    obterClienteLogado(): void {
        this.authClienteService.getClienteLogado().subscribe(cliente => {
            this.cliente = cliente;
            if (cliente && cliente.id) {
                this.carregarPedidos(cliente.id);
            }
        });
    }

    carregarPedidos(idCliente: number): void {
        if (idCliente) {
            this.orderService.getPedidosPorCliente(idCliente).subscribe(pedidos => {
                this.pedidos = pedidos;
            });
        } else {
            console.error("ID do cliente não encontrado.");
        }
    }



    visualizarPedido(orderId: number): void {
        this.router.navigate([`/orders/${ orderId }`]);
    }

    voltarParaPrincipal(): void {
        this.router.navigate(['/']);
    }
}
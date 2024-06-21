import { Cliente } from "./cliente.model";
import { ItemCarrinho } from "./itemcarrinho.model";

export interface Pedido {
    id: number;
    dataHora: string;  // Utilize string para datas
    cliente: Cliente;
    totalPedido: number;
    itens: ItemCarrinho[];
  }
  
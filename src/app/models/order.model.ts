import { ItemCarrinho } from "./itemcarrinho.model";
import { Cliente } from "./cliente.model";

export interface Order {
  id: number;
  dataHora: string;  // Utilize string para datas
  cliente: Cliente;
  totalPedido: number;
  itens: ItemCarrinho[];
}

import { Cliente } from "./cliente.model";

export class Telefone {
    id!: number;
    codigoArea!: string;
    numero!: number;
    cliente!: Cliente;
}
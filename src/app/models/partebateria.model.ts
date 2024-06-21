import { Marca } from "./marca.model";

export class ParteBateria {
    id!: number;
    nome!: string;
    preco!: number;
    quantidadeEstoque!: number;
    marca!: Marca;

}
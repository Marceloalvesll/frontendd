import { Categoria } from "./categoria.model";
import { Marca } from "./marca.model";

export class Baqueta {
    id!: number;
    nomeBaqueta!: string;
    descricao!: string;
    preco!: string;
    quantidadeEstoque!: number;
    marca!: Marca;
    categoria!: Categoria;
    nomeImagem!: string;
}
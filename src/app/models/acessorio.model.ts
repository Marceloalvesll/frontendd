import { Categoria } from "./categoria.model";
import { Marca } from "./marca.model";

export class Acessorio {
    id!: number;
    nomeAcessorio!: string;
    descricao!: string;
    preco!: number;
    quantidadeEstoque!: number;
    marca!: Marca;
    categoria!: Categoria;
    nomeImagem!: string;
}
import { Marca } from "./marca.model";
import { Categoria } from "./categoria.model";

export class BateriaCompleta {
    id!: number;
    nomeBateria!: string;
    quantidadeTambor!: number;
    descricao!: string;
    preco!: number;
    quantidadeEstoque!: number;
    nomeImagem!: string;
    marca!: Marca;
    categoria!: Categoria;
    
}